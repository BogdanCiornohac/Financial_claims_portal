import React, { useState, useContext } from "react";

import Input from "../Input/Input";
import { AuthContex } from "../Context/auth-context";
import { RiEyeCloseLine } from "react-icons/ri";
import { RiEyeLine } from "react-icons/ri";
import "./Login.css";

const Login = ({ rotateForm, user, setUser }) => {
  const [showPassword, setShowPassword] = useState(false);
  const auth = useContext(AuthContex);

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const setUserHandler = (id, value) => {
    setUser({
      ...user,
      [id]: value,
    });
  };

  const formHandler = async (event) => {
    event.preventDefault();

    const requestData = {
      username: user.username,
      password: user.password,
    };

    try {
      const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      const data = await response.json();
      console.log(data);
      if (data.authenticated) {
        auth.login(data.id);
        console.log('Logged in');
      } else {
        console.log("Authentication failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form className="form-container-front" onSubmit={formHandler}>
      <h1 className="title">LogIn</h1>
      <div className="login-inputs">
        <Input
          placeholder="Username"
          type="text"
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
      <button className="login-button">LogIn</button>
      <hr />
      <p>
        Don't have an account? <a onClick={rotateForm}>SignUp here.</a>
      </p>
    </form>
  );
};

export default Login;
