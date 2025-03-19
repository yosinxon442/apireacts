import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./GroupDetail.css";
import useGroup from "../../hooks/useGroup"; // Custom hook
import { toast } from "sonner";

const GroupDetail = () => {
  const { id } = useParams();
  const { group, isLoading, deleteGroupMutation } = useGroup(id); // Hook orqali ma'lumot olish
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (group) {
      setMembers(group.members || []);
    }
  }, [group]);

  // 🔴 A'zoni o‘chirish
  const handleRemoveMember = async (memberId) => {
    if (!window.confirm("Are you sure you want to remove this member?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://nt-shopping-list.onrender.com/api/groups/${id}/members/${memberId}`, {
        headers: { "x-auth-token": token },
      });

      setMembers(members.filter((member) => member.id !== memberId));
      toast.success("Member successfully removed!");
    } catch (error) {
      console.error("Error removing member:", error);
      toast.error("Failed to remove member.");
    }
  };

  // 🔴 Guruhni o‘chirish
  const handleDeleteGroup = () => {
    if (!window.confirm("Are you sure you want to delete this group?")) return;
    deleteGroupMutation.mutate(id);
  };

  if (isLoading) return <p>Loading group details...</p>;
  if (!group) return <p>Group not found.</p>;

  return (
    <div className="group-detail">
      <h2>{group.name}</h2>
      <p><strong>Created By:</strong> {group.creator}</p>
      <p><strong>Date:</strong> {group.date}</p>
      <p><strong>Description:</strong> {group.description || "No description available"}</p>

      <h3>Members ({members.length})</h3>
      {members.length > 0 ? (
        members.map((member) => (
          <div key={member.id} className="member-card">
            <p><strong>{member.username}</strong></p>
            <p>{member.email}</p>
            <button onClick={() => handleRemoveMember(member.id)}>Remove</button>
          </div>
        ))
      ) : (
        <p>No members found.</p>
      )}

      <div className="button-group">
        <Link to="/groups" className="back-btn">Back to Groups</Link>
        <button className="delete-btn" onClick={handleDeleteGroup} disabled={deleteGroupMutation.isLoading}>
          {deleteGroupMutation.isLoading ? "Deleting..." : "Delete Group"}
        </button>
      </div>
    </div>
  );
};

export default GroupDetail;
