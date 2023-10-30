import React, { useState, useContext } from "react";

import Input from "../Input/Input";
import { AuthContext } from "../Context/auth-context";
import { RiEyeCloseLine } from "react-icons/ri";
import { RiEyeLine } from "react-icons/ri";
import "./Signup.css";

const Signup = ({ rotateForm, user, setUser }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const auth = useContext(AuthContext);

  const setUserHandler = (id, value) => {
    setUser({
      ...user,
      [id]: value,
    });
  };

  const formHandler = async (event) => {
    event.preventDefault();

    const requestData = {
      email: user.email,
      username: user.username,
      password: user.password,
    };

    try {
      const response = await fetch("http://localhost:3000/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      const data = await response.json();

      if (data.registered) {
        auth.login(data.id, data.isAdmin, data.username);
        setError(null);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }

  };

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="form-container-back" onSubmit={formHandler}>
      {error && <div>{error}</div>}
      <h1 className="title">SignUp</h1>
      <div className="login-inputs">
        <Input
          type="email"
          placeholder="Email"
          value={user.email}
          inputHandler={setUserHandler}
        />
        <Input
          type="text"
          placeholder="Username"
          value={user.username}
          inputHandler={setUserHandler}
        />
        <div className="password-container">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={user.password}
            inputHandler={setUserHandler}
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
