import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Groups.css";

const API_URL = "https://nt-shopping-list.onrender.com/api/groups";

const Groups = ({ searchTerm }) => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGroups(response.data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, []);

  // 🔥 Qidiruv bo‘yicha filter qilish
  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.creator.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  return (
    <div className="groups-container">
      <h2>Groups</h2>
      <div className="groups-list">
        {filteredGroups.map((group) => (
          <div key={group.id} className="group-card">
            <h3>{group.name}</h3>
            <span className="group-date">{group.date}</span>
            <p>Created By {group.creator}</p>
            <button className="join-btn">Join</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Groups;
