import React, { useState, useEffect } from "react";
import { FaRedo, FaBell, FaCog, FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Header.css";

const API_URL = "https://nt-shopping-list.onrender.com/api/groups";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm.length > 0) {
      fetchGroups();
    } else {
      setGroups([]);
    }
  }, [searchTerm]);

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/search?q=${searchTerm}`, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      setGroups(response.data);
    } catch (error) {
      console.error("Guruh qidirishda xatolik:", error);
    } finally {
      setLoading(false);
    }
  };

  const joinGroup = async (groupId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Avval tizimga kiring!");
        return;
      }

      const response = await axios.post(
        `${API_URL}/${groupId}/join/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(`Siz "${response.data.name}" guruhiga qo‘shildingiz!`);
    } catch (error) {
      console.error("Guruhga qo‘shilishda xatolik:", error);
      alert(error.response?.data?.message || "Guruhga qo‘shilishda xatolik yuz berdi!");
    }
  };

  return (
    <header className="header">
      <div className="left-section">
        <Link to="/" className="logo">
          <i className="fa-solid fa-blog lahinss"></i>
        </Link>
        <button className="new-btn">+ New</button>
      </div>

      <div className="search-container">
        {/* <img className="lup" src="./assets/icon/loupe.png" alt="Search" /> */}
        <input
          type="text"
          placeholder="Search group..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {searchTerm.length > 0 && (
        <div className="search-content">
          <h1>Groups</h1>
          {groups.length > 0 ? (
            groups.map((g) => (
              <div key={g.id} className="search-item">
                <div className="search-item-left">
                  <p className="group">
                    <span>
                      <img src="./assets/icon/teamwork.png" alt="" />
                    </span>
                    <span>{g.name}</span>
                  </p>
                </div>
                <div className="search-item-right">
                  <button className="join" onClick={() => joinGroup(g.id)}>Join</button>
                </div>
              </div>
            ))
          ) : (
            <p>No groups found</p>
          )}
          {loading && <p>Loading...</p>}
        </div>
      )}

      <div className="right-section">
        <FaRedo onClick={() => window.location.reload()} className="icon" />
        <FaBell className="icon" />
        <FaCog className="icon" onClick={() => setDropdownOpen(!dropdownOpen)} />
        {dropdownOpen && (
          <div className="dropdown-menu">
            <button onClick={() => localStorage.removeItem("token") || window.location.reload()}>
              Log out
            </button>
          </div>
        )}
        <FaAngleDown className="icon" />
      </div>
    </header>
  );
};

export default Header;
