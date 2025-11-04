import React, { useState, useRef } from "react";
import "./Renewal.css";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { renewalService } from "../Services/renewalService";
import { notificationService } from "../Services/notificationService";

export const Renewal = () => {
  const [userId, setUserId] = useState("");
  const [image, setImage] = useState(null);
  const id = sessionStorage.getItem("userId");
  // ADD THESE NEW STATES
  const [loading, setLoading] = useState(false);

  const handleIdSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!userId || !image) {
      alert("Please provide both user ID and Payement Reciept");
      return;
    } else if (id != userId) {
      alert("Incorrect userId : ");
      return;
    }
    await renewalService.createRenewal(userId, image);
    alert("Renewal Application Submitted Successfully");
    try {
      await notificationService.sendNotification(
        userId,
        "Renewal Application Submitted Successfully"
      );
      console.log("Notification sent successfully");
      alert("Notification sent successfully");
    } catch (error) {
      console.error("Error sending notification:", error);
      alert("Failed to send notification");
    }

    setLoading(false);
    window.location.href = "/home";
  };

  return (
    <div className="renewal-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">
          SportX
          <i className="fa-solid fa-basketball" />
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
            <FaUserCircle size={42} color="white" />
          </button>
        </Link>
      </nav>

      {/* Main Content */}
      <div className="renewal-content">
        <div className="renewal-card">
          <h1 className="renewal-title">Membership Renewal</h1>

          <form className="renewal-form">
            <input
              type="text"
              name="userId"
              placeholder="User Id"
              className="renewal-input"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />

            <div className="file-input-wrapper">
              <input
                type="file"
                id="renewalSlip"
                name="renewalSlip"
                className="file-input-hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <label htmlFor="renewalSlip" className="file-input-label">
                {image
                  ? "File uploaded: " + image.name
                  : "Input your file here"}
              </label>
            </div>

            <button
              className="renew-btn-form"
              type="submit"
              onClick={handleIdSubmit}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Renew"}
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        © 2025 SportX, Inc. All Rights Reserved.
      </footer>
    </div>
  );
};
export default Renewal;
