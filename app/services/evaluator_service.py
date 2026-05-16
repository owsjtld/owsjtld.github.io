import json
import logging
from datetime import datetime
from pathlib import Path
import pandas as pd

# 차세대 표준 Google GenAI SDK 사용
from google import genai
from google.genai import types
from google.genai.errors import APIError

from app.core.config import settings
from app.templates.prompts import SYSTEM_PROMPT
from app.schemas.essay import EssayEvalResponse, ScoreDetails

logger = logging.getLogger("EvaluatorService")

class EvaluatorService:
    def __init__(self):
        # 최신 SDK는 genai.Client를 이용해 인스턴스를 생성합니다.
        self.client = genai.Client(api_key=settings.GEMINI_API_KEY)
        self.model_name = settings.MODEL_NAME or "gemini-2.5-flash"
        
        # 결과물 저장 경로 로컬 빌드
        self.storage_path = Path("storage/results")
        self.storage_path.mkdir(parents=True, exist_ok=True)
        self.excel_path = Path("storage/글쓰기대회_결과리스트.xlsx")

    def _save_to_file(self, data: EssayEvalResponse):
        """채점 결과를 개별 JSON 파일로 로컬 스토리지에 저장합니다."""
        try:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"{data.student_name}_{timestamp}.json"
            file_full_path = self.storage_path / filename
            
            with open(file_full_path, "w", encoding="utf-8") as f:
                json.dump(data.model_dump(), f, ensure_ascii=False, indent=2)
            logger.info(f"[Storage] 개별 JSON 백업 완료: {file_full_path}")
        except Exception as e:
            logger.error(f"[Storage Error] 로컬 백업 파일 저장 실패: {str(e)}")

    def _update_excel(self, data: EssayEvalResponse):
        """채점 결과를 엑셀 파일에 정밀 누적 적재합니다."""
        new_row = {
            "채점시간": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "학생이름": data.student_name,
            "인식된본문": data.extracted_content,
            "글자수": data.word_count,
            "문법점수": data.scores.grammar,
            "내용점수": data.scores.content,
            "구조점수": data.scores.structure,
            "최종총평": data.final_comment
        }
        
        new_df = pd.DataFrame([new_row])

        if self.excel_path.exists():
            try:
                old_df = pd.read_excel(self.excel_path)
                combined_df = pd.concat([old_df, new_df], ignore_index=True)
            except Exception as e:
                logger.error(f"[Excel Error] 기존 엑셀 파싱 실패, 신규 데이터프레임으로 대체합니다: {str(e)}")
                combined_df = new_df
        else:
            combined_df = new_df

        try:
            combined_df.to_excel(self.excel_path, index=False, engine="openpyxl")
            logger.info(f"[Excel] 마스터 데이터셋 엑셀 업데이트 완료: {self.excel_path}")
        except Exception as e:
            logger.error(f"[Excel Write Error] 파일 잠금 또는 쓰기 권한 요인 실패: {str(e)}")

    async def evaluate_essay(self, content: bytes, mime_type: str) -> EssayEvalResponse:
        """
        학생 원고 파일 바이너리를 인계받아 구조화된 JSON 데이터 검증 및 내부 적재를 수행합니다.
        """
        try:
            # MIME Type 예외 방어 가드레일
            current_mime = "image/jpeg"
            if "pdf" in mime_type.lower():
                current_mime = "application/pdf"
            elif "png" in mime_type.lower():
                current_mime = "image/png"

            # 1. 최신 SDK 스펙 멀티모달 파트 구축
            media_part = types.Part.from_bytes(
                data=content,
                mime_type=current_mime
            )
            
            # 2. 최신 SDK 전용 Generation Config 구조화 가이드라인 설계
            config = types.GenerateContentConfig(
                system_instruction=SYSTEM_PROMPT,
                temperature=0.15,
                response_mime_type="application/json",
                response_schema=EssayEvalResponse,  # Pydantic 모델 직접 주입하여 형식 파괴 방지
            )

            logger.info(f"[Gemini API Call] 차세대 엔진 콘텐츠 분석 가동... 모델: {self.model_name}")
            
            # 3. 최신 클라이언트 호출 스펙 적용
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=[media_part, "지정된 서식에 맞추어 평가를 정밀 수행하세요."],
                config=config
            )
            
            # 4. 안전한 스키마 검증 및 적재 파이프라인 전개
            if not response.text:
                raise ValueError("LLM이 빈 응답을 반환했습니다.")
                
            result = EssayEvalResponse.model_validate_json(response.text)
            
            # 후속 데이터 영속화 처리
            self._save_to_file(result)
            self._update_excel(result)
            
            return result

        except APIError as ae:
            # 구글 새 SDK의 통합 API 장애 및 429 할당량 초과 통합 캐치
            logger.critical(f"[Google API Infra Error] 통신 인프라 예외 코드 {ae.code}: {ae.message}")
            raise ae
        except Exception as e:
            logger.error(f"[AI Evaluation Pipeline Panic] 내부 파이프라인 처리 중단 사유: {str(e)}")
            raise e

# 아키텍처 결합용 싱글톤 인스턴스 할당
evaluator_service = EvaluatorService()