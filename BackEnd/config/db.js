const mongoose = require('mongoose');
const MONGO_URL = "mongodb://127.0.0.1:27017/faculty";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB Connection Failed", error);
    }
};

module.exports = connectDB;
