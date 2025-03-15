import React, { useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import { BiWifi } from "react-icons/bi";
import useAuth, { getToken } from "../../hooks/useAuth";
import "./Register.css";

const Register = () => {
  const { registerMutation } = useAuth();
  const nameRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  if (getToken()) {
    return <Navigate to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    registerMutation.mutate({ name, username, password });
  };

  return (
    <div className="register-page">
      <div className="register-container">
 
        <div className="register-left">
          <BiWifi className="brand-logo" />
          <p>Welcome to</p>
          <h1>Shopping List</h1>
        </div>

        <div className="register-right">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input type="text" placeholder="Enter your name" ref={nameRef} required />
            <label>Username</label>
            <input type="text" placeholder="Enter your username" ref={usernameRef} required />
            <label>Password</label>
            <input type="password" placeholder="Enter your password" ref={passwordRef} required />
            <button type="submit" disabled={registerMutation.isLoading}>
              {registerMutation.isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          <p>
            Already have an account? <Link to="/login">Log In.</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
