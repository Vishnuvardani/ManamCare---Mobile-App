#!/bin/bash

echo "🚀 ManamCare Setup Script"
echo "========================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Install frontend dependencies
echo "📱 Installing frontend dependencies..."
npm install

# Install backend dependencies
echo "🔧 Installing backend dependencies..."
cd backend
npm install
cd ..

echo "✅ All dependencies installed successfully!"

# Create start scripts
echo "📝 Creating start scripts..."

# Create backend start script
cat > start-backend.bat << 'EOF'
@echo off
echo Starting ManamCare Backend Server...
cd backend
npm run dev
EOF

# Create frontend start script  
cat > start-frontend.bat << 'EOF'
@echo off
echo Starting ManamCare Frontend...
npx expo start
EOF

# Create combined start script
cat > start-all.bat << 'EOF'
@echo off
echo Starting ManamCare Application...
echo.
echo Starting Backend Server...
start cmd /k "cd backend && npm run dev"
timeout /t 3 /nobreak > nul
echo.
echo Starting Frontend...
npx expo start
EOF

echo "✅ Start scripts created!"
echo ""
echo "🎯 How to run ManamCare:"
echo "1. Backend only: run start-backend.bat"
echo "2. Frontend only: run start-frontend.bat" 
echo "3. Both together: run start-all.bat"
echo ""
echo "📱 Or manually:"
echo "Backend: cd backend && npm run dev"
echo "Frontend: npx expo start"
echo ""
echo "🌐 API will be available at: http://localhost:5000"
echo "📱 App will be available at: http://localhost:8081"