import "./Userprofile.css";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { userService } from "../Services/userService";
import { notificationService } from "../Services/notificationService";
import { parse, format } from "date-fns";

const Userprofile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [updateData, setUpdateData] = useState({
    username: "",
    name: "",
    dateOfBirth: "",
    phone: "",
    email: "",
  });

  const [notifications, setNotifications] = useState([]);
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!userId) return;
      const data = await notificationService.getByUserId(userId);
      setNotifications(data);
    };
    fetchNotifications();
  }, [userId]);

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

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/login";
  };
  const handleDeleteAll = async () => {
    if (!userId) return;
    await notificationService.deleteNotification(userId);
    setNotifications([]);
  };
  const cancelUpdate = () => {
    setIsModelOpen(false);
  };

  const handleUpdateProfile = () => {
    setUpdateData({
      username: user.username,
      name: user.name,
      dateOfBirth: user.dateOfBirth,
      phone: user.phone,
      email: user.email,
    });
    setIsModelOpen(true);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await userService.updateUserprofile(
        user.id,
        updateData
      );
      setUser(updatedUser);
      setIsModelOpen(false);

      setUser((prev) => ({
        ...prev,
        username: updatedUser.username,
        name: updatedUser.name,
        dateOfBirth: updatedUser.dateOfBirth,
        phone: updatedUser.phone,
        email: updatedUser.email,
      }));
      alert("Profile updated successfully");
    } catch (err) {
      console.error("Update profile failed:", err);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="profile-container">
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
        <button className="profile-btn">
          <FaUserCircle size={42} color="white" />
        </button>
      </nav>

      {/* Main Content */}
      {isModelOpen &&
        ReactDOM.createPortal(
          <div className="modal-overlay">
            <div className="modal-container">
              <div className="modal-header">
                <h3>Update Profile</h3>
                <button className="close-btn" onClick={cancelUpdate}>
                  <svg
                    className="icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form className="modal-body" onSubmit={handleSubmitUpdate}>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    value={updateData.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label> Name</label>
                  <input
                    type="text"
                    name="name"
                    value={updateData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={updateData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={updateData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={updateData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn cancel-btn"
                    onClick={cancelUpdate}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn save-btn">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
      <div className="profile-content">
        {/* Left Side - User Information */}
        <div className="user-info-section">
          <div className="profile-avatar">
            <div className="avatar-circle">
              <svg
                className="avatar-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 14c3.866 0 7 3.134 7 7H5c0-3.866 3.134-7 7-7zm0-2a4 4 0 100-8 4 4 0 000 8z"
                />
              </svg>
            </div>
          </div>
          {user && (
            <div className="info-fields">
              <div className="info-row">
                <label className="info-label">User ID :</label>
                <div className="info-value">{user.id}</div>
              </div>
              <div className="info-row">
                <label className="info-label">Username :</label>
                <div className="info-value">{user.username}</div>
              </div>

              <div className="info-row">
                <label className="info-label">Name :</label>
                <div className="info-value">{user.name}</div>
              </div>

              <div className="info-row">
                <label className="info-label">Date of Birth :</label>
                <div className="info-value">{user.dateOfBirth}</div>
              </div>

              <div className="info-row">
                <label className="info-label">Email :</label>
                <div className="info-value">{user.email}</div>
              </div>
            </div>
          )}

          <div class="action-buttons">
            <button className="btn-update" onClick={handleUpdateProfile}>
              <i class="fa-solid fa-pen-to-square"></i> Update Profile
            </button>
            <button className="btn-logout" onClick={handleLogout}>
              <i class="fa-solid fa-right-from-bracket"></i> Logout
            </button>
          </div>
        </div>

        {/* Right Side - Notifications */}
        <div className="notifications-section">
          <h2 className="notifications-title">Notifications</h2>
          <div className="notifications-list">
            {notifications.length === 0 ? (
              <p className="notification-item">No Notification Yet.</p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.notificationId}
                  className="notification-item"
                >
                  <p>
                    <strong>{notification.type}</strong>
                  </p>
                  <span>
                    {notification.date
                      ? (() => {
                          try {
                            return format(
                              parse(
                                notification.date,
                                "yyyy-MM-dd",
                                new Date()
                              ),
                              "MMM dd, yyyy"
                            );
                          } catch (e) {
                            return "Invalid Date";
                          }
                        })()
                      : "No Date"}
                  </span>
                  <div className="notification-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                    </svg>
                  </div>
                  <p className="notification-text">{notification.type}</p>
                </div>
              ))
            )}
          </div>
          <button
            className="btn-delete-all"
            id="deleteAllBtn"
            onClick={handleDeleteAll}
          >
            Delete All
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        © 2025 SportX, Inc. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Userprofile;
