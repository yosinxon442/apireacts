import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "./PrivateRoute";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { getToken } from "../hooks/useAuth";

const Router = () => {
  const isAuthenticated = getToken();

  return (
    <BrowserRouter>
      {isAuthenticated && <Header />}
      <div className="app-container">
        {isAuthenticated && <Sidebar />}
        <div className="content">
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/" element={<Navigate to="/profile" />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Router;
