@echo off
echo Starting Customer Feedback Management System...

:: Check for Node.js
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in your PATH.
    echo Please install Node.js from https://nodejs.org/ and restart your terminal.
    pause
    exit /b
)

echo Node.js found. Starting application...

:: Start Backend
echo Starting Backend Server...
start "Feedback System - Backend" cmd /k "cd server && if not exist node_modules (echo Installing dependencies... && npm install) else (echo Dependencies found.) && npm run dev"

:: Start Frontend
echo Starting Frontend Client...
start "Feedback System - Frontend" cmd /k "cd client && if not exist node_modules (echo Installing dependencies... && npm install) else (echo Dependencies found.) && npm run dev"

echo.
echo Both servers are starting in separate windows.
echo Backend will run on http://localhost:5000
echo Frontend will run on http://localhost:5173
echo.
pause
