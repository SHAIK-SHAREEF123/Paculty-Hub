import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import store from './store/store.js'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './components/Signup'
import Login from './components/Login'
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="120726622413-oa157oju3aufd4phqdv1f4eakofvk2mc.apps.googleusercontent.com">
        <Router>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Login />} />
              <Route path="home" element={<Home />} />
              <Route path="signup" element={<Signup />} />
              <Route path="login" element={<Login />} />
            </Route>
          </Routes>
        </Router>
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>
)
