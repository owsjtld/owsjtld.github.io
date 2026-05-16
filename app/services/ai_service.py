import json
import logging
from google import genai
from google.genai import types
from google.genai.errors import APIError

from app.core.config import settings
from app.templates.prompt_templates import SYSTEM_PROMPT
# 경로 명확화: 혼선을 방지하기 위해 단일 스키마 파일로 매핑을 통일합니다.
from app.schemas.essay import EssayEvalResponse

logger = logging.getLogger("AIService")

class AIService:
    def __init__(self):
        # 1. 최신 google-genai Client 초기화 (.env의 새 API Key 자동 반영)
        self.client = genai.Client(api_key=settings.GEMINI_API_KEY)
        self.model_name = settings.MODEL_NAME or "gemini-2.5-flash"

    async def evaluate_essay(self, file_content: bytes, mime_type: str) -> EssayEvalResponse:
        """
        원고지 이미지 또는 PDF를 정밀 분석하여 루브릭 기반 구조화된 채점 결과를 반환합니다.
        """
        try:
            # MIME 타입 안전 보정 가드레일
            current_mime = "image/jpeg"
            if "pdf" in mime_type.lower():
                current_mime = "application/pdf"
            elif "png" in mime_type.lower():
                current_mime = "image/png"

            # 2. 차세대 SDK 규격 멀티모달 파트 구성
            media_part = types.Part.from_bytes(
                data=file_content,
                mime_type=current_mime
            )

            # 3. 최신 SDK 전용 가드레일 설정 (Structured Output 완전 제어)
            config = types.GenerateContentConfig(
                system_instruction=SYSTEM_PROMPT,
                temperature=0.15,               # 채점의 일관성을 위해 낮은 온도로 튜닝
                response_mime_type="application/json",
                response_schema=EssayEvalResponse, # 모델 구조를 LLM에 직접 강제하여 유효성 에러 사전 차단
            )

            logger.info(f"[AIService] Gemini API 호출 모델: {self.model_name}")
            
            # 4. 차세대 클라이언트 라우팅 호출
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=[media_part, "이 독서록 원고를 정밀하게 분석하여 JSON 형식으로 채점 결과를 생성해줘."],
                config=config
            )

            if not response.text:
                raise ValueError("LLM 응답이 비어 있습니다.")

            # 5. JSON 파싱 및 Pydantic v2 유효성 검증
            return EssayEvalResponse.model_validate_json(response.text)

        except APIError as ae:
            logger.error(f"[AI Service API Error] 구글 인프라 장애 또는 할당량 제한: {str(ae)}")
            raise ae
        except Exception as e:
            logger.error(f"[AI Service Unexpected Error] 채점 도중 예외 발생: {str(e)}")
            raise e

# 싱글톤 패턴으로 서비스 인스턴스 노출
ai_service = AIService()