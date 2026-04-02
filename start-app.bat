@echo off
echo 🎉 MongoDB Compass Connected!
echo ============================

echo ✅ MongoDB Compass is running on localhost:27017
echo 🎯 Starting ManamCare application...
echo.

echo 🔧 Starting Backend Server...
cd backend

start cmd /k "echo 🚀 ManamCare Backend Server && echo ======================== && echo. && node server.js"

echo ⏳ Waiting for backend to initialize...
timeout /t 5 /nobreak > nul

echo.
echo 📱 Starting Frontend...
cd ..
echo 🎯 Expo Development Server Starting...
echo.

npx expo start

pause