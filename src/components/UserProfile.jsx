import React from "react";
import "./UserProfile.css";

function UserProfile({ user }) {
  return (
    <div className="user-profile">
      <img className="profile-pic" src={user.profilePic} alt="Profile" />
      <h3>{user.name}</h3>
      <button className="follow-button">Follow</button>
    </div>
  );
}

export default UserProfile;
