import React from "react";

import "./Modal.css";

const Modal = ({ show, reset }) => {
  return <>{show && <div className="backdrop" onClick={reset}></div>}</>;
};

export default Modal;
