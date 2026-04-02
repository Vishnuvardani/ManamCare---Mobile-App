@echo off
echo 🔍 Running MongoDB Connection Test
echo ==================================

cd backend
node test-mongodb.js

echo.
echo Press any key to continue...
pause > nul