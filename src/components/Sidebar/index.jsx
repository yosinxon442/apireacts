import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaComments, FaUsers, FaInfoCircle } from "react-icons/fa"; // 🔥 FaInfoCircle qo'shildi
import AddGroupModal from "./AddGroupModal";
import "./Sidebar.css";

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGroupId, setCurrentGroupId] = useState(null); // 🔥 Yangi yaratilgan guruh ID sini saqlash uchun

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

      {/* 🔥 Agar guruh yaratilgan bo‘lsa, GroupDetail sahifasiga yo‘naltiruvchi tugma */}
      {currentGroupId && (
        <Link to={`/groups/${currentGroupId}`} className="sidebar-item">
          <FaInfoCircle className="icon" />
          View New Group
        </Link>
      )}

      {isModalOpen && (
        <AddGroupModal 
          onClose={() => setIsModalOpen(false)} 
          setCurrentGroupId={setCurrentGroupId} // 🔥 Modal orqali yangi yaratilgan guruh ID sini olish
        />
      )}
    </div>
  );
};

export default Sidebar;
