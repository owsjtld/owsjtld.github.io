# yeonam-evaluator/app/api/v1/endpoints/evaluator.py
from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.evaluator_service import evaluator_service
from app.schemas.essay import EssayEvalResponse

router = APIRouter()

@router.post("/evaluate", response_model=EssayEvalResponse)
async def create_evaluation(file: UploadFile = File(...)):
    """
    원고지 이미지 또는 PDF를 업로드받아 AI 채점을 수행합니다.
    """
    if file.content_type not in ["image/png", "image/jpeg", "application/pdf"]:
        raise HTTPException(status_code=400, detail="지원하지 않는 파일 형식입니다.")

    try:
        content = await file.read()
        # 비즈니스 로직 서비스를 호출
        result = await evaluator_service.evaluate_essay(content, file.content_type)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))