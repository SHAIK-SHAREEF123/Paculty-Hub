const express=require('express')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    // Extract email, password from request body
    console.log(req.body);
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user in the database
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Generate a JWT token
    // const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Send response with user info and token
    res.status(201).json({ user: { email: newUser.email } });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});


// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ user: { email: user.email }, token });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
