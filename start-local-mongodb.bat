@echo off
echo 🧭 ManamCare - Local MongoDB Setup
echo ==================================

echo ✅ Switched to Local MongoDB (much easier!)
echo 📍 Connection: mongodb://localhost:27017/manamcare
echo.

echo 🔄 Step 1: Starting MongoDB Service...
net start MongoDB 2>nul
if %errorlevel% equ 0 (
    echo ✅ MongoDB service started successfully
) else (
    echo ⚠️  MongoDB service might already be running or needs manual start
    echo 💡 Try opening MongoDB Compass and connecting to localhost:27017
)

echo.
echo 🧪 Step 2: Testing MongoDB Connection...
cd backend
node test-mongodb.js

echo.
echo 🚀 Step 3: Starting Backend Server...
echo If connection test passed, starting server...
echo.

start cmd /k "echo 🔧 Backend Server Starting... && echo. && node server.js"

echo ⏳ Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo.
echo 📱 Step 4: Starting Frontend...
cd ..
echo 🎯 Starting Expo development server...
echo.

npx expo start

echo.
echo 🎊 Setup Complete!
echo Backend: http://localhost:5000
echo Database: MongoDB Compass (localhost:27017)
echo.
pause