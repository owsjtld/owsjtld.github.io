import os
from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

# 1. config.py 파일의 절대 경로를 기준으로 상위 폴더를 3번 거슬러 올라갑니다.
# __file__ = yeonam-evaluator/app/core/config.py
# .parent = yeonam-evaluator/app/core
# .parent.parent = yeonam-evaluator/app
# .parent.parent.parent = yeonam-evaluator (app과 같은 위치인 프로젝트 루트)
ROOT_DIR = Path(__file__).resolve().parent.parent.parent
TARGET_ENV_PATH = ROOT_DIR / ".env"

# [가드레일] 터미널 세션이나 OS 시스템 전역에 유령처럼 남아있는 구버전 키를 메모리에서 강제 제거합니다.
# 이 처리를 해야 Pydantic이 시스템 변수 대신 아래에서 지정한 진짜 루트 .env 파일을 100% 우선 적용합니다.
if "GEMINI_API_KEY" in os.environ:
    del os.environ["GEMINI_API_KEY"]

class Settings(BaseSettings):
    PROJECT_NAME: str = "Yeonam Evaluator"
    API_V1_STR: str = "/api/v1"
    
    # Pydantic이 지정을 명시한 env_file에서 자동으로 값을 매핑합니다.
    GEMINI_API_KEY: str
    MODEL_NAME: str = "gemini-2.5-flash"

    # Pydantic SettingsConfig를 사용해 app/과 같은 위치에 있는 .env 절대 경로를 강제 픽스합니다.
    model_config = SettingsConfigDict(
        env_file=TARGET_ENV_PATH,
        env_file_encoding="utf-8",
        extra="ignore"  # .env에 정의된 다른 변수들은 에러 없이 유연하게 무시
    )

# 싱글톤 설정 객체 생성
settings = Settings()

# [검증용 출력] 서버 기동 시 터미널 로그에서 루트 .env를 똑바로 잡았는지 즉시 확인하는 스크립트
if __name__ == "__main__":
    print("\n" + "=" * 60)
    print(f"[경로 교정 완료] 탐색한 .env 절대 경로:")
    print(f" -> {TARGET_ENV_PATH.resolve()}")
    print(f"[불러온 새 API KEY 확인]: {settings.GEMINI_API_KEY[:7]}...{settings.GEMINI_API_KEY[-4:] if settings.GEMINI_API_KEY else ''}")
    print("=" * 60 + "\n")