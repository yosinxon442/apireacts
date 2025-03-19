import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./GroupDetail.css";

const API_URL = "https://nt-shopping-list.onrender.com/api/groups";

const GroupDetail = ({ setCurrentGroupId }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchGroup = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Authorization error: Please log in again.");
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/${id}`, {
          headers: { "x-auth-token": token },
        });

        setGroup(response.data);
        setMembers(response.data.members || []);
      } catch (error) {
        console.error("Error fetching group:", error);
        alert("Failed to load group details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchGroup();
    }
  }, [id]);

  const handleRemoveMember = async (memberId) => {
    const confirmRemove = window.confirm("Are you sure you want to remove this member?");
    if (!confirmRemove) return;

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Authorization error: Please log in again.");
        return;
      }

      await axios.delete(`${API_URL}/${id}/members/${memberId}`, {
        headers: { "x-auth-token": token },
      });

      alert("Member successfully removed!");
      setMembers(members.filter(member => member.id !== memberId));
    } catch (error) {
      console.error("Error removing member:", error);
      alert("Failed to remove member.");
    }
  };

  const handleDeleteGroup = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this group?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Authorization error: Please log in again.");
        return;
      }

      await axios.delete(`${API_URL}/${id}`, {
        headers: { "x-auth-token": token },
      });

      alert("Group successfully deleted!");
      navigate("/groups");
    } catch (error) {
      console.error("Error deleting group:", error);
      alert("Failed to delete group.");
    }
  };

  if (loading) {
    return <p>Loading group details...</p>;
  }

  if (!group) {
    return <p>Group not found.</p>;
  }

  return (
    <div className="group-detail">
      <h2>{group.name}</h2>
      <p><strong>Created By:</strong> {group.creator}</p>
      <p><strong>Date:</strong> {group.date}</p>
      <p><strong>Description:</strong> {group.description || "No description available"}</p>

      {/* 🔥 Members bo‘limi */}
      <div className="members">
        <h3>Members ({members.length})</h3>
        {members.length > 0 ? (
          members.map((member, index) => (
            <div key={member.id || member.email || index} className="member-card">
              <img src={member.profileImage || "/default-avatar.png"} alt={member.username} className="member-avatar" />
              <p><strong>{member.username}</strong></p>
              <p>{member.email}</p>
              <button onClick={() => handleRemoveMember(member.id)}>Remove</button>
            </div>
          ))
        ) : (
          <p>No members found.</p>
        )}
      </div>

      <div className="button-group">
        <Link to="/groups" className="back-btn">Back to Groups</Link>
        <button className="delete-btn" onClick={handleDeleteGroup}>Delete Group</button>
      </div>
    </div>
  );
};

export default GroupDetail;
