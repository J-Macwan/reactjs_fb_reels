import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
       
       
        <li>
          <Link to="/reelsfeed">Reels</Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
