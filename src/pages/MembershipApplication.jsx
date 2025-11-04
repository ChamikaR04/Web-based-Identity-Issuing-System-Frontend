import "./MembershipApplication.css";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { idcardService } from "../Services/idcardService";

const MembershipApplication = ({ onSubmitSuccess }) => {
  const [userId, setUserId] = useState("");
  const [image, setImage] = useState(null);
  const id = sessionStorage.getItem("userId");

  const handleIdSubmit = async (e) => {
    e.preventDefault();
    if (!userId || !image) {
      alert("Please provide both user ID and Payement Reciept");
      return;
    } else if (id != userId) {
      alert("Incorrect userId : ");
      return;
    }
    await idcardService.generateId(userId, image);
    onSubmitSuccess();
  };

  return (
    <div className="application-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">
          SportX <i class="fa-solid fa-basketball" />
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
      <div className="application-content">
        <div className="application-card">
          <h1 className="application-title">Membership Application</h1>

          <div className="application-info">
            <p className="info-text">
              Only the registered members can apply for the
            </p>
            <p className="info-text">Membership Id card.</p>
            <p className="info-text">
              Pay the membership fee to the bank details given
            </p>
            <p className="info-text">
              and attach a copy of a payment reciept to the
            </p>
            <p className="info-text">application.</p>
          </div>

          <div className="application-form">
            <input
              type="text"
              name="userId"
              placeholder="User Id"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="form-input-app"
            />

            <div className="file-input-wrapper">
              <input
                type="file"
                id="paymentFile"
                name="paymentFile"
                className="file-input-hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setImage(e.target.files[0])}
              />

              <label htmlFor="paymentFile" className="file-input-label">
                {image ? image.name : "Input your file here"}
              </label>
            </div>

            <button onClick={handleIdSubmit} className="apply-btn-app">
              Apply
            </button>
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
export default MembershipApplication;
