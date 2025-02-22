import React from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center 
        bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      
      {/* Glassmorphism Card */}
      {/* <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-xl shadow-2xl w-96"> */}
        <Outlet /> {/* Renders Login or Signup Page */}
      {/* </div> */}
    </div>
  );
}
