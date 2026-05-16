# yeonam-evaluator/main.py
import uvicorn
from app.core.config import settings

if __name__ == "__main__":
    # app/main.py에 정의된 FastAPI 인스턴스를 실행
    uvicorn.run(
        "app.main:app", 
        host="0.0.0.0", 
        port=8000, 
        reload=True  # 개발 환경에서 코드 변경 시 자동 재시작
    )