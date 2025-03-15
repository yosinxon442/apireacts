import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import useAuth, { getToken } from "../../hooks/useAuth";
import { Link, Navigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const { loginMutation } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (getToken()) {
    return <Navigate to="/" />;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation.mutate({ username, password });
  };

  return (
    <div className="login-wrapper">
      {/* Chap tomondagi brend qismi */}
      <div className="login-left">
        <img src="/logo.png" alt="Logo" className="logo" />
        <p>Welcome back to</p>
        <h1>Shopping List</h1>
      </div>

      {/* O'ng tomondagi login formasi */}
      <div className="login-right">
        <h2>Sign In</h2>
        <form onSubmit={handleLogin}>
          <label>Username</label>
          <div className="input-group">
            <FaUser className="icon" />
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <label>Password</label>
          <div className="input-group">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loginMutation.isLoading}>
            {loginMutation.isLoading ? "Logging in..." : "Sign In"}
          </button>
        </form>

        <p>
          No account yet? <Link to="/register">Create One.</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
