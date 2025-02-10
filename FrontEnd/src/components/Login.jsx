import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const { status } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/login", { email, password });
            localStorage.setItem("token", res.data.token);
            await dispatch(login({ email, token: res.data.token }));
            navigate("/home");
        } catch (error) {
            setError(error.response?.data?.message || "Login failed");
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

                <p className="text-gray-600 text-center mt-4">
                    Don't have an account?{" "}
                    <span className="text-green-400 cursor-pointer hover:text-green-600 hover:underline transition-all" onClick={() => navigate("/signup")}>
                        Signup
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;
