# yeonam-evaluator/app/api/v1/api.py
from fastapi import APIRouter
from app.api.v1.endpoints import evaluator

api_router = APIRouter()

# evaluator 관련 엔드포인트를 /evaluation 경로 하위에 등록
api_router.include_router(evaluator.router, prefix="/evaluation", tags=["Evaluation"])