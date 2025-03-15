import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { FaUser, FaComments } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/profile" className="sidebar-item">
        <FaUser className="icon" />
        Profile
      </Link>
      <Link to="/groups" className="sidebar-item">
        <FaComments className="icon" />
        Groups
      </Link>
    </div>
  );
};

export default Sidebar;
