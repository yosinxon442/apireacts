import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"; // 🔥 useNavigate qo‘shildi
import axios from "axios";
import "./GroupDetail.css";

const API_URL = "https://nt-shopping-list.onrender.com/api/groups";

const GroupDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // 🔥 Sahifani yo‘naltirish uchun
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(false); // 🔥 O‘chirish jarayoni uchun loading holati

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
      } catch (error) {
        console.error("Error fetching group:", error);
        alert("Failed to load group details.");
      }
    };

    fetchGroup();
  }, [id]);

  // 🔥 Guruhni o‘chirish funksiyasi
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this group?");
    if (!confirmDelete) return;

    setLoading(true);

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
      navigate("/groups"); // 🔥 Guruh o‘chirilgandan keyin yo‘naltirish
    } catch (error) {
      console.error("Error deleting group:", error);
      alert("Failed to delete group.");
    } finally {
      setLoading(false);
    }
  };

  if (!group) {
    return <p>Loading group details...</p>;
  }

  return (
    <div className="group-detail">
      <h2>{group.name}</h2>
      <p><strong>Created By:</strong> {group.creator}</p>
      <p><strong>Date:</strong> {group.date}</p>
      <p><strong>Description:</strong> {group.description || "No description available"}</p>

      <div className="button-group">
        <Link to="/groups" className="back-btn">Back to Groups</Link> {/* 🔥 Orqaga qaytish tugmasi */}
        <button className="delete-btn" onClick={handleDelete} disabled={loading}>
          {loading ? "Deleting..." : "Delete Group"} {/* 🔥 Yangi o‘chirish tugmasi */}
        </button>
      </div>
    </div>
  );
};

export default GroupDetail;
