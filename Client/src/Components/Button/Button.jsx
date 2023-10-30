import React from "react";

import "./Button.css";

const Button = ({ title, icon, type }) => {
  return (
    <button className={`button ${type}`}>
      {title}
      {icon}
    </button>
  );
};

export default Button;
