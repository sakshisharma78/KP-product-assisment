const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://s8634878:WOkoyhTXP6QpjIo2@cluster0.3wonooh.mongodb.net/feedback_system?retryWrites=true&w=majority' || 'mongodb://127.0.0.1:27017/feedback_system');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
