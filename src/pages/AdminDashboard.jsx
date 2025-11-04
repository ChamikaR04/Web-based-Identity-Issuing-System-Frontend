import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import { adminService } from "../Services/adminService";
import { idcardService } from "../Services/idcardService";
import { userService } from "../Services/userService";
import { renewalService } from "../Services/renewalService";
import { notificationService } from "../Services/notificationService";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("staff");
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [staffFormData, setStaffFormData] = useState({
    username: "",
    email: "",
    role: "",
    password: "",
  });
  const [showEditStaffModal, setShowEditStaffModal] = useState(false);
  const [editStaffData, setEditStaffData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [staffMembers, setStaffMembers] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [renewalRequests, setRenewalRequests] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // Fetch initial data for staff members, pending requests, renewal requests, and members
    const fetchData = async () => {
      const fetchedStaff = await adminService.getAllAdmins();
      setStaffMembers(fetchedStaff);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const fetchedPendingRequests = await idcardService.requestList();
        console.log("Fetched pending requests:", fetchedPendingRequests);
        setPendingRequests(fetchedPendingRequests);
      } catch (error) {
        console.error("Error fetching pending requests:", error);
      }
    };
    fetchRequests();
  }, []);

  useEffect(() => {
    const fetchAllMembers = async () => {
      try {
        const fetchedMembers = await userService.getAllMembers();
        console.log("Fetched members:", fetchedMembers);
        setMembers(fetchedMembers);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };
    fetchAllMembers();
  }, []);

  useEffect(() => {
    const fetchRenewalRequests = async () => {
      try {
        const fetchedRenewalRequests =
          await renewalService.getAllRenewalRequests();
        console.log("Fetched renewal requests:", fetchedRenewalRequests);
        setRenewalRequests(fetchedRenewalRequests);
      } catch (error) {
        console.error("Error fetching renewal requests:", error);
      }
    };
    fetchRenewalRequests();
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/adminlogin";
  };
  const handleEditStaffInputChange = (e) => {
    const { name, value } = e.target;
    setEditStaffData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStaffInputChange = (e) => {
    const { name, value } = e.target;
    setStaffFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddStaff = async (e) => {
    e.preventDefault();
    try {
      const response = await adminService.addAdmin(staffFormData);
      console.log("Add Staff Response:", response);

      const newStaff = {
        id: staffMembers.length + 1,
        ...staffFormData,
      };
      setStaffMembers([...staffMembers, newStaff]);

      setStaffFormData({
        username: "",
        email: "",
        role: "",
        password: "",
      });
      setShowAddStaffModal(false);
      alert("Staff member added successfully");
    } catch (error) {
      console.error("Error adding staff member:", error);
      alert("Failed to add staff member");
    }
  };

  const handleEditStaff = (staffId) => {
    const staffToEdit = staffMembers.find((staff) => staff.id === staffId);
    if (staffToEdit) {
      setEditStaffData({
        id: staffToEdit.id,
        name: staffToEdit.name,
        email: staffToEdit.email,
        phone: staffToEdit.phone,
        role: staffToEdit.role,
      });
      setShowEditStaffModal(true);
    }
  };
  const handleUpdateStaff = async (e) => {
    e.preventDefault();
    try {
      // Add your API call here
      await adminService.updateAdmin(editStaffData.id, editStaffData);

      // Update local state
      setStaffMembers(
        staffMembers.map((staff) =>
          staff.id === editStaffData.id ? editStaffData : staff
        )
      );

      setShowEditStaffModal(false);
      alert("Staff member updated successfully!");
    } catch (error) {
      console.error("Error updating staff:", error);
      alert("Failed to update staff member");
    }
  };
  const closeEditModal = () => {
    setShowEditStaffModal(false);
    setEditStaffData({
      id: "",
      name: "",
      email: "",
      phone: "",
      role: "",
    });
  };

  const handleDeleteStaff = async (staffId) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      try {
        await adminService.deleteAdmin(staffId);
        setStaffMembers(staffMembers.filter((staff) => staff.id !== staffId));
        alert("Staff member deleted successfully");
      } catch (error) {
        console.error("Error deleting staff member:", error);
        alert("Failed to delete staff member");
      }
    }
  };

  const handleAcceptRequest = async (userId) => {
    try {
      await idcardService.acceptRequest(userId);
      alert("Request accepted successfully");
      try {
        await notificationService.sendNotification(
          userId,
          "Your ID Card Request Accepted successfully"
        );
        console.log("Notification sent successfully");
        alert("Notification sent successfully");
      } catch (error) {
        console.error("Error sending notification:", error);
        alert("Failed to send notification");
      }
    } catch (error) {
      console.error("Error accepting request:", error);
      alert("Failed to accept request");
    }
  };
  const handleRejectRequest = async (userId) => {
    try {
      await idcardService.rejectRequest(userId);
      alert("Request rejected successfully");
      try {
        await notificationService.sendNotification(
          userId,
          "Your ID Card Request has been Rejected"
        );
        console.log("Notification sent successfully");
        alert("Notification sent successfully");
      } catch (error) {
        console.error("Error sending notification:", error);
      }
    } catch (error) {
      console.error("Error rejecting request:", error);
      alert("Failed to reject request");
    }
  };
  const handleRenewalAccept = async (userId) => {
    try {
      await renewalService.acceptRenewal(userId);
      console.log("Renewal accepted:", userId);
      alert("Renewal accepted successfully");
      try {
        await notificationService.sendNotification(
          userId,
          "Your Membership Renewal Request Accepted successfully"
        );
        console.log("Notification sent successfully");
        alert("Notification sent successfully");
      } catch (error) {
        console.error("Error sending notification:", error);
        alert("Failed to send notification");
      }
    } catch (error) {
      console.error("Error accepting renewal:", error);
      alert("Failed to accept renewal");
    }
  };
  const handleRenewalReject = async (userId) => {
    try {
      await renewalService.rejectRenewal(userId);
      console.log("Renewal rejected:", userId);
      alert("Renewal rejected successfully");
      try {
        await notificationService.sendNotification(
          userId,
          "Your Membership Renewal Request has been Rejected"
        );
        console.log("Notification sent successfully");
        alert("Notification sent successfully");
      } catch (error) {
        console.error("Error sending notification:", error);
        alert("Failed to send notification");
      }
    } catch (error) {
      console.error("Error rejecting renewal:", error);
      alert("Failed to reject renewal");
    }
  };

  const handleSuspendMember = async (memberId) => {
    try {
      await userService.deleteMember(memberId);
      console.log("Suspend member with ID:", memberId);
      alert("Member suspended successfully");
      try {
        await userService.deleteAuth(memberId);
        console.log("Auth deleted for member ID:", memberId);
        alert("Member authentication deleted successfully");
      } catch (error) {
        console.error("Error deleting member auth:", error);
        alert("Failed to delete member authentication");
      }
    } catch (error) {
      console.error("Error suspending member:", error);
      alert("Failed to suspend member");
    }
  };

  const handleViewReceipt = (receipt) => {
    console.log("Viewing receipt:", receipt);
    setSelectedReceipt(receipt);
  };

  const closeReceiptModal = () => {
    setSelectedReceipt(null);
  };
  //searcg query
  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.phone.includes(searchQuery)
  );

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-nav">
        <div className="admin-nav-logo">
          SportX Admin
          <i className="fa-solid fa-shield-halved"></i>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <i className="fa-solid fa-right-from-bracket"></i>
          Logout
        </button>
      </header>
      {/* Main Content */}
      <div className="dashboard-content">
        {/* Sidebar */}
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <button
              className={`sidebar-btn ${activeTab === "staff" ? "active" : ""}`}
              onClick={() => setActiveTab("staff")}
            >
              <i className="fa-solid fa-users"></i>
              Staff Management
            </button>
            <button
              className={`sidebar-btn ${
                activeTab === "requests" ? "active" : ""
              }`}
              onClick={() => setActiveTab("requests")}
            >
              <i className="fa-solid fa-clock"></i>
              Pending Requests
              <span className="badge">{pendingRequests.length}</span>
            </button>
            <button
              className={`sidebar-btn ${
                activeTab === "renewals" ? "active" : ""
              }`}
              onClick={() => setActiveTab("renewals")}
            >
              <i className="fa-solid fa-rotate"></i>
              Renewal Requests
              <span className="badge">{renewalRequests.length}</span>
            </button>
            <button
              className={`sidebar-btn ${
                activeTab === "members" ? "active" : ""
              }`}
              onClick={() => setActiveTab("members")}
            >
              <i className="fa-solid fa-user-group"></i>
              All Members
            </button>
          </nav>
        </aside>

        {/* Main Panel */}
        <main className="main-panel">
          {/* Staff Management Tab */}
          {activeTab === "staff" && (
            <div className="tab-content">
              <div className="tab-header">
                <h2>Staff Management</h2>
                <button
                  className="add-btn"
                  onClick={() => setShowAddStaffModal(true)}
                >
                  <i className="fa-solid fa-plus"></i>
                  Add Staff Member
                </button>
              </div>

              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffMembers.map((staff) => (
                      <tr key={staff.id}>
                        <td>{staff.id}</td>
                        <td>{staff.username}</td>
                        <td>{staff.email}</td>
                        <td>
                          <span className="role-badge">{staff.role}</span>
                        </td>
                        <td>
                          <button
                            className="action-btn edit-btn"
                            onClick={() => handleEditStaff(staff.id)}
                          >
                            <i className="fa-solid fa-edit"></i>
                          </button>
                          <button
                            onClick={() => handleDeleteStaff(staff.id)}
                            className="action-btn delete-btn"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Pending Requests Tab */}
          {activeTab === "requests" && (
            <div className="tab-content">
              <div className="tab-header">
                <h2>Pending Membership Requests</h2>
              </div>

              <div className="cards-container">
                {pendingRequests.map((request) => (
                  <div key={request.userId} className="request-card">
                    <div className="card-icon">
                      <i className="fa-solid fa-user-clock"></i>
                    </div>
                    <div className="card-content">
                      <h3>{request.userId}</h3>
                      <div className="card-detail">
                        <i className="fa-solid fa-envelope"></i>
                        {request.cardNumber}
                      </div>
                      <div className="card-detail">
                        <i className="fa-solid fa-calendar"></i>
                        {request.expiryDate}
                      </div>
                      <div className="card-detail">
                        <i className="fa-solid fa-calendar"></i>
                        {request.issueDate}
                      </div>
                    </div>
                    <div className="card-actions">
                      <button
                        className="view-receipt-btn"
                        onClick={() => handleViewReceipt(request.payment_slip)}
                      >
                        <i className="fa-solid fa-receipt"></i>
                        View Receipt
                      </button>
                      <button
                        className="accept-btn"
                        onClick={() => handleAcceptRequest(request.userId)}
                      >
                        <i className="fa-solid fa-check"></i>
                        Accept
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() => handleRejectRequest(request.userId)}
                      >
                        <i className="fa-solid fa-times"></i>
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Renewal Requests Tab */}
          {activeTab === "renewals" && (
            <div className="tab-content">
              <div className="tab-header">
                <h2>Membership Renewal Requests</h2>
              </div>

              <div className="cards-container">
                {renewalRequests.map((request) => (
                  <div key={request.id} className="request-card renewal-card">
                    <div className="card-icon renewal-icon">
                      <i className="fa-solid fa-rotate"></i>
                    </div>
                    <div className="card-content">
                      <h3>{request.userId}</h3>
                      <div className="card-detail">
                        <i className="fa-solid fa-envelope"></i>
                        {request.cardNumber}
                      </div>

                      <div className="card-detail">
                        <i className="fa-solid fa-calendar"></i>
                        prev.Expiry Date: {request.previousExpiry}
                      </div>
                      <div className="card-detail expiry-detail">
                        <i className="fa-solid fa-hourglass-end"></i>
                        Renewed To: {request.renewalDate}
                      </div>
                    </div>
                    <div className="card-actions">
                      <button
                        className="view-receipt-btn"
                        onClick={() => handleViewReceipt(request.renewal_slip)}
                      >
                        <i className="fa-solid fa-receipt"></i>
                        View Receipt
                      </button>
                      <button
                        className="accept-btn"
                        onClick={() => handleRenewalAccept(request.userId)}
                      >
                        <i className="fa-solid fa-check"></i>
                        Accept
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() => handleRenewalReject(request.userId)}
                      >
                        <i className="fa-solid fa-times"></i>
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Members Tab */}
          {activeTab === "members" && (
            <div className="tab-content">
              <div className="tab-header">
                <h2>All Members</h2>
                <div className="search-box">
                  <i className="fa-solid fa-search"></i>
                  <input type="text" placeholder="Search members..." />
                </div>
              </div>

              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Date of Birth</th>

                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((member) => (
                      <tr key={member.id}>
                        <td>{member.id}</td>
                        <td>{member.username}</td>
                        <td>{member.email}</td>
                        <td>{member.phone}</td>
                        <td>{member.dateOfBirth}</td>
                        <td>
                          <button
                            className="action-btn suspend-btn"
                            onClick={() => handleSuspendMember(member.id)}
                          >
                            <i className="fa-solid fa-ban"></i>
                            Suspend
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
      {/* Add Staff Modal */}
      {showAddStaffModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Add New Staff Member</h3>
              <button
                className="close-btn"
                onClick={() => setShowAddStaffModal(false)}
              >
                <i className="fa-solid fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={staffFormData.username}
                  onChange={handleStaffInputChange}
                  placeholder="Enter staff name"
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={staffFormData.email}
                  onChange={handleStaffInputChange}
                  placeholder="Enter email"
                />
              </div>

              <div className="form-group">
                <label>Role</label>
                <select
                  name="role"
                  value={staffFormData.role}
                  onChange={handleStaffInputChange}
                >
                  <option value="">Select Role</option>
                  <option value="trainer">Trainer</option>
                  <option value="receptionist">Receptionist</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="manager">Manager</option>
                </select>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={staffFormData.password}
                  onChange={handleStaffInputChange}
                  placeholder="Enter password"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn cancel-btn"
                onClick={() => setShowAddStaffModal(false)}
              >
                Cancel
              </button>
              <button className="btn save-btn" onClick={handleAddStaff}>
                Add Staff Member
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Receipt View Modal */}
      {selectedReceipt && (
        <div className="modal-overlay" onClick={closeReceiptModal}>
          <div
            className="receipt-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Payment Receipt</h3>
              <button className="close-btn" onClick={closeReceiptModal}>
                <i className="fa-solid fa-times"></i>
              </button>
            </div>
            <div className="receipt-body">
              <div className="receipt-placeholder">
                <img
                  src={`data:image/jpeg;base64,${selectedReceipt}`}
                  alt="Payment Receipt"
                  style={{
                    width: "100%",
                    maxWidth: "500px",
                    borderRadius: "8px",
                    boxShadow: "0 0 8px rgba(0,0,0,0.2)",
                  }}
                />

                <p className="receipt-note">Image preview would display here</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/*  Add Staff Modal (before the Receipt Modal) */}
      {showEditStaffModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Update Staff Member</h3>
              <button className="close-btn" onClick={closeEditModal}>
                <i className="fa-solid fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter staff name"
                  value={editStaffData.username}
                  onChange={handleEditStaffInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={editStaffData.email}
                  onChange={handleEditStaffInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Role</label>
                <select
                  name="role"
                  value={editStaffData.role}
                  onChange={handleEditStaffInputChange}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Trainer">Trainer</option>
                  <option value="Receptionist">Receptionist</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn cancel-btn" onClick={closeEditModal}>
                Cancel
              </button>
              <button className="btn update-btn" onClick={handleUpdateStaff}>
                Update Staff Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
