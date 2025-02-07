import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";


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
            const res = axios.post("https://localhost:8000/login", { email, password });
            localStorage.setItem("token", res.data.token);
            const result = await dispatch(login({ email, password }));
            navigate("/home");
        } catch (error) {
            setError(error.response?.data?.message);
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
                        onSuccess={(response) => console.log("Login Success:", response)}
                        onError={() => console.log("Login Failed")}
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
