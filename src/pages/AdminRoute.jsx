// src/Components/AdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const adminId = sessionStorage.getItem("adminId"); // set this on admin login
  if (!adminId) {
    return <Navigate to="/adminlogin" replace />; // redirect to admin login
  }
  return children;
};

export default AdminRoute;
