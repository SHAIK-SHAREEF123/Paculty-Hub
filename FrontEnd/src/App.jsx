import React, {useEffect} from 'react';
import './App.css';
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import {toggleDarkMode} from "./store/themeSlice"
import Header from './components/Header/Header';

function App() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  // Apply theme class to <html> for better global styling
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen flex flex-col px-4 transition-all duration-300 
      ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <div className="text-center space-y-6">
        {user && <Header />} {/* Show Header only if user is logged in */}
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
