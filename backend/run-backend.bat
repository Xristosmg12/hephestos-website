@echo off
title Hephestos Backend
cd /d "%~dp0"
echo Starting backend API on http://localhost:8001 ...
".venv\Scripts\python.exe" -m uvicorn server:app --host 127.0.0.1 --port 8001
echo.
echo Backend stopped. Press any key to close.
pause >nul
