import React, { useState } from "react";
import { FaLock, FaUser, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import "./Signin.css";
import { userService } from "../Services/userService";
import { Link } from "react-router-dom";

const Signin = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    dateOfBirth: "",
    email: "",
    phone: "",
  });

  // ADD THESE NEW STATES
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // UPDATE THIS FUNCTION TO CALL BACKEND
  const handleSubmit = async () => {
    // Clear previous messages
    setError("");
    setSuccess("");

    // Validate form
    if (
      !formData.name ||
      !formData.email ||
      !formData.username ||
      !formData.password
    ) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true); // Show loading

    try {
      // CALL YOUR BACKEND HERE
      const response = await userService.registerUser(formData);

      // ✅ CORRECT: Extract the message from response
      console.log("Registration successful:", response);

      // If your backend returns a string directly
      if (typeof response === "string") {
        setSuccess(response);
      }
      // If your backend returns an object with a message property
      else if (response && response.message) {
        setSuccess(response.message);
      }
      // If your backend returns an object with userId
      else if (response && response.userId) {
        setSuccess(
          `Account created successfully! Your User ID is: ${response.userId}`
        );
      }
      // Default success message
      else {
        setSuccess("Registration successful!");
      }

      // Clear form
      setFormData({
        name: "",
        username: "",
        password: "",
        dateOfBirth: "",
        email: "",
        phone: "",
      });
      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      console.error("Registration error:", err);

      // ✅ CORRECT: Handle error properly
      if (typeof err === "string") {
        setError(err);
      } else if (err && err.message) {
        setError(err.message);
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <h1 className="brand-logo">
          SportX <i class="fa-solid fa-basketball" />
        </h1>
        <h2 className="signup-title">Create An Account</h2>

        <div className="signup-form">
          <div className="form-row">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-row">
            <input
              type="date"
              name="dateOfBirth"
              placeholder="Date of Birth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="form-input"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone No"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-row">
            <input
              type="text"
              name="username"
              placeholder="User Name"
              value={formData.username}
              onChange={handleChange}
              className="form-input"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="form-input"
            />
          </div>
          {/* ERROR MESSAGE - Display as string */}
          {error && (
            <div
              style={{
                color: "red",
                textAlign: "center",
                marginTop: "1rem",
                backgroundColor: "rgba(255, 0, 0, 0.1)",
                padding: "0.5rem",
                borderRadius: "0.5rem",
              }}
            >
              {/* ✅ CORRECT: error is already a string */}
              {error}
            </div>
          )}
          {/* SUCCESS MESSAGE - Display as string */}
          {success && (
            <div
              style={{
                color: "green",
                textAlign: "center",
                marginTop: "1rem",
                backgroundColor: "rgba(0, 255, 0, 0.1)",
                padding: "0.5rem",
                borderRadius: "0.5rem",
              }}
            >
              {/* ✅ CORRECT: success is already a string */}
              {success}
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="signup-btn"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
