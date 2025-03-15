import React from "react";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { removeToken, getUser, getToken } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { FaCopy, FaTrash } from "react-icons/fa";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const user = getUser();

  if (!getToken()) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(user?.username);
    alert(`${user?.username} copied!`);
  };

  return (
    <div className="profile-container">
      <Sidebar />
      <div className="profile-content">
        <h2>Your Profile</h2>

        <div className="profile-card">
          <div className="profile-left">
            <div className="avatar">{user?.name ? user.name[0].toUpperCase() : "?"}</div>
            <div className="profile-info">
              <h3>
                {user?.name} <span className="status-badge">Active</span>
              </h3>
              <p>{user?.username}</p>
            </div>
          </div>

          <div className="buttons">
            <button className="copy-btn" onClick={handleCopy}>
              <FaCopy /> Copy Username
            </button>
            <button className="delete-btn" onClick={handleLogout}>
              <FaTrash /> Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
