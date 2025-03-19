import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaComments, FaUsers, FaInfoCircle } from "react-icons/fa";
import AddGroupModal from "./AddGroupModal";
import "./Sidebar.css";

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGroupId, setCurrentGroupId] = useState(null);

  return (
    <div className="sidebar">
      <Link to="/profile" className="sidebar-item">
        <FaUser className="icon" />
        Profile
      </Link>

      <Link to="/groups" className="sidebar-item">
        <FaUsers className="icon" />
        Groups
      </Link>

      <button className="sidebar-item" onClick={() => setIsModalOpen(true)}>
        <FaComments className="icon" />
        Add Group
      </button>

      {currentGroupId && (
        <Link to={`/groups/${currentGroupId}`} className="sidebar-item">
          <FaInfoCircle className="icon" />
          View New Group
        </Link>
      )}

      {isModalOpen && (
        <AddGroupModal 
          onClose={() => setIsModalOpen(false)} 
          setCurrentGroupId={setCurrentGroupId}
        />
      )}
    </div>
  );
};

export default Sidebar;