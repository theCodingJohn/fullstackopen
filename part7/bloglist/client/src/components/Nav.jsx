import React from "react";
import { Link } from "react-router-dom";

const Nav = ({ logoutUser, user }) => {

  return (
    <div>
      <Link to="/blogs">blogs</Link>
      <Link to="/users">users</Link>
      {
        user &&
        <div>
          <strong>{user.name}</strong> is logged in
          <button onClick={logoutUser}>logout</button>
        </div>
      }
    </div>
  );
};

export default Nav;
