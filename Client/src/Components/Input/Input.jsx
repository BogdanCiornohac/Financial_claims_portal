import React from "react";

import "./Input.css";

const Input = ({ type, placeholder, value, inputHandler }) => {
  const id = placeholder.toLowerCase();
  return (
    <input
      required
      value={value}
      type={type}
      placeholder={placeholder}
      className="input-component"
      onChange={(event) => inputHandler(id, event.target.value)}
    />
  );
};

export default Input;
