import React, { useEffect, useState } from "react";
import "./SportxHome.css";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { userService } from "../Services/userService";
import { notificationService } from "../Services/notificationService";

const SportxHome = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const username = sessionStorage.getItem("username"); // Gets "Alice"
  // const username = localStorage.getItem("username");
  console.log(username);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await userService.getUserByUsername(username);
        console.log(userData);
        setUser(userData);
      } catch (err) {
        setError("Failed to fetch user Information");
      } finally {
        setLoading(false);
      }
    };
    if (username) {
      fetchUser();
    } else {
      setError("No username found. please log in again.");
      setLoading(false);
    }
  }, [username]);
  if (loading) return <p>Loading user info..</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  // const userId = sessionStorage.setItem("userId", user.id);

  return (
    <div className="sportx-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">
          SportX <i class="fa-solid fa-basketball" />
        </div>
        <div className="nav-links">
          <button className={`nav-btn`}>Home</button>
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

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              "Fear less"
              <br />
              do more
            </h1>
            <p className="hero-subtitle">Apply for your membership</p>
            <p className="hero-subtitle">Id card today</p>
            <Link to="/membership">
              <button className="apply-btn">Apply Now</button>
            </Link>
          </div>
          <div className="hero-image"></div>
        </div>
      </div>

      {/* Pool Access Section */}
      <div className="pool-section">
        <div className="pool-content">
          <div className="discount-text">
            <div className="discount-number">50%</div>
            <div className="discount-number">OFF</div>
          </div>
          <div className="pool-title">
            Pool
            <br />
            Access
          </div>
        </div>
        <div className="pool-image-container">
          <div className="pool-image">
            <div className="pool-badge">
              SWIMMING POOL
              <br />
              FACILITIES
            </div>
            <div className="pool-overlay"></div>
          </div>
        </div>
      </div>

      {/* Events & Entertainment Section */}
      <div className="events-section">
        <h2 className="events-title">EVENTS & ENTERTAINMENT</h2>
        <div className="events-grid">
          <button className="event-card">
            <div className="event-image football">
              <div className="event-icon">⚽</div>
            </div>
            <div className="event-info">
              <div className="event-badge">FF'25</div>
              <div className="event-text">
                Inter-club
                <br />
                Football
                <br />
                Tournament
              </div>
            </div>
          </button>

          <button className="event-card">
            <div className="event-image cricket">
              <div className="event-icon">🏏</div>
            </div>
            <div className="event-info">
              <div className="event-badge">FF'25</div>
              <div className="event-text">
                Inter-club
                <br />
                Football
                <br />
                Tournament
              </div>
            </div>
          </button>

          <button className="event-card">
            <div className="event-image tennis">
              <div className="event-icon">🎾</div>
            </div>
            <div className="event-info">
              <div className="event-badge">FF'25</div>
              <div className="event-text">
                Inter-club
                <br />
                Football
                <br />
                Tournament
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Membership Discount Section */}
      <div className="discount-section">
        <h2 className="discount-title">
          Membership
          <br />
          Discount
        </h2>
        <div className="discount-card">
          <div className="discount-amount">
            15%
            <br />
            OFF
          </div>
          <div className="discount-item">Pool Equipment</div>
        </div>
        <div className="discount-card">
          <div className="discount-amount">
            10%
            <br />
            OFF
          </div>
          <div className="discount-item">Athletic Equipment</div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        © 2025 SportX, Inc. All Rights Reserved.
      </footer>
    </div>
  );
};
export default SportxHome;
