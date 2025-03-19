import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddGroupModal.css";

const API_URL = "https://nt-shopping-list.onrender.com/api/groups";

const AddGroupModal = ({ onClose, setCurrentGroupId }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authorization error: Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        API_URL,
        { name: name.trim(), password: password.trim() },
        {
          headers: { "Content-Type": "application/json", "x-auth-token": token },
        }
      );

      alert(response.data.message || "Group added successfully!");
      const newGroupId = response.data._id;
      setCurrentGroupId(newGroupId);
      navigate(`/groups/${newGroupId}`);
      setName("");
      setPassword("");
      onClose();
    } catch (error) {
      console.error("Error adding group:", error.response?.data || error.message);
      alert(`Error: ${error.response?.data?.message || "Failed to add group"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Group</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Group Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Group Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add"}
          </button>
          <button type="button" onClick={onClose} className="close-btn">
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGroupModal;
