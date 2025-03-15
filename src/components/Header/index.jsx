import React, { useState } from "react";
import { FaRedo, FaBell, FaCog, FaAngleDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = ({ setIsAuthenticated }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Logout funksiyasi
const handleLogout = () => {
  localStorage.removeItem("token"); // Faqat tokenni o‘chiramiz, akkaunt ma’lumotlari qoladi
  window.location.reload(); // Sahifani qayta yuklaymiz
};


  return (
    <header className="header">
      <div className="left-section">
        <Link to="/" className="logo">
          <i className="fa-solid fa-blog"></i>
        </Link>
        <button className="new-btn">+ New</button>
      </div>

      <div className="search-section">
        <input type="text" placeholder="Search group and join..." />
      </div>

      <div className="right-section">
        <FaRedo className="icon" />

        {/* Bildirishnoma (Notification) tugmasi */}
        <div className="notification">
          <FaBell className="icon" />
        </div>

        {/* Nastroyka tugmasi */}
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
