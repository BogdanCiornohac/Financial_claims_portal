import React from "react";

import "./UserProfile.css";

const UserProfile = ({ userInitial }) => {
  return <div className="user-container">{userInitial}</div>;
};

export default UserProfile;
