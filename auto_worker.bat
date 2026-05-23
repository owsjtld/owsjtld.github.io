@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

title 🤖 연암 독서록 AI 채점 자동화 워커

:loop
cls
echo =======================================================
echo  🤖 연암 독서록 AI 채점 자동화 봇이 가동 중입니다.
echo  (30초마다 깃허브를 감시하며 자동으로 채점을 수행합니다)
echo =======================================================
echo [%date% %time%] 가동 시작...

:: 1. 가상환경(venv) 진입 및 파이썬 스크립트 강제 가동
if exist venv\Scripts\activate (
    call venv\Scripts\activate
    python run_github_batch.py
) else (
    echo ❌ [오류] venv 가상환경 폴더를 찾을 수 없습니다. 경로를 확인해주세요.
)

echo [%date% %time%] 이번 턴 작업 완료. 30초 뒤 다시 감시합니다...
echo -------------------------------------------------------

:: 2. 30초 대기 후 루프 재가동
timeout /t 30 /nobreak
goto loop