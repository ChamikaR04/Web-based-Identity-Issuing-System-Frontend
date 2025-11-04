// src/Components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const userId = sessionStorage.getItem("userId"); // or token if you use JWT
  if (!userId) {
    // Not logged in
    return <Navigate to="/login" replace />; // redirect to member login
  }
  return children;
};

export default PrivateRoute;
