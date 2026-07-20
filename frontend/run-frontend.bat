@echo off
title Hephestos Frontend
cd /d "%~dp0"
echo Starting website... your browser will open automatically when ready.
echo (First launch can take ~30 seconds to compile.)
call npm start
echo.
echo Website stopped. Press any key to close.
pause >nul
