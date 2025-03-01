import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const { status } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@rgukt(rkv|n|ong|sklm)?\.ac\.in$/;
        return emailRegex.test(email);
    };

    const handleGoogleLogin = async (decoded) => {
        try {
            const res = await axios.post("http://localhost:8000/users/auth/google-login", {
                name: decoded.name,
                email: decoded.email
            });
            dispatch(login(res.data.user));
            localStorage.setItem("token", res.data.token);
            navigate("/home");
        } catch (error) {
            setError(error.response?.data?.message || "Google Login Failed");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!validateEmail(email)) {
            setError("Invalid Email Format");
            return;
        }

        try {
            const res = await axios.post("http://localhost:8000/users/login", { email, password });
            dispatch(login(res.data.user));
            localStorage.setItem("token", res.data.token);
            // await dispatch(login({ email, token: res.data.token }));
            navigate("/home");
        } catch (error) {
            setError(error.response?.data?.message || "Login failed");
        }
    };


    return (
        <div className="flex items-center justify-center h-auto min-h-[80vh]">
            <form onSubmit={handleSubmit} className="bg-white bg-opacity-30 backdrop-blur-md p-8 rounded-xl shadow-lg w-96 mt-10 mb-10 border-1">
                <img src="./images/img1.jpeg" alt="Logo" className="w-20 h-20 mx-auto mb-4 rounded-full shadow-md" />
                <h1 className="text-2xl font-bold text-black text-center mb-4">Login to your Account</h1>

                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

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

                <button type="submit" className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl cursor-pointer">
                    {status === "loading" ? "Logging in..." : "Login"}
                </button>

                <div className="mt-4">
                    <GoogleLogin
                        onSuccess={(credentialResponse) => {
                            const decoded = jwtDecode(credentialResponse?.credential);
                            handleGoogleLogin(decoded);
                        }}
                        onError={() => setError("Google Login Failed!")}
                    />
                </div>

                <p className="text-gray-600 text-center mt-4">
                    Don't have an account?{" "}
                    <span className="text-blue-500 cursor-pointer hover:text-blue-700 hover:underline transition-all" onClick={() => navigate("/signup")}>
                        Signup
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;
