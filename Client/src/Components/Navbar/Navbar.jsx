import React, { useContext, useState } from "react";

import UserProfile from "./UserProfile";
import { AuthContex } from "../Context/auth-context";
import "./NavBar.css";

const Navbar = ({ setShow }) => {
  const auth = useContext(AuthContex);
  const initials = "B";

  return (
    <nav className="nav-container">
      <h1>TicketsAsii</h1>
      {auth.user.isLoggedIn && <button onClick={auth.logout}>Logout</button>}
      {auth.user.isLoggedIn && <button onClick={setShow}>Add Ticket</button>}
      {auth.user.isLoggedIn && <UserProfile userInitial={initials} />}
    </nav>
  );
};

export default Navbar;
