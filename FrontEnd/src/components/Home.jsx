import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import Signup from './Signup';
import Login from './Login';

const Home = () => {
  // const [isNewUser, setIsNewUser] = useState(true);
  // const status = useSelector((state) => state.auth.status);
  // useEffect(() => {
  //   if (!status) {
  //     setIsNewUser(true);
  //   }
  // }, [status]);
  // const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-center ">
      {/* <div className="bg-white bg-opacity-20 backdrop-blur-lg shadow-lg rounded-2xl p-8 w-96 text-center">
        <h1 className="text-3xl font-bold text-white mb-6">
          {isNewUser ? "Create an Account" : "Welcome Back"}
        </h1> */}

        {/* {isNewUser ? <Signup /> : <Login />} */}

     
      {/* </div> */}
    </div>
  
  );
};

export default Home;
