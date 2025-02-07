const connectDB = require('../config/db.js')
const initData = require("./data.js");
const Faculty = require("../models/faculty.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/faculty";

connectDB();

const initDB = async () => {
  await Faculty.deleteMany({});
  await Faculty.insertMany(initData);
  console.log("Data was initialized...");
};

initDB();