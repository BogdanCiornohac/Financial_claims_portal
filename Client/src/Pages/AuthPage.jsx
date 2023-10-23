import React, { useState } from "react";

import Login from "../Components/Auth/Login";
import Signup from "../Components/Auth/Signup";
import "./AuthPage.css";

const AuthPage = () => {
  const [rotate, setRotate] = useState(false);

  const rotateHandler = () => {
    setRotate(!rotate);
  };

  return (
    <div className="auth-container">
      <div className="form-container" onClick={rotateHandler}>
        <div className={`form-container-inner ${rotate && "rotate"}`}>
          <Login />
          <Signup />
        </div>
      </div>
      <div className="spacer layer1"></div>
    </div>
  );
};

export default AuthPage;
