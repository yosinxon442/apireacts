import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Groups.css";

const API_URL = "https://nt-shopping-list.onrender.com/api/groups";

const Groups = ({ searchTerm }) => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate(); // React Router navigatsiyasi

  useEffect(() => {
    const fetchGroups = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Authorization error: Please log in again.");
        return;
      }

      try {
        const response = await axios.get(API_URL, {
          headers: { "x-auth-token": token },
        });

        console.log("Fetched groups:", response.data);
        setGroups(response.data || []);
      } catch (error) {
        console.error("Error fetching groups:", error);
        alert("Failed to load groups.");
      }
    };

    fetchGroups();
  }, []);

  // Groupga kirish (id orqali yo'naltirish)
  const joinGroup = (groupId) => {
    navigate(`/groups/${groupId}`);
  };

  const filteredGroups = searchTerm
    ? groups.filter(
        (group) =>
          group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          group.creator.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : groups;

  return (
    <div className="groups-container">
      <div className="groups-list">
        {filteredGroups.length > 0 ? (
          filteredGroups.map((group) => (
            <div key={group._id || group.id} className="group-card">
              <h3>{group.name}</h3>
              <span className="group-date">{group.date}</span>
              <p>Created By {group.creator}</p>
              <div className="group-actions">
                <button className="join-btn" onClick={() => joinGroup(group._id || group.id)}>
                  Join
                </button>
                <Link to={`/groups/${group._id || group.id}`} className="view-btn">
                  View
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No groups found.</p>
        )}
      </div>
    </div>
  );
};

export default Groups;
