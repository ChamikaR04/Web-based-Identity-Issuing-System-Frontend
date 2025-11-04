import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import { adminService } from "../Services/adminService";

export const AdminLogin = () => {
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
  });

  //adding new status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };
  const handleSubmit = async () => {
    setError("");
    setSuccess("");
    //validations
    if (!loginData.userName || !loginData.password) {
      setError("Please fill All the required fields ");
      return;
    }

    setLoading(true);
    try {
      const response = await adminService.loginAdmin(loginData);
      console.log("Login Successfull : ", response);
      setTimeout(() => {
        window.location.href = "/admindash";
      }, 2000);

      if (typeof response == "string") {
        setSuccess(response);
      } else if (response && response.message) {
        setSuccess(response.message);
      } else {
        setSuccess("Login Successfull");
      }

      setLoginData({
        userName: "",
        password: "",
      });
    } catch (err) {
      console.error("Login Error :", err);
      if (typeof err == "string") {
        setError(err);
      } else if (err && err.message) {
        setError(err.message);
      } else {
        setError("Login Failed Try again");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="admin-login-container">
        {/* Header */}
        <div className="admin-header">
          <div className="admin-logo">
            SportX
            <i className="fa-solid fa-basketball"></i>
          </div>
        </div>

        {/* Login Form */}
        <div className="login-box">
          <div className="login-header">
            <div className="admin-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="icon-svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h2 className="login-title">Admin Login</h2>
            <p className="login-subtitle">
              Access the administrative dashboard
            </p>
          </div>

          <form className="login-form">
            {error && (
              <div className="error-box">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="error-icon"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
                {error}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Username</label>
              <div className="input-wrapper">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="input-icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <input
                  type="text"
                  name="userName"
                  placeholder="Enter admin username"
                  value={loginData.userName}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrapper">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="input-icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleInputChange}
                  placeholder="Enter password"
                  className="form-input"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className={`submit-btn ${loading ? "disabled" : ""}`}
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="login-footer">
            <p className="footer-text">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="footer-icon"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              Administrator access only
            </p>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="bottom-footer">
          © 2025 SportX, Inc. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};
export default AdminLogin;
