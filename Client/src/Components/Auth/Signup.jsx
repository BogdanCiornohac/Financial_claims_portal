import React, { useState, useContext } from "react";

import Input from "../Input/Input";
import { AuthContex } from "../Context/auth-context";
import { RiEyeCloseLine } from "react-icons/ri";
import { RiEyeLine } from "react-icons/ri";
import "./Signup.css";

const Signup = ({ rotateForm, user, setUser }) => {
  const [showPassword, setShowPassword] = useState(false);
  const auth = useContext(AuthContex);

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
      const response = await fetch("http://localhost:5173/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        //Trebuie redirectat prin router(cred ca face deja asta dar nu stiu cum sa opresc in cazul in cazul else)
      } else {
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
          placeholder="username"
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
