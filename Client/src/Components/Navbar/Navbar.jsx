import React, { useContext } from "react";

import UserProfile from "./UserProfile";
import { AuthContext } from "../Context/auth-context";
import "./NavBar.css";

const Navbar = () => {
  const auth = useContext(AuthContext);

  return (
    <nav className="nav-container">
      <h1>TicketsAsii</h1>
      {auth.user.isLoggedIn && <button onClick={auth.logout}>Logout</button>}
      {auth.user.isLoggedIn && <UserProfile userInitial={auth.user.username[0].toUpperCase()} />}
    </nav>
  );
};

export default Navbar;
