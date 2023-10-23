import React, { useState } from "react";

import { RiEyeCloseLine } from "react-icons/ri";
import { RiEyeLine } from "react-icons/ri";
import "./Login.css";

const Login = ({ rotateForm }) => {
  const [showPassword, setShowPassword] = useState(false);

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="form-container-front">
      <h1 className="title">LogIn</h1>
      <div className="login-inputs">
        <input placeholder="Username" />
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
          />
          {showPassword ? (
            <RiEyeLine onClick={showPasswordHandler} className="input-icon" />
          ) : (
            <RiEyeCloseLine
              onClick={showPasswordHandler}
              className="input-icon"
            />
          )}
        </div>
      </div>
      <button className="login-button">LogIn</button>
      <hr />
      <p>
        Don't have an account? <a onClick={rotateForm}>SignUp here.</a>
      </p>
    </form>
  );
};

export default Login;
