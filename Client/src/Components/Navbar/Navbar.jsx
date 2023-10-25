import React, { useContext } from "react";

import UserProfile from "./UserProfile";
import { AuthContex } from "../Context/auth-context";
import "./NavBar.css";

const Navbar = () => {
  const auth = useContext(AuthContex);
  const initials = "B";

  return (
    <nav className="nav-container">
      <h1>TicketsAsii</h1>
      {auth.isLoggedIn && <UserProfile userInitial={initials} />}
    </nav>
  );
};

export default Navbar;
