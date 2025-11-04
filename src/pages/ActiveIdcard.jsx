import React, { useEffect, useState } from "react";
import "./ActiveIdcard.css";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { idcardService } from "../Services/idcardService";
import { set } from "date-fns";
import { userService } from "../Services/userService";

export const ActiveIdcard = () => {
  const [userData, setUserData] = useState(null);
  const [cardData, setCardData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const userId = sessionStorage.getItem("userId");
  const username = sessionStorage.getItem("username");

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const data = await idcardService.getIdByUserId(userId);
        console.log(data);
        setCardData(data);
      } catch (error) {
        console.error("Error fetching ID card data:", error);
        setError("Failed to fetch ID card data.");
      } finally {
        setLoading(false);
      }
    };
    if (userId) {
      fetchCardData();
    } else {
      setError("No CardData found. please log in again.");
      setLoading(false);
    }
  }, [userId]);
  if (loading) return <p>Loading user info..</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="idcard-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">
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
      </nav>

      {/* Main Content */}
      <div className="idcard-content">
        <h1 className="idcard-title">Your ID</h1>

        <div className="card-display">
          {/* ID Card */}
          <div className="membership-card">
            <div className="card-header">
              <h2 className="card-brand">SportX - Member</h2>
            </div>

            <div className="card-body">
              <div className="card-left">
                <div className="card-avatar">
                  <svg
                    className="avatar-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div className="user-id-section">
                  <span className="user-id-label">User Id :</span>
                  <div className="user-id-value">
                    {cardData?.userId || "N/A"}
                  </div>
                </div>
              </div>

              <div className="card-right">
                <div className="card-field">
                  <span className="field-label">Card Id :</span>
                  <div className="field-value">{cardData.cardNumber}</div>
                </div>

                <div className="card-field">
                  <span className="field-label">Name :</span>
                  <div className="field-value">{username}</div>
                </div>

                <div className="card-dates">
                  <div className="date-field">
                    <span className="field-label">Created Date:</span>
                    <div className="field-value">{cardData.issueDate}</div>
                  </div>
                  <div className="date-field">
                    <span className="field-label">Exp. Date :</span>
                    <div className="field-value">{cardData.expiryDate}</div>
                  </div>
                </div>

                <div className="status-section">
                  <div className="status-indicator">
                    <span className="status-dot"></span>
                    <span className="status-text">{cardData.status}</span>
                  </div>
                  <div className="barcode">
                    <svg viewBox="0 0 200 50" className="barcode-svg">
                      <rect x="5" y="0" width="3" height="50" fill="black" />
                      <rect x="12" y="0" width="2" height="50" fill="black" />
                      <rect x="18" y="0" width="4" height="50" fill="black" />
                      <rect x="26" y="0" width="2" height="50" fill="black" />
                      <rect x="32" y="0" width="3" height="50" fill="black" />
                      <rect x="40" y="0" width="5" height="50" fill="black" />
                      <rect x="48" y="0" width="2" height="50" fill="black" />
                      <rect x="54" y="0" width="3" height="50" fill="black" />
                      <rect x="62" y="0" width="4" height="50" fill="black" />
                      <rect x="70" y="0" width="2" height="50" fill="black" />
                      <rect x="76" y="0" width="3" height="50" fill="black" />
                      <rect x="84" y="0" width="5" height="50" fill="black" />
                      <rect x="92" y="0" width="2" height="50" fill="black" />
                      <rect x="98" y="0" width="4" height="50" fill="black" />
                      <rect x="106" y="0" width="3" height="50" fill="black" />
                      <rect x="114" y="0" width="2" height="50" fill="black" />
                      <rect x="120" y="0" width="5" height="50" fill="black" />
                      <rect x="128" y="0" width="3" height="50" fill="black" />
                      <rect x="136" y="0" width="2" height="50" fill="black" />
                      <rect x="142" y="0" width="4" height="50" fill="black" />
                      <rect x="150" y="0" width="3" height="50" fill="black" />
                      <rect x="158" y="0" width="5" height="50" fill="black" />
                      <rect x="166" y="0" width="2" height="50" fill="black" />
                      <rect x="172" y="0" width="3" height="50" fill="black" />
                      <rect x="180" y="0" width="4" height="50" fill="black" />
                      <rect x="188" y="0" width="2" height="50" fill="black" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Renewal Section */}
          <div className="renewal-card-id">
            <div className="expiring-badge">
              <span className="badge-icon">⚠️</span>
              <span className="badge-text">
                Membership
                <br />
                Expiring soon?
              </span>
            </div>
            <Link to="/renewal">
              <button className="renew-btn-card-id">
                Renew
                <br />
                Membership
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        © 2025 SportX, Inc. All Rights Reserved.
      </footer>
    </div>
  );
};
export default ActiveIdcard;
