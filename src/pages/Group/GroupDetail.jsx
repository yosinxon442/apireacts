import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // 🔥 URL parametrlarini olish uchun
import axios from "axios";
// import "./GroupDetail.css";

const API_URL = "https://nt-shopping-list.onrender.com/api/groups";

const GroupDetail = () => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);

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

  if (!group) {
    return <p>Loading group details...</p>;
  }

  return (
    <div className="group-detail">
      <h2>{group.name}</h2>
      <p><strong>Created By:</strong> {group.creator}</p>
      <p><strong>Date:</strong> {group.date}</p>
      <p><strong>Description:</strong> {group.description || "No description available"}</p>

      <Link to="/groups" className="back-btn">Back to Groups</Link> {/* 🔥 Orqaga qaytish tugmasi */}
    </div>
  );
};

export default GroupDetail;
