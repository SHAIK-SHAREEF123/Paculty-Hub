import React from 'react';
import './App.css'
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white px-4">
      <div className="text-center space-y-6">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App
