import React, { useState, useMemo } from "react";
import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "./PrivateRoute";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Groups from "../pages/Group/Groups"; // Groups komponentini import qilish
import { getToken } from "../hooks/useAuth";

const AppRouter = () => {
  const isAuthenticated = useMemo(() => getToken(), []);
  const [searchTerm, setSearchTerm] = useState(""); // 🔥 Qidiruv uchun state

  return (
    <Router>
      {isAuthenticated && <Header setSearchTerm={setSearchTerm} />} {/* 🔥 Headerga jo‘natamiz */}
      <div className="app-container">
        {isAuthenticated && <Sidebar />}
        <div className="content">
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/" element={<Navigate to="/profile" replace />} />
            </Route>
            <Route path="/groups" element={<Groups searchTerm={searchTerm} />} /> {/* 🔥 Groupsga qidiruvni jo‘natamiz */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default AppRouter;
