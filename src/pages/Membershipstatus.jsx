import React, { useEffect, useState } from "react";
import "./Membershipstatus.css";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { idcardService } from "../Services/idcardService";

export const Membershipstatus = () => {
  const [idCard, setIdCard] = useState(null);
  const userId = sessionStorage.getItem("userId");
  useEffect(() => {
    const fetchIdCard = async () => {
      if (!userId) return;
      const data = await idcardService.getIdByUserId(userId);
      setIdCard(data);
    };
    fetchIdCard();
  }, [userId]);
  if (!idCard) return <div>Loading Id Card....</div>;

  return (
    <div className="status-container">
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
      <div className="status-content">
        <h1 className="status-title">Application Status</h1>

        <div className="table-wrapper">
          <table className="status-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Card Id</th>
                <th>Created Date</th>
                <th>Expiry Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{idCard.userId}</td>
                <td>{idCard.cardNumber}</td>
                <td>{idCard.issueDate}</td>
                <td>{idCard.expiryDate}</td>
                <td>
                  <span
                    className={`status-badge status-${idCard.status.toLowerCase()}`}
                  >
                    {idCard.status}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="renew-section">
          <Link to="/renewal">
            <button className="renew-btn">Renew Membership</button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        © 2025 SportX, Inc. All Rights Reserved.
      </footer>
    </div>
  );
};
export default Membershipstatus;
