const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
import { OAuth2Client } from "google-auth-library";
const User = require("../models/user.js");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    // Extract email, password from request body
    console.log(req.body);
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

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
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ user: { email: user.email }, token });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/auth/google-login", async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { email, name } = ticket.getPayload();
    import React, { useState } from "react";
    import { useDispatch, useSelector } from "react-redux";
    import { login } from "../store/authSlice";
    import { useNavigate } from "react-router-dom";
    import { GoogleLogin } from "@react-oauth/google";
    
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const Login = () => {
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [error, setError] = useState("");
        const [password, setPassword] = useState("");
        const dispatch = useDispatch();
        const { user, status } = useSelector((state) => state.auth);
        const navigate = useNavigate();
        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const res = axios.post("http://localhost:8000/login", { email, password });
                localStorage.setItem("token", res.data.token);
                const result = await dispatch(login({ email, password }));
                navigate("/home");
            } catch (error) {
                setError(error.response?.data?.message);
            }
        };
    
        const handleGoogleLogin = async (res) => {
            console.log("Google Login Response:", res);
            try {
                const googleRes = await axios.post("http://localhost:8000/auth/google-login", { token: res.credential });
    
                localStorage.setItem("token", googleRes.data.token);
                await dispatch(login({ email: googleRes.data.user.email, token: googleRes.data.token }));
                navigate("/home");
            } catch (error) {
                console.error("Google Login Failed:", error.response?.data?.message || error.message);
                setError(error.response?.data?.message || "Google Login failed");
            }
        };
    
    
    
        return (
            <div className="flex items-center justify-center h-auto min-h-[80vh]">
                <form onSubmit={handleSubmit} className="bg-white bg-opacity-30 backdrop-blur-md p-8 rounded-xl shadow-lg w-96">
                    <img src="./images/img1.jpeg" alt="Logo" className="w-20 h-20 mx-auto mb-4 rounded-full shadow-md" />
                    <h1 className="text-2xl font-bold text-black text-center mb-6">Login to your Account</h1>
    
                    {error && <p className="text-red-500 text-sm">{error}</p>}
    
                    <div className="mb-4">
                        <label className="text-black flex justify-start font-medium">Email</label>
                        <input
                            type="email"
                            className="w-full p-3 mt-1 bg-white bg-opacity-80 text-gray-900 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            value={email}
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
    
                    <div className="mb-4">
                        <label className="text-black flex justify-start font-medium">Password</label>
                        <input
                            type="password"
                            className="w-full p-3 mt-1 bg-white bg-opacity-80 text-gray-900 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            value={password}
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
    
                    <button type="submit" className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl">
                        {status ? "Logging in..." : "Login"}
                    </button>
    
                    <div className="mt-4">
                        <GoogleLogin
                            onSuccess={handleGoogleLogin}
                            onError={() => setError("Google Login Failed!")}
                        />
                    </div>
    
                    {/* Already have an account? */}
                    <p className="text-gray-600 text-center mt-4">
                        Don't have an account?{" "}
                        <span
                            className="text-green-400 cursor-pointer hover:text-green-600 hover:underline transition-all"
                            onClick={() => navigate("/signup")}
                        >
                            Signup
                        </span>
                    </p>
                </form>
            </div>
        );
    };
    
    export default Login;
    
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, name });
      await user.save();
    }

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      user: {
        email: user.email,
        name: user.name,
      },
      token: jwtToken,
    });
  } catch (err) {
    res.status(500).json({ message: "Google login failed" });
  }
});

module.exports = router;
