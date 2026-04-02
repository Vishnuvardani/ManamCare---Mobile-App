@echo off
echo 🚀 ManamCare Setup Script
echo =========================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

echo ✅ Node.js is installed

REM Install frontend dependencies
echo 📱 Installing frontend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)

REM Install backend dependencies
echo 🔧 Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)
cd ..

echo ✅ All dependencies installed successfully!

REM Create start scripts
echo 📝 Creating start scripts...

echo @echo off > start-backend.bat
echo echo Starting ManamCare Backend Server... >> start-backend.bat
echo cd backend >> start-backend.bat
echo npm run dev >> start-backend.bat

echo @echo off > start-frontend.bat
echo echo Starting ManamCare Frontend... >> start-frontend.bat
echo npx expo start >> start-frontend.bat

echo @echo off > start-all.bat
echo echo Starting ManamCare Application... >> start-all.bat
echo echo. >> start-all.bat
echo echo Starting Backend Server... >> start-all.bat
echo start cmd /k "cd backend && npm run dev" >> start-all.bat
echo timeout /t 3 /nobreak ^> nul >> start-all.bat
echo echo. >> start-all.bat
echo echo Starting Frontend... >> start-all.bat
echo npx expo start >> start-all.bat

echo ✅ Setup completed successfully!
echo.
echo 🎯 How to run ManamCare:
echo 1. Backend only: double-click start-backend.bat
echo 2. Frontend only: double-click start-frontend.bat
echo 3. Both together: double-click start-all.bat
echo.
echo 📱 Or manually:
echo Backend: cd backend ^&^& npm run dev
echo Frontend: npx expo start
echo.
echo 🌐 API will be available at: http://localhost:5000
echo 📱 App will be available at: http://localhost:8081

pause