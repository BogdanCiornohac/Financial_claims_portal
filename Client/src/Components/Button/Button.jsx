import React from "react";

import "./Button.css";

const Button = ({ title, icon, type, onClick }) => {
  return (
    <button className={`button ${type}`} onClick={onClick}>
      {title}
      {icon}
    </button>
  );
};

export default Button;
