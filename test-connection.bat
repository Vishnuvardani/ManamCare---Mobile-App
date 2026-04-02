@echo off
echo 🎉 MongoDB Atlas IP Whitelist Updated!
echo =====================================

echo ✅ You've successfully added 0.0.0.0/0 to Network Access
echo 🔄 Now let's test the connection...
echo.

echo 🔧 Step 1: Testing Backend Connection
cd backend

echo 📡 Starting backend server...
echo If connection is successful, you'll see "MongoDB connected successfully"
echo.

start cmd /k "echo 🚀 Backend Server Starting... && echo. && node server.js"

echo ⏳ Waiting for backend to initialize...
timeout /t 8 /nobreak > nul

echo.
echo 🧪 Step 2: Testing API Endpoint
echo Opening browser to test profile endpoint...
start http://localhost:5000/api/auth/profile

timeout /t 3 /nobreak > nul

echo.
echo 📱 Step 3: Starting Frontend
cd ..
echo 🎯 Starting Expo development server...
echo.

npx expo start

echo.
echo 🎊 Setup Complete!
echo Backend: http://localhost:5000
echo Frontend: Follow Expo instructions above
echo.
pause