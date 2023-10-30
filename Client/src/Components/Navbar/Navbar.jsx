import React, { useContext, useState } from "react";

import UserProfile from "./UserProfile";
import { AuthContext } from "../Context/auth-context";
import "./NavBar.css";
import { MdLibraryAdd, MdOutlineLogout } from "react-icons/md";
import Button from "../Button/Button";

const Navbar = ({ setShow }) => {
  const auth = useContext(AuthContext);

  return (
    <nav className="nav-container">
      <h1>TicketsAsii</h1>
      {auth.user.isLoggedIn && <Button title='New Ticket' icon={<MdLibraryAdd />} type="approve" onClick={setShow} />}
      {auth.user.isLoggedIn && <Button title='Logout' icon={<MdOutlineLogout />} type="decline" onClick={() => auth.logout()} />}
      {auth.user.isLoggedIn && <UserProfile userInitial={auth.user.username[0].toUpperCase()} />}
    </nav>
  );
};

export default Navbar;
