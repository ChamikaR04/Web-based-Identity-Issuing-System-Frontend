import React, { useState } from "react";
import "./Login.css";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { userService } from "../Services/userService";
import { notificationService } from "../Services/notificationService";
import { Link } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
  });

  //adding new status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
      //call backend
      const response = await userService.loginUser(loginData);
      console.log("Login Successfull : ", response);
      // Log the raw response for debugging
      console.log(
        "Raw response from userService.loginUser:",
        JSON.stringify(response, null, 2)
      );
      console.log("Response type:", typeof response);
      console.log("Response keys:", Object.keys(response || {}));

      // Handle case where response might be stringified
      let parsedResponse = response;
      if (typeof response === "string") {
        try {
          parsedResponse = JSON.parse(response);
          console.log(
            "Parsed response:",
            JSON.stringify(parsedResponse, null, 2)
          );
        } catch (parseError) {
          console.error("Failed to parse response:", parseError);
          throw new Error(
            "Invalid response format: Response is a string but not valid JSON"
          );
        }
      }

      // Validate response structure
      if (!parsedResponse || typeof parsedResponse !== "object") {
        console.error("Invalid response structure:", parsedResponse);
        throw new Error("Invalid response: Response is null or not an object");
      }
      // Check for userId
      if (!parsedResponse.userId) {
        console.error(
          "userId not found in response:",
          JSON.stringify(parsedResponse, null, 2)
        );
        throw new Error("Invalid response: userId not found");
      }
      // Store userId in sessionStorage
      sessionStorage.setItem("userId", parsedResponse.userId.toString());
      console.log("Stored userId in sessionStorage:", parsedResponse.userId);

      // Send notification
      try {
        await notificationService.sendNotification(
          parsedResponse.userId,
          "Login Successful"
        );
        console.log(
          "Notification sent successfully for userId:",
          parsedResponse.userId
        );
      } catch (notificationErr) {
        console.warn("Notification failed:", notificationErr);
        setError("Login successful, but failed to send notification");
      }

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

      sessionStorage.setItem("username", loginData.userName);

      setTimeout(() => {
        window.location.href = "/Home";
      }, 2000);
    } catch (err) {
      console.error("Login Error :", err);
      alert("Login Error: Try again");
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
    <div className="login-container">
      <div className="login-content">
        <h1 className="brand-logo">
          SportX <i class="fa-solid fa-basketball" />
        </h1>

        <div className="login-form">
          <input
            type="text"
            name="userName"
            placeholder="User Name"
            value={loginData.userName}
            onChange={handleChange}
            className="login-input"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            className="login-input"
          />

          <button
            className="login-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Rederecting..." : "Login"}
          </button>
        </div>

        <p className="signup-text">
          Don't have an account?
          <Link to="/signin">
            <button className="create-account-link">Create new Account</button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
