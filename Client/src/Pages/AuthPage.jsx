import React, { useState } from "react";

import Login from "../Components/Auth/Login";
import Signup from "../Components/Auth/Signup";
import "./AuthPage.css";

const AuthPage = () => {
  const [rotate, setRotate] = useState(false);
  const [user, setUser] = useState({ email: "", username: "", password: "" });

  const rotateHandler = () => {
    setRotate(!rotate);
  };

  return (
    <div className="auth-container">
      <div className="form-container">
        <div className={`form-container-inner ${rotate && "rotate"}`}>
          <Login rotateForm={rotateHandler} user={user} setUser={setUser} />
          <Signup rotateForm={rotateHandler} user={user} setUser={setUser} />
        </div>
      </div>
      <div className="spacer layer1"></div>
    </div>
  );
};

export default AuthPage;
