import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <h2>Facebook</h2>
      </div>
      <div className="header-right">
        <input placeholder="Search Facebook" />
        <button>Find Friends</button>
      </div>
    </header>
  );
}

export default Header;
