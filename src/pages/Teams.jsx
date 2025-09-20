import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Calendar,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import "../team.css";

const defaultTeamData = [
  {
    id: 1,
    name: "Maria Khan",
    email: "maria.khan@example.com",
    phone: "+923331111111",
    role: "Super Admin",
    dateJoined: "2023-06-29",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Ali Raza",
    email: "ali.raza@example.com",
    phone: "+923341111111",
    role: "Admin",
    dateJoined: "2023-07-02",
    status: "Deactivate",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+923351111111",
    role: "Manager",
    dateJoined: "2023-07-10",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    id: 4,
    name: "Emma Brown",
    email: "emma.brown@example.com",
    phone: "+923361111111",
    role: "Editor",
    dateJoined: "2023-07-15",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 5,
    name: "David Johnson",
    email: "david.j@example.com",
    phone: "+923371111111",
    role: "Admin",
    dateJoined: "2023-07-20",
    status: "Deactivate",
    avatar: "https://randomuser.me/api/portraits/men/28.jpg",
  },
  {
    id: 6,
    name: "Sophia Martinez",
    email: "sophia.martinez@example.com",
    phone: "+923381111111",
    role: "Support",
    dateJoined: "2023-07-22",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/women/50.jpg",
  },
  {
    id: 7,
    name: "William Lee",
    email: "william.lee@example.com",
    phone: "+923391111111",
    role: "Admin",
    dateJoined: "2023-07-25",
    status: "Delete",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
  },
  {
    id: 8,
    name: "Olivia Davis",
    email: "olivia.davis@example.com",
    phone: "+923401111111",
    role: "Manager",
    dateJoined: "2023-07-28",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    id: 9,
    name: "James Wilson",
    email: "james.wilson@example.com",
    phone: "+923411111111",
    role: "Super Admin",
    dateJoined: "2023-08-01",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: 10,
    name: "Ava Thompson",
    email: "ava.thompson@example.com",
    phone: "+923421111111",
    role: "Editor",
    dateJoined: "2023-08-05",
    status: "Deactivate",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
];

function Team() {
  const [teamData, setTeamData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(null);
  const [editMember, setEditMember] = useState(null);
  const [viewMember, setViewMember] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  const itemsPerPage = 10;

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("teamData");
    if (stored) {
      setTeamData(JSON.parse(stored));
    } else {
      setTeamData(defaultTeamData);
      localStorage.setItem("teamData", JSON.stringify(defaultTeamData));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (teamData.length > 0) {
      localStorage.setItem("teamData", JSON.stringify(teamData));
    }
  }, [teamData]);

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleAction = (member, action) => {
    navigate("/team/detail", { state: { member, action } });
  };

  const filteredTeam = teamData.filter(
    (member) =>
      (member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedStatus === "" || member.status === selectedStatus) &&
      (selectedDate === "" || member.dateJoined === selectedDate)
  );

  const totalPages = Math.ceil(filteredTeam.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTeam = filteredTeam.slice(startIndex, endIndex);

  const getStatusClass = (status) => {
    switch (status) {
      case "Active":
        return "status-active";
      case "Deactivate":
        return "status-pending";
      case "Delete":
        return "status-withdraw";
      default:
        return "status-active";
    }
  };

  const toggleMenu = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  const handleRemove = (id) => {
    setTeamData(teamData.filter((m) => m.id !== id));
    setMenuOpen(null);
  };

  const handleEditSave = () => {
    setTeamData(
      teamData.map((m) => (m.id === editMember.id ? editMember : m))
    );
    setEditMember(null);
  };

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <div className="team-page">
          <div className="page-header">
            <h2 className="page-titlees">
              Dashboard <span className="sub-titlees">› Teams</span>
            </h2>
          </div>

          {/* Filters */}
          <div className="filters-container">
            <div className="reports-search-container">
              <div className="reports-search-input-wrapper">
                <Search className="search-icon" size={20} />
                <input
                  type="text"
                  placeholder="Search by Name or Email"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="reports-search-input"
                />
              </div>
            </div>

            <div className="filter-controls">
              <div className="reports-date-filter">
                <input
                  type="text"
                  placeholder="Select Date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="date-input"
                />
                <Calendar className="date-icon" size={16} />
              </div>

              <div className="kyc-status-filter">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="kyc-status-select"
                >
                  <option value="">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Deactivate">Deactivate</option>
                  <option value="Delete">Delete</option>
                </select>
                <ChevronDown className="kyc-select-icon" size={16} />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="table-container">
            <table className="team-table">
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Date Joined</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentTeam.map((member, index) => (
                  <tr key={member.id}>
                    <td data-label="Member">
                      <div className="user-cell">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="user-avatar"
                        />
                        <span className="user-name">{member.name}</span>
                      </div>
                    </td>
                    <td data-label="Email">{member.email}</td>
                    <td data-label="Phone">{member.phone}</td>
                    <td data-label="Role">{member.role}</td>
                    <td data-label="Date Joined">{member.dateJoined}</td>
                    <td data-label="Status">
                      <span
                        className={`status-badge ${getStatusClass(
                          member.status
                        )}`}
                      >
                        {member.status}
                      </span>
                    </td>
                    <td data-label="Actions" className="team-actions">
                      <div className="team-action-menu">
                        <button
                          className="team-action-btn"
                          onClick={() => toggleMenu(member.id)}
                        >
                          <MoreHorizontal size={16} />
                        </button>
                        {menuOpen === member.id && (
                          <div
                            className={`team-dropdown-menu ${
                              index >= currentTeam.length - 2 ? "drop-up" : ""
                            }`}
                          >
                            <button onClick={() => setViewMember(member)}>
                              <Eye size={14} /> View Profile
                            </button>
                            <button onClick={() => setEditMember(member)}>
                              <Edit size={14} /> Edit
                            </button>
                            <button onClick={() => setConfirmDelete(member)}>
                              <Trash2 size={14} /> Remove
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="table-footer">
            <div className="showing-info">
              Showing: {Math.min(filteredTeam.length, itemsPerPage)} Entries
            </div>
            <div className="pagination">
              <button
                className="pagination-button"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} />
              </button>

              <div className="pagination-numbers">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    className={`pagination-number ${
                      i + 1 === currentPage ? "active" : ""
                    }`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                className="pagination-button"
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editMember && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Edit Member</h3>
            <input
              className="edit-input"
              value={editMember.name}
              onChange={(e) =>
                setEditMember({ ...editMember, name: e.target.value })
              }
            />
            <input
              className="edit-input"
              value={editMember.email}
              onChange={(e) =>
                setEditMember({ ...editMember, email: e.target.value })
              }
            />
            <input
              className="edit-input"
              value={editMember.phone}
              onChange={(e) =>
                setEditMember({ ...editMember, phone: e.target.value })
              }
            />
            <input
              className="edit-input"
              value={editMember.role}
              onChange={(e) =>
                setEditMember({ ...editMember, role: e.target.value })
              }
            />
            <select
              className="edit-input"
              value={editMember.status}
              onChange={(e) =>
                setEditMember({ ...editMember, status: e.target.value })
              }
            >
              <option value="Active">Active</option>
              <option value="Deactivate">Deactivate</option>
              <option value="Delete">Delete</option>
            </select>
            <button className="close-btn" onClick={handleEditSave}>
              Save
            </button>
            <button
              className="close-btn"
              style={{ background: "#ef4444", marginLeft: "8px" }}
              onClick={() => setEditMember(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* View Profile Modal */}
      {viewMember && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>{viewMember.name}</h3>
            <img
              src={viewMember.avatar}
              alt={viewMember.name}
              style={{ width: "80px", borderRadius: "50%", margin: "10px auto" }}
            />
            <p><b>Email:</b> {viewMember.email}</p>
            <p><b>Phone:</b> {viewMember.phone}</p>
            <p><b>Role:</b> {viewMember.role}</p>
            <p><b>Status:</b> {viewMember.status}</p>
            <p><b>Date Joined:</b> {viewMember.dateJoined}</p>
            <button
              className="team-close-btn"
              style={{ marginTop: "10px" }}
              onClick={() => setViewMember(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {confirmDelete && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>
              Are you sure you want to remove{" "}
              <span style={{ color: "red" }}>{confirmDelete.name}</span>?
            </h3>
            <div style={{ marginTop: "12px" }}>
              <button
                className="close-btn"
                style={{ background: "#ef4444" }}
                onClick={() => {
                  handleRemove(confirmDelete.id);
                  setConfirmDelete(null);
                }}
              >
                Yes, Remove
              </button>
              <button
                className="close-btn"
                style={{ marginLeft: "8px" }}
                onClick={() => setConfirmDelete(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Team;