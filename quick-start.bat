@echo off
echo 🚀 ManamCare Quick Start
echo =====================

echo 🔧 Starting Backend Server...
cd backend

echo.
echo 📋 Checking MongoDB Connection...
echo If you see IP whitelist error, follow these steps:
echo 1. Go to https://cloud.mongodb.com
echo 2. Navigate to Network Access
echo 3. Add your current IP or use 0.0.0.0/0 for all IPs
echo.

start cmd /k "echo 🔄 Starting Backend... && node server.js"

echo ⏳ Waiting for backend to start...
timeout /t 5 /nobreak > nul

cd ..

echo.
echo 📱 Starting Frontend...
echo The app will work even if database connection fails!
echo.

npx expo start

pause