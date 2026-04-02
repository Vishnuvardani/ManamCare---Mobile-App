# 🧭 MongoDB Compass Setup Guide

## 🎯 **Switch to Local MongoDB (Much Easier!)**

### ✅ **Step 1: Start MongoDB Service**

**Option A - Using MongoDB Compass:**
1. Open **MongoDB Compass** application
2. Click **"Connect"** (it should connect to `mongodb://localhost:27017`)
3. If it connects successfully, MongoDB is running!

**Option B - Start MongoDB Service Manually:**
```bash
# Windows - Start MongoDB service
net start MongoDB

# Or if that doesn't work:
"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath "C:\data\db"
```

**Option C - Check if MongoDB is Already Running:**
```bash
# Check if MongoDB is running on port 27017
netstat -an | findstr :27017
```

### ✅ **Step 2: Test Local Connection**

Run this test to verify local MongoDB works:
```bash
test-mongodb.bat
```

**Expected Output:**
```
🔄 Testing MongoDB connection...
✅ SUCCESS: MongoDB connected successfully!
📊 Connection State: 1
🏷️ Database Name: manamcare
🌐 Host: localhost
🎉 Database connection is working perfectly!
```

### ✅ **Step 3: Start Your Application**

```bash
# Start backend (should work now!)
cd backend
node server.js
```

**Expected Output:**
```
🔄 Connecting to MongoDB...
✅ MongoDB connected successfully
🚀 Server running on http://0.0.0.0:5000
📱 API endpoints available at http://localhost:5000/api
🎯 Ready to accept requests!
```

### ✅ **Step 4: Start Frontend**
```bash
# New terminal
npx expo start
```

## 🔧 **If MongoDB Service Isn't Running:**

### **Start MongoDB Service:**
```bash
# Method 1: Windows Service
net start MongoDB

# Method 2: Direct command
mongod --dbpath "C:\data\db"

# Method 3: With config file
mongod --config "C:\Program Files\MongoDB\Server\7.0\bin\mongod.cfg"
```

### **Create Data Directory (if needed):**
```bash
# Create MongoDB data directory
mkdir C:\data\db
```

## 🎊 **Advantages of Local MongoDB:**

✅ **No Internet Required** - Works offline  
✅ **No IP Whitelist Issues** - Local connection  
✅ **Faster Connection** - No network latency  
✅ **Full Control** - Your own database  
✅ **Easy Debugging** - Use MongoDB Compass GUI  

## 📊 **Using MongoDB Compass:**

1. **Connect to Database:**
   - URI: `mongodb://localhost:27017`
   - Database: `manamcare`

2. **View Your Data:**
   - Collections: `users`
   - Documents: User profiles created by the app

3. **Monitor Queries:**
   - See real-time database operations
   - Debug data issues easily

## 🚀 **Quick Start Commands:**

```bash
# 1. Start MongoDB (if not running)
net start MongoDB

# 2. Test connection
test-mongodb.bat

# 3. Start backend
cd backend && node server.js

# 4. Start frontend (new terminal)
npx expo start
```

Your ManamCare app will now use local MongoDB - much simpler and more reliable for development!