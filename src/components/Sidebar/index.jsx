import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaComments } from "react-icons/fa";
import AddGroupModal from "./AddGroupModal";
import "./Sidebar.css";

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="sidebar">
      <Link to="/profile" className="sidebar-item">
        <FaUser className="icon" />
        Profile
      </Link>
      <button className="sidebar-item" onClick={() => setIsModalOpen(true)}>
        <FaComments className="icon" />
        Add Group
      </button>
      {isModalOpen && <AddGroupModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Sidebar;
