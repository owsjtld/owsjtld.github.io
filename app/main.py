# yeonam-evaluator/app/main.py
from fastapi import FastAPI
from app.api.v1.api import api_router
from app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    description="연암 공모전 독서록 자동 채점 시스템"
)

# API 라우터를 등록 (v1 하위의 모든 엔드포인트 포함)
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/", tags=["Health Check"])
def root():
    return {"status": "ok", "message": "Yeonam Evaluator API is active"}


import os
from app.core.config import settings

print("=" * 60)
# 1. 시스템 환경 변수에서 직접 꺼내온 값 확인
raw_env_key = os.getenv("GEMINI_API_KEY")
print(f"[실제 시스템 환경변수] GEMINI_API_KEY: {raw_env_key[:10] if raw_env_key else '없음'}...{raw_env_key[-4:] if raw_env_key else ''}")

# 2. Pydantic settings 객체가 물고 있는 값 확인
settings_key = getattr(settings, "GEMINI_API_KEY", None)
print(f"[Pydantic 가동 변수] settings.GEMINI_API_KEY: {settings_key[:10] if settings_key else '없음'}...{settings_key[-4:] if settings_key else ''}")
print("=" * 60)