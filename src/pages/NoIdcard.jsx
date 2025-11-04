import React from "react";
import "./NoIdcard.css";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export const NoIdcard = () => {
  return (
    <div className="noIdcardContainer">
      <nav class="navbar">
        <div class="nav-container">
          <div class="logo">
            SportX
            <i class="fa-solid fa-basketball" />
          </div>
          <div className="nav-links">
            <Link to="/Home">
              <button className={`nav-btn`}>Home</button>
            </Link>
            <Link to="/membership">
              <button className={`nav-btn `}>Membership</button>
            </Link>
            <Link to="/idcard">
              <button className={`nav-btn `}>ID Card</button>
            </Link>
          </div>
          <Link to="/userprofile">
            <button className="profile-btn">
              <FaUserCircle size={48} color="Grey" />
            </button>
          </Link>
        </div>
      </nav>

      <main class="main-content">
        <div class="background-image"></div>

        <div class="content-wrapper">
          <h1 class="title">Your ID</h1>

          <div class="member-card">
            <h2 class="card-title">SportX - Member</h2>
            <p class="card-message">Your Membership Still Not been Approved.</p>
          </div>
        </div>
      </main>
      <footer class="footer">
        <p>&copy; 2025 SportX, Inc. All Rights Reserved.</p>
      </footer>
    </div>
  );
};
export default NoIdcard;
