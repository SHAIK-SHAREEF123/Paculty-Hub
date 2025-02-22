import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../../store/themeSlice"; // Import theme actions
import { FiSearch, FiLogIn, FiLogOut, FiMenu, FiX, FiMoon, FiSun } from "react-icons/fi";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const darkMode = useSelector((state) => state.theme.darkMode); // Get dark mode state from Redux
  const dispatch = useDispatch();
  
  const status = useSelector((state) => state.status); // Replace with actual authentication state

  return (
    <nav
      className={`fixed top-0 left-0 w-full shadow-md backdrop-blur-md transition-all z-50 
        ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} bg-opacity-30`}
    >
      <div className="w-full px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide flex items-center">
          <img src="./images/img1.jpeg" alt="Logo" className="w-10 h-10 mx-auto mb-1/2 mr-2 rounded-full shadow-md" />
          <span className="text-blue-600">Faculty</span>Hub
        </div>

        {/* Right Side - Dark Mode Toggle + Login/Logout */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => dispatch(toggleDarkMode())} // Dispatch Redux action
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            {darkMode ? <FiSun className="text-yellow-400" /> : <FiMoon className="text-gray-800" />}
          </button>

          {/* Login/Logout Button */}
          {status ? (
            <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center gap-2 transition-all">
              <FiLogOut /> Logout
            </button>
          ) : (
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center gap-2 transition-all">
              <FiLogIn /> Login
            </button>
          )}

          {/* Mobile Menu Toggle
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button> */}
        </div>
      </div>

      {/* Mobile Search Bar
      {menuOpen && (
        <div className="md:hidden px-6 pb-4">
          <input type="text" placeholder="Search faculty..." className="w-full px-4 py-2 border rounded-full focus:outline-none bg-gray-100 text-gray-900" />
        </div>
      )} */}
    </nav>
  );
}
