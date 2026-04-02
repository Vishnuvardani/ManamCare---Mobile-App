require('dotenv').config();
const mongoose = require('mongoose');

console.log('🔍 MongoDB Connection Diagnostic Test');
console.log('====================================');

console.log('📋 Connection Details:');
console.log('URI:', process.env.MONGO_URI ? 'Found in .env' : 'Missing in .env');
console.log('Database:', 'manamcare');
console.log('');

const testConnection = async () => {
  try {
    console.log('🔄 Testing MongoDB connection...');
    
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 15000, // 15 seconds
      socketTimeoutMS: 45000,
      connectTimeoutMS: 15000,
      bufferMaxEntries: 0,
      retryWrites: true,
      w: 'majority'
    };

    console.log('⏳ Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGO_URI, options);
    
    console.log('✅ SUCCESS: MongoDB connected successfully!');
    console.log('📊 Connection State:', mongoose.connection.readyState);
    console.log('🏷️  Database Name:', mongoose.connection.name);
    console.log('🌐 Host:', mongoose.connection.host);
    
    // Test a simple operation
    console.log('🧪 Testing database operations...');
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📁 Collections found:', collections.length);
    
    console.log('');
    console.log('🎉 Database connection is working perfectly!');
    console.log('✅ You can now start your server normally');
    
  } catch (error) {
    console.log('❌ CONNECTION FAILED');
    console.log('Error Type:', error.name);
    console.log('Error Message:', error.message);
    console.log('');
    
    if (error.message.includes('IP')) {
      console.log('🔧 IP Whitelist Issue:');
      console.log('1. Go to https://cloud.mongodb.com');
      console.log('2. Select your project');
      console.log('3. Go to Network Access');
      console.log('4. Ensure 0.0.0.0/0 is added and ACTIVE');
      console.log('5. Wait 2-3 minutes for changes to propagate');
    } else if (error.message.includes('authentication')) {
      console.log('🔧 Authentication Issue:');
      console.log('1. Check username/password in connection string');
      console.log('2. Verify database user exists in MongoDB Atlas');
      console.log('3. Check user permissions');
    } else if (error.message.includes('timeout')) {
      console.log('🔧 Timeout Issue:');
      console.log('1. Check your internet connection');
      console.log('2. Try again in a few minutes');
      console.log('3. Check if VPN/Firewall is blocking connection');
    } else {
      console.log('🔧 General Connection Issue:');
      console.log('1. Verify connection string format');
      console.log('2. Check MongoDB Atlas cluster status');
      console.log('3. Try restarting your network connection');
    }
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log('🔌 Connection closed');
    }
    process.exit(0);
  }
};

testConnection();