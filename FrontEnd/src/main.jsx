import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import AuthLayout from "./components/layouts/AuthLayout"; // Layout for Login & Signup
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="120726622413-oa157oju3aufd4phqdv1f4eakofvk2mc.apps.googleusercontent.com">
        <Router>
          <Routes>
            {/* Main App Wrapper */}
            <Route path="/" element={<App />}>
              {/* Home Page (Only Accessible After Login) */}
              <Route path="home" element={<Home />} />
            </Route>

            {/* Authentication Routes (Separate Layout) */}
            <Route element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>
          </Routes>
        </Router>
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>
);
