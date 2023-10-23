import React, { useState } from "react";

import { RiEyeCloseLine } from "react-icons/ri";
import { RiEyeLine } from "react-icons/ri";
import "./Signup.css";

const Signup = ({ rotateForm }) => {
  const [showPassword, setShowPassword] = useState(false);

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };
  return (
    <form className="form-container-back">
      <h1 className="title">SignUp</h1>
      <div className="login-inputs">
        <input type="email" placeholder="email" required />
        <input type="text" placeholder="username" />
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
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
      <button className="login-button">SignUp</button>
      <hr />
      <p>
        Already have an account? <a onClick={rotateForm}>LogIn here.</a>
      </p>
    </form>
  );
};

export default Signup;
