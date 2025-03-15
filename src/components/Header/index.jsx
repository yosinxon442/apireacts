import React, { useState } from "react";
import { FaRedo, FaBell, FaCog, FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="left-section">
        <Link to="/" className="logo">
          <i className="fa-solid fa-blog lahinss"></i>
        </Link>
        <button className="new-btn">+ New</button>
      </div>

      <div className="search-section">
        <input type="text" placeholder="Search group and join..." />
      </div>

      <div className="right-section">
        <FaRedo onClick={() => window.location.reload()} className="icon" />

        <div className="notification">
          <FaBell className="icon" />
        </div>

        <div className="settings">
          <FaCog className="icon" onClick={() => setDropdownOpen(!dropdownOpen)} />
          {dropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={handleLogout}>Log out</button>
            </div>
          )}
        </div>

        <FaAngleDown className="icon" />
      </div>
    </header>
  );
};

export default Header;
