import React from "react";

import "./Login.css";

const Login = () => {
  return (
    <div className="form-container-front">
      <h1 className="title">LogIn</h1>
      <div className="login-inputs">
        <input placeholder="email" />
        <input placeholder="username" />
        <input placeholder="password" />
      </div>
      <button className="login-button">LogIn</button>
    </div>
  );
};

export default Login;
