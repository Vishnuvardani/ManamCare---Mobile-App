# 🔧 ManamCare - Complete Error-Free Setup Guide

## 🎯 **What's Fixed:**

### ✅ **Backend Issues Resolved:**
- Simplified auth routes without complex middleware
- Removed validator dependency
- Clean User model with basic validation
- Improved error handling and logging
- Better CORS configuration
- Graceful server shutdown

### ✅ **Frontend Issues Resolved:**
- Fixed API service with proper error handling
- Improved circular progress components
- Better time-based greeting logic
- Enhanced database integration
- Removed SVG dependency issues

### ✅ **Database Issues Resolved:**
- Simplified User schema
- Auto-creation of sample user if none exists
- Proper MongoDB connection handling
- Error fallbacks for database failures

## 🚀 **Step-by-Step Setup:**

### **1. Quick Setup (Recommended):**
```bash
# Run the setup script
setup.bat
```

### **2. Manual Setup:**

**Install Dependencies:**
```bash
# Frontend dependencies
npm install

# Backend dependencies
cd backend
npm install
cd ..
```

**Start Backend:**
```bash
cd backend
npm run dev
```
**Expected Output:**
```
🔄 Connecting to MongoDB...
✅ MongoDB connected successfully
🚀 Server running on http://0.0.0.0:5000
📱 API endpoints available at http://localhost:5000/api
```

**Start Frontend:**
```bash
npx expo start
```

## 🧪 **Testing the Setup:**

### **1. Test Backend API:**
Open browser: `http://localhost:5000`
**Expected Response:**
```json
{
  "message": "ManamCare API running ✅",
  "timestamp": "2025-01-20T...",
  "status": "healthy"
}
```

### **2. Test Profile Endpoint:**
Open browser: `http://localhost:5000/api/auth/profile`
**Expected Response:**
```json
{
  "username": "Vishnu Kumar",
  "name": "Vishnu Kumar",
  "email": "vishnu@manamcare.com",
  "id": "..."
}
```

### **3. Test Frontend:**
- Login → Home Screen
- Should display: **"Good [Morning/Afternoon/Evening/Night], Vishnu Kumar"**
- Progress circles: **75% Mental Wellness, 60% Activity**
- All navigation tabs working

## 🔍 **Common Issues & Solutions:**

### **Issue 1: Port Already in Use**
```bash
# Kill process on port 5000
npx kill-port 5000
# Or use different port
PORT=5001 npm run dev
```

### **Issue 2: MongoDB Connection Failed**
- Check internet connection
- Verify MongoDB URI in `.env` file
- Try restarting the backend server

### **Issue 3: API Not Found (404)**
- Ensure backend is running on port 5000
- Check API base URL in `services/api.ts`
- Verify CORS settings

### **Issue 4: Frontend Build Errors**
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules
npm install
```

### **Issue 5: Expo Start Issues**
```bash
# Clear Expo cache
npx expo start --clear
# Or reset project
npm run reset-project
```

## 📱 **Expected User Experience:**

### **Login Flow:**
1. User enters credentials
2. Backend validates and returns token
3. Redirects to Home Screen
4. Fetches user profile from database
5. Displays personalized greeting

### **Home Screen Features:**
- **Dynamic Greeting**: Changes based on time
- **Real Name**: Fetched from MongoDB
- **Progress Indicators**: 75% Mental, 60% Activity
- **Animated Cards**: Smooth scale effects
- **Navigation**: Home | Book | Resources | Profile

### **Time-Based Greetings:**
- **5 AM - 12 PM**: "Good Morning, Vishnu Kumar"
- **12 PM - 5 PM**: "Good Afternoon, Vishnu Kumar"
- **5 PM - 9 PM**: "Good Evening, Vishnu Kumar"
- **9 PM - 5 AM**: "Good Night, Vishnu Kumar"

## 🎯 **Console Logs to Expect:**

### **Backend Console:**
```
🔄 Connecting to MongoDB...
✅ MongoDB connected successfully
🚀 Server running on http://0.0.0.0:5000
📱 API endpoints available at http://localhost:5000/api
No users found, creating sample user...
Sample user created: Vishnu Kumar
```

### **Frontend Console:**
```
🔄 API Request: GET /auth/profile
✅ API Response: 200 /auth/profile
Fetching profile from database...
Profile data received: {username: "Vishnu Kumar", name: "Vishnu Kumar", ...}
```

## 🛠 **Development Tools:**

### **Start Scripts Created:**
- `start-backend.bat` - Backend only
- `start-frontend.bat` - Frontend only  
- `start-all.bat` - Both together

### **Useful Commands:**
```bash
# Check if ports are in use
netstat -ano | findstr :5000
netstat -ano | findstr :8081

# Kill specific process
taskkill /PID <process_id> /F

# Check Node.js version
node --version
npm --version
```

## 🎉 **Success Indicators:**

✅ **Backend Running**: Server logs show MongoDB connected  
✅ **API Working**: Profile endpoint returns user data  
✅ **Frontend Loading**: Expo shows QR code or web interface  
✅ **Login Working**: Redirects to home screen  
✅ **Database Connected**: User data displays correctly  
✅ **No Errors**: Console shows successful API calls  

## 📞 **If Still Having Issues:**

1. **Check all dependencies are installed**
2. **Verify MongoDB connection string**
3. **Ensure ports 5000 and 8081 are free**
4. **Check firewall/antivirus settings**
5. **Try running on different network**

The ManamCare application is now configured to run without any errors with proper database integration, API communication, and user interface!