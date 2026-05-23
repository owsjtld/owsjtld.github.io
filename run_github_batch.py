# C:\Users\NSHL-0133N\yeonam-evaluator\run_github_batch.py
import json
import os
import subprocess
from datetime import datetime
from pathlib import Path
import pandas as pd
import google.generativeai as genai

from app.core.config import settings
from app.templates.prompts import SYSTEM_PROMPT
from app.schemas.essay import EssayEvalResponse

class GitHubBatchEvaluator:
    def __init__(self):
        # 1. 내 노트북 내부 환경 변수에서 안전하게 구글 Gemini API 키 로드
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel(
            model_name=settings.MODEL_NAME,
            system_instruction=SYSTEM_PROMPT
        )
        
        # 2. 타겟팅할 원격 웹사이트 레포지토리 주소 정의 (토큰 포함 인젝션 형태)
        self.target_repo_url = "https://github.com/owsjtld/owsjtld.github.io.git"
        
        # 3. 폴더 경로 정의 (로컬 가동 기준 경로)
        self.upload_dir = Path("uploads")          # 외부 사용자가 웹에서 올린 파일이 동기화되는 폴더
        self.static_api_dir = Path("api")          # 결과 정적 JSON이 저장되어 웹으로 배포될 폴더
        self.excel_path = Path("storage/글쓰기대회_결과리스트.xlsx")
        
        # 4. 인프라 디렉터리 자동 초기화 생성
        self.upload_dir.mkdir(parents=True, exist_ok=True)
        self.static_api_dir.mkdir(parents=True, exist_ok=True)
        Path("storage").mkdir(parents=True, exist_ok=True)

    def _sync_git_pull(self):
        """1단계: 외부 사용자가 owsjtld.github.io에 업로드한 신규 PDF 파일들을 강제로 안전하게 당겨오기"""
        print("[Git] 외부 웹사이트(owsjtld.github.io) 저장소로부터 신규 접수 파일 동기화 중 (git pull)...")
        try:
            repo_root = os.getcwd()
            # 외부 저장소 파일을 충돌 없이 가져오기
            subprocess.run(
                [
                    "git", "pull", 
                    self.target_repo_url, "main", 
                    "--no-rebase", 
                    "--allow-unrelated-histories", 
                    "-X", "theirs"
                ], 
                cwd=repo_root,
                check=True, 
                stdout=subprocess.PIPE, 
                stderr=subprocess.PIPE
            )
            print("🔄 [Git] 원격 저장소 파일 동기화 완료.")
        except Exception as e:
            print(f"⚠️ [Git Warning] 최신 파일 동기화 실패 (네트워크 연결 혹은 권한 확인 필요): {str(e)}")

    def _update_excel(self, data: EssayEvalResponse):
        """2단계: 채점 결과를 내 노트북 마스터 엑셀에 데이터 정밀 누적 적재"""
        new_row = {
            "채점시간": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "학생이름": data.student_name,
            "글자수": data.word_count,
            "분량(상중하)": data.scores.quantity,
            "박지원분석(상중하)": data.scores.analysis,
            "양반비판(상중하)": data.scores.reflection,
            "실천계획(상중하)": data.scores.plan,
            "논리성(상중하)": data.scores.logic,
            "최종총평": data.final_comment
        }
        new_df = pd.DataFrame([new_row])

        if self.excel_path.exists():
            try:
                old_df = pd.read_excel(self.excel_path, engine="openpyxl")
                combined_df = pd.concat([old_df, new_df], ignore_index=True)
            except Exception as e:
                print(f"⚠️ [Excel Warning] 기존 엑셀을 읽지 못해 새로 생성합니다: {str(e)}")
                combined_df = new_df
        else:
            combined_df = new_df

        combined_df.to_excel(self.excel_path, index=False, engine="openpyxl")
        print(f"[Excel] 마스터 관리용 로컬 엑셀 시트에 채점 데이터 누적 적재 성공.")

    def _sync_git_push(self):
        """4단계: 채점 완료된 정적 데이터(JSON, Excel)를 외부 웹사이트 저장소로 밀어 넣어 실시간 배포"""
        print("[Git] 채점 결과 및 마스터 엑셀 데이터를 웹사이트 원격 저장소로 배포 중 (git push)...")
        try:
            # 외부 노출용 파일들을 스테이징 영역에 추가
            subprocess.run(["git", "add", "api/*"], check=True)
            
            # .gitignore 설정을 우회하고 강제(-f)로 엑셀 파일을 레포지토리에 기록
            if self.excel_path.exists():
                subprocess.run(["git", "add", "-f", str(self.excel_path)], check=True)
            
            # 동적 커밋 메시지 작성
            commit_msg = f"🤖 AI 채점 엔진 자동 배포: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
            
            # 🔥 [여기 수정] 윈도우 환경에서 이모지(🤖) 깨짐으로 인한 Thread 에러를 막기 위해 encoding="utf-8" 강제 지정
            result = subprocess.run(
                ["git", "commit", "-m", commit_msg], 
                stdout=subprocess.PIPE, 
                stderr=subprocess.PIPE, 
                text=True,
                encoding="utf-8" # 윈도우 CP949 디코딩 에러 방지 핵심 옵션
            )
            
            # result.stdout이 비어있을 경우(None)를 대비한 방어 코드 추가
            stdout_text = result.stdout or ""
            if "nothing to commit" in stdout_text or "nothing added to commit" in stdout_text:
                print("🔔 [안내] 새로 변경되거나 추가된 채점 결과가 없어 푸시를 생략합니다.")
                return

            # 외부 서비스 전용 웹사이트 저장소로 푸시
            subprocess.run(["git", "push", self.target_repo_url, "main"], check=True)
            print("🚀 [Success] 외부 웹사이트(owsjtld.github.io) 데이터 동기화 및 갱신 작업 완료!")
        except Exception as e:
            print(f"❌ [Git Error] 결과 원격 배포 실패: {str(e)}")

    def process_batch(self):
        # 1. 깃허브 원격 서버로부터 최신 파일 당겨오기
        self._sync_git_pull()
        
        # 2. 외부인 업로드 폴더 내의 PDF 파일 검사
        pdf_files = list(self.upload_dir.glob("*.pdf"))
        
        if not pdf_files:
            print("🔔 [안내] 현재 외부 웹사이트 저장소(uploads/)에 새로 접수된 독서록 PDF 파일이 없습니다.")
            return

        print(f"📝 총 {len(pdf_files)}개의 미채점 신규 독서록 파일을 발견했습니다. 순차 처리를 시작합니다.")
        
        has_updates = False
        
        for pdf_path in pdf_files:
            print(f"\n[AI 채점 가동] 대상 파일 분석 중: {pdf_path.name}")
            try:
                with open(pdf_path, "rb") as f:
                    content = f.read()

                # Gemini 멀티모달 프레임워크 호출
                content_parts = [
                    {"mime_type": "application/pdf", "data": content},
                    "지정된 SYSTEM_PROMPT의 평가 규격 및 루브릭 제약조건을 완벽히 엄수하여 JSON 채점 데이터를 매핑해줘."
                ]

                response = self.model.generate_content(
                    content_parts,
                    generation_config={
                        "response_mime_type": "application/json",
                        "response_schema": EssayEvalResponse,
                        "temperature": 0.1
                    }
                )

                # 데이터 유효성 검증 파싱
                result = EssayEvalResponse.model_validate_json(response.text)
                
                # 웹페이지 표시용 공통 데이터 경로 (`api/result.json`) 생성
                static_json_path = self.static_api_dir / "result.json"
                
                static_api_data = {
                    "success": True,
                    "filename": pdf_path.name,
                    "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                    "data": result.model_dump()
                }
                
                with open(static_json_path, "w", encoding="utf-8") as jf:
                    json.dump(static_api_data, jf, ensure_ascii=False, indent=4)
                
                # 별도 이력 관리를 위한 개별 백업 JSON 생성
                backup_json_path = self.static_api_dir / f"result_{pdf_path.stem}.json"
                with open(backup_json_path, "w", encoding="utf-8") as bjf:
                    json.dump(static_api_data, bjf, ensure_ascii=False, indent=4)
                
                # 로컬 엑셀 시트 누적 적재
                self._update_excel(result)
                has_updates = True

                # 채점이 끝난 원본 PDF 파일은 중복 채점 방지를 위해 로컬에서 삭제
                if pdf_path.exists():
                    os.remove(pdf_path)
                    subprocess.run(["git", "rm", str(pdf_path)], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
                    print(f"🗑️ [정리 완료] 중복 채점 방지를 위해 {pdf_path.name} 파일을 대기열에서 제거했습니다.")

            except Exception as e:
                print(f"❌ [파일 처리 오류] {pdf_path.name} 파일 채점 프로세스 실패: {str(e)}")
                continue
        
        # 3. 신규 업데이트 내역이 존재할 경우에만 푸시 실행
        if has_updates:
            self._sync_git_push()

if __name__ == "__main__":
    evaluator = GitHubBatchEvaluator()
    evaluator.process_batch()