import React, { useState } from "react";
import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "./PrivateRoute";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Groups from "../pages/Group/Groups";
import GroupDetail from "../pages/Group/GroupDetail"; // 🔥 GroupDetail import qilindi
import { getToken } from "../hooks/useAuth";

const AppRouter = () => {
  const isAuthenticated = getToken();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentGroupId, setCurrentGroupId] = useState(null); // 🔥 Yangi qo‘shilgan guruhni saqlash uchun state

  return (
    <Router>
      {isAuthenticated && <Header setSearchTerm={setSearchTerm} />}
      <div className="app-container">
        {isAuthenticated && <Sidebar currentGroupId={currentGroupId} />} {/* 🔥 `currentGroupId` prop sifatida uzatildi */}
        <div className="content">
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/groups" element={<Groups searchTerm={searchTerm} />} />
              <Route 
                path="/groups/:id" 
                element={<GroupDetail setCurrentGroupId={setCurrentGroupId} />} 
              />
              <Route path="/" element={<Navigate to="/profile" replace />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to={isAuthenticated ? "/profile" : "/login"} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default AppRouter;
