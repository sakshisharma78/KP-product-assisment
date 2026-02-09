const mongoose = require('mongoose');

const testConnection = async () => {
    console.log('Testing MongoDB connection...');
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/test_db', { serverSelectionTimeoutMS: 5000 });
        console.log('MongoDB connection successful!');
        process.exit(0);
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

testConnection();
