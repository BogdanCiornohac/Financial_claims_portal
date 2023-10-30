import React, { useState } from "react";

import Modal from "../Modal/Modal";
import Navbar from "../Navbar/Navbar";
import "./Layout.css";

const Layout = ({ children }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="layout-container">
      <Navbar setShow={() => setShow(true)} />
      <Modal show={show} reset={() => setShow(false)} />
      {children}
      <div className="spacer layer1"></div>
    </div>
  );
};

export default Layout;
