import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError(""); // Reset error before submission
    try {
      console.log(userData);
      const res = await axios.post("http://localhost:8000/users/signup", {name: userData.name, email: userData.email, password: userData.password});
      console.log(res);
      if (res.status === 201) {
        console.log(res.data);
        navigate("/login");
        // dispatch(login(userData)); // Simulate user login
      }
    } catch (err) {
      setError(err || "Signup Failed");
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center h-auto min-h-[80vh]">


      <div className="bg-white bg-opacity-30 backdrop-blur-md p-8 rounded-xl shadow-lg w-96">
        <img src="./images/img1.jpeg" alt="Logo" className="w-20 h-20 mx-auto mb-4 rounded-full shadow-md" />
        <h1 className="text-2xl font-bold text-black text-center mb-6">Create an Account</h1>

        {/* {error && <p className="text-red-500 text-center mb-4">{error}</p>} */}

        <div className="flex flex-col space-y-4">
          {/* Name Input */}
          <div className="relative">
            <label className="text-black flex justify-start font-medium">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 mt-1 bg-white bg-opacity-80 text-gray-900 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <label className="text-black flex justify-start font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 mt-1 bg-white bg-opacity-80 text-gray-900 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <label className="text-black flex justify-start font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 mt-1 bg-white bg-opacity-80 text-gray-900 rounded-lg border-2 border-gray-200  focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            />
          </div>

          {/* Signup Button */}
          <button
            onClick={handleSignup}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl"
          >
            Signup
          </button>
        </div>

        {/* Already have an account? */}
        <p className="text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <span
            className="text-green-400 cursor-pointer hover:text-green-600 hover:underline transition-all"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
