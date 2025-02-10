const express = require('express');
const app = express();
const mongoDB = require('./config/db');
const authRoutes = require('./routes/authRoutes.js');

const cors = require("cors");
require("dotenv").config();

mongoDB();

app.use(cors(
    {origin: "*",
    methods: ["GET", "POST"],}
));

app.use(express.json());

app.use("/users", authRoutes);

app.use("/", (req, res) => {
    res.send("Hi, Iam root!")
})

app.listen(8000, () => {
    console.log("Port is listening on port 8000");
})