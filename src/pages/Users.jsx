import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../Users.css";
import UserCharts from "../components/UserCharts";
import PerformanceChart from "../components/Performancechart";
import {
  FaEnvelope,
  FaBan,
  FaSnowflake,
  FaTrash,
  FaIdCard,
  FaPhone,
  FaEdit,
  FaPlus,
} from "react-icons/fa";
import { MoreHorizontal } from "lucide-react";

const STORAGE_KEY = "users_data";

const defaultUsers = [
  {
    id: 1,
    name: "Maria Khan",
    email: "maria.khan@example.com",
    phone: "+923331111111",
    type: "Super Admin",
    wallet: "fkdjf9393kdkd9393",
    market: "Forex",
    broker: "Binance",
    joined: "29 June 2023",
    status: "Active",
    investors: 15,
    profit: "$1.8M",
    equity: "40%",
    exp: "3-4 years",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Ali Raza",
    email: "ali.raza@example.com",
    phone: "+923341111111",
    type: "Admin",
    wallet: "xyz789abc123",
    market: "Stocks",
    broker: "E*TRADE",
    joined: "02 July 2023",
    status: "Deactivate",
    investors: 8,
    profit: "$900K",
    equity: "25%",
    exp: "1-2 years",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+923351111111",
    type: "Manager",
    wallet: "jhs789kdkd9393",
    market: "Crypto",
    broker: "Coinbase",
    joined: "10 July 2023",
    status: "Active",
    investors: 20,
    profit: "$3.2M",
    equity: "50%",
    exp: "5+ years",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    id: 4,
    name: "Emma Brown",
    email: "emma.brown@example.com",
    phone: "+923361111111",
    type: "Editor",
    wallet: "emmb987xyz456",
    market: "Forex",
    broker: "OANDA",
    joined: "15 July 2023",
    status: "Active",
    investors: 10,
    profit: "$1.5M",
    equity: "30%",
    exp: "2-3 years",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 5,
    name: "David Johnson",
    email: "david.j@example.com",
    phone: "+923371111111",
    type: "Admin",
    wallet: "dj789kdkd1234",
    market: "Stocks",
    broker: "TD Ameritrade",
    joined: "20 July 2023",
    status: "Deactivate",
    investors: 5,
    profit: "$600K",
    equity: "20%",
    exp: "1 year",
    avatar: "https://randomuser.me/api/portraits/men/28.jpg",
  },
  {
    id: 6,
    name: "Sophia Martinez",
    email: "sophia.martinez@example.com",
    phone: "+923381111111",
    type: "Support",
    wallet: "sm987xyz789",
    market: "Crypto",
    broker: "Kraken",
    joined: "22 July 2023",
    status: "Active",
    investors: 7,
    profit: "$800K",
    equity: "28%",
    exp: "1-2 years",
    avatar: "https://randomuser.me/api/portraits/women/50.jpg",
  },
  {
    id: 7,
    name: "William Lee",
    email: "william.lee@example.com",
    phone: "+923391111111",
    type: "Admin",
    wallet: "wl456kdkd789",
    market: "Forex",
    broker: "IG",
    joined: "25 July 2023",
    status: "Delete",
    investors: 3,
    profit: "$400K",
    equity: "15%",
    exp: "6 months",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
  },
  {
    id: 8,
    name: "Olivia Davis",
    email: "olivia.davis@example.com",
    phone: "+923401111111",
    type: "Manager",
    wallet: "od789xyz123",
    market: "Stocks",
    broker: "Schwab",
    joined: "28 July 2023",
    status: "Active",
    investors: 18,
    profit: "$2.7M",
    equity: "45%",
    exp: "4-5 years",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    id: 9,
    name: "James Wilson",
    email: "james.wilson@example.com",
    phone: "+923411111111",
    type: "Super Admin",
    wallet: "jw123kdkd456",
    market: "Crypto",
    broker: "Binance",
    joined: "01 August 2023",
    status: "Active",
    investors: 25,
    profit: "$4.1M",
    equity: "60%",
    exp: "6+ years",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: 10,
    name: "Ava Thompson",
    email: "ava.thompson@example.com",
    phone: "+923421111111",
    type: "Editor",
    wallet: "at456xyz789",
    market: "Forex",
    broker: "FXCM",
    joined: "05 August 2023",
    status: "Deactivate",
    investors: 6,
    profit: "$700K",
    equity: "22%",
    exp: "1 year",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
];

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [selectedUser, setSelectedUser] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  const itemsPerPage = 10;

  // Performance Metrics State
  const [metrics, setMetrics] = useState({
    winRate: "78%",
    profitFactor: "2.14",
    sharpeRatio: "1.67",
    roi: "+42.8%",
    maxDrawdown: "-8.2%",
    totalTrades: "127",
    avgWin: "$285.5",
    avgLoss: "$142.3",
    bestTrade: "1250.4",
    worstTrade: "890",
    riskReward: "2.3:1",
  });

  const [editingMetric, setEditingMetric] = useState(null);
  const [newMetricValue, setNewMetricValue] = useState("");

  // Load from localStorage
  useEffect(() => {
    const storedUsers = localStorage.getItem(STORAGE_KEY);
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      setUsers(defaultUsers);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUsers));
    }
    console.log("Loaded users:", users); // Debug log

    const storedMetrics = localStorage.getItem("metrics_data");
    if (storedMetrics) {
      setMetrics(JSON.parse(storedMetrics));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    }
  }, [users]);

  useEffect(() => {
    localStorage.setItem("metrics_data", JSON.stringify(metrics));
  }, [metrics]);

  // Dynamic Profile: Check if viewing a specific user
  useEffect(() => {
    const userId = params.id;
    if (userId) {
      const user = users.find((u) => u.id === parseInt(userId));
      setSelectedUser(user || null);
    } else {
      setSelectedUser(null);
    }
  }, [params.id, users]);

  // Handle Add/Edit user submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const userData = {
      id: editingUser ? editingUser.id : Date.now(),
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone") || "",
      type: form.get("type"),
      wallet: form.get("wallet"),
      market: form.get("market"),
      broker: form.get("broker"),
      joined: form.get("joined"),
      status: form.get("status"),
      investors: form.get("investors"),
      profit: form.get("profit"),
      equity: form.get("equity"),
      exp: form.get("exp"),
      avatar: form.get("avatar"),
    };

    if (editingUser) {
      setUsers(users.map((u) => (u.id === editingUser.id ? userData : u)));
    } else {
      setUsers([...users, userData]);
    }
    setShowForm(false);
    setEditingUser(null);
  };

  // Confirm delete
  const confirmDelete = () => {
    setUsers(users.filter((u) => u.id !== deleteUserId));
    setDeleteUserId(null);
    if (selectedUser && selectedUser.id === deleteUserId) {
      navigate("/users");
    }
  };

  // Metric Update
  const handleMetricUpdate = () => {
    if (!editingMetric) return;
    setMetrics({
      ...metrics,
      [editingMetric]: newMetricValue,
    });
    setEditingMetric(null);
    setNewMetricValue("");
  };

  // Toggle dropdown menu
  const toggleMenu = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  // Handle actions (View, Edit, Remove)
  const handleAction = (user, action) => {
    if (action === "view") {
      navigate(`/users/${user.id}`);
    } else if (action === "edit") {
      setEditingUser(user);
      setShowForm(true);
    } else if (action === "remove") {
      setDeleteUserId(user.id);
    }
    setMenuOpen(null);
  };

  // Filtered users for table
  const filteredUsers = users.filter(
    (user) =>
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedStatus === "" || user.status === selectedStatus) &&
      (selectedDate === "" || user.joined === selectedDate)
  );
  console.log("Filtered users:", filteredUsers); // Debug log

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);
  console.log("Current users:", currentUsers); // Debug log

  // Get status class
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

  if (selectedUser) {
    // Profile View
    return (
      <div className="app">
        <main className="main-content">
          <div className="page-header">
            <button
              className="btn outline back-btn"
              onClick={() => navigate("/users")}
            >
              ← Back to Users
            </button>
            <h2 className="page-title">Profile: {selectedUser.name}</h2>
          </div>

          <div className="user-info">
            {/* User Profile Card */}
            <div className="user-card">
              <img
                src={selectedUser.avatar}
                alt="User Avatar"
                className="avatars"
              />
              <div className="user-card-info">
                <h3>{selectedUser.name}</h3>
                <span className={`status ${selectedUser.status.toLowerCase()}`}>
                  {selectedUser.status}
                </span>
              </div>
              <div className="user-stats">
                <p>
                  <strong>{selectedUser.investors}</strong> Investors
                </p>
                <p>
                  <strong>{selectedUser.profit}</strong> Net Profit
                </p>
                <p>
                  <strong>{selectedUser.equity}</strong> Equity
                </p>
                <p>
                  <strong>{selectedUser.exp}</strong> Experience
                </p>
              </div>
              <div className="card-actions">
                <button className="btn green">
                  <FaEnvelope /> Send Email
                </button>
                <button className="btn orange">
                  <FaBan /> Deactivate
                </button>
                <button className="btn red">
                  <FaSnowflake /> Freeze
                </button>
                <button
                  className="btn red"
                  onClick={() => setDeleteUserId(selectedUser.id)}
                >
                  <FaTrash /> Delete
                </button>
                <button
                  className="btn outline"
                  onClick={() => {
                    setEditingUser(selectedUser);
                    setShowForm(true);
                  }}
                >
                  <FaEdit /> Edit
                </button>
              </div>
            </div>

            {/* User Details */}
            <div className="user-details">
              <div className="detail-row">
                <p>
                  <span className="label">Email:</span>
                  <span className="value">{selectedUser.email}</span>
                </p>
                <p>
                  <span className="label">User Type:</span>
                  <span className="value">{selectedUser.type}</span>
                </p>
              </div>
              <div className="detail-row">
                <p>
                  <span className="label">Wallet ID:</span>
                  <span className="value">
                    <a href="#">{selectedUser.wallet}</a>
                  </span>
                </p>
                <p>
                  <span className="label">Market:</span>
                  <span className="value">{selectedUser.market}</span>
                </p>
              </div>
              <div className="detail-row">
                <p>
                  <span className="label">Broker:</span>
                  <span className="value">{selectedUser.broker}</span>
                </p>
                <p>
                  <span className="label">Joined:</span>
                  <span className="value">{selectedUser.joined}</span>
                </p>
              </div>
              <div className="actions">
                <button className="btn outline">
                  <FaIdCard /> View KYC
                </button>
                <button className="btn outline">
                  <FaPhone /> Contact Info
                </button>
              </div>
            </div>
          </div>

          {/* Trading Strategy */}
          <div className="container">
            <h3>Trading Strategy</h3>
            <div className="tabs-container">
              <div className="tabs">
                <button
                  className={`tab ${activeTab === "about" ? "active" : ""}`}
                  onClick={() => setActiveTab("about")}
                >
                  About Trader
                </button>
                <button
                  className={`tab ${activeTab === "investor" ? "active" : ""}`}
                  onClick={() => setActiveTab("investor")}
                >
                  Investor
                </button>
                <button
                  className={`tab ${activeTab === "transactions" ? "active" : ""}`}
                  onClick={() => setActiveTab("transactions")}
                >
                  Transactions
                </button>
              </div>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>

            {activeTab === "about" && (
              <div className="tab-content">
                <p>
                  Momentum based Swing trader focusing on major currency pairs
                  during high volatility periods. Strategy involves capturing
                  short- to medium-term gains during high volatility periods.
                </p>
              </div>
            )}

            {activeTab === "investor" && (
              <div className="tab-content">
                <h4>Top Investors</h4>
                <ul>
                  <li>Ali Raza — $50,000</li>
                  <li>Sara Ahmed — $32,500</li>
                  <li>John Doe — $21,000</li>
                </ul>
              </div>
            )}

            {activeTab === "transactions" && (
              <div className="tab-content">
                <h4>Recent Transactions</h4>
                <table className="transactions-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>15 Sep 2025</td>
                      <td>Deposit</td>
                      <td>$5,000</td>
                      <td>Completed</td>
                    </tr>
                    <tr>
                      <td>12 Sep 2025</td>
                      <td>Withdrawal</td>
                      <td>$2,300</td>
                      <td>Pending</td>
                    </tr>
                    <tr>
                      <td>10 Sep 2025</td>
                      <td>Profit Share</td>
                      <td>$1,250</td>
                      <td>Completed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Performance Metrics */}
            <h3>Performance Metrics</h3>
            <div className="metrics-grid">
              {Object.entries(metrics).map(([key, value]) => (
                <p
                  key={key}
                  onClick={() => {
                    setEditingMetric(key);
                    setNewMetricValue(value);
                  }}
                >
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}{" "}
                  <span
                    className={
                      value.includes("+") || value.includes("green")
                        ? "green"
                        : value.includes("-")
                        ? "red"
                        : ""
                    }
                  >
                    {value}
                  </span>
                </p>
              ))}
            </div>

            {/* Charts */}
            <div className="charts-section" style={{ marginTop: "70px" }}>
              <div className="chart-box">
                <h3>Equity Graph</h3>
                <UserCharts type="equity" />
              </div>
              <div className="chart-box">
                <h3>Monthly Performance Trends</h3>
                <UserCharts type="performance" />
              </div>
            </div>
          </div>
        </main>

        {/* Modals */}
        {showForm && (
          <div className="modal">
            <div className="modal-content small">
              <h3>{editingUser ? "Edit User" : "Add User"}</h3>
              <form onSubmit={handleSubmit} className="form">
                <input
                  name="name"
                  placeholder="Name"
                  defaultValue={editingUser?.name}
                  required
                />
                <input
                  name="email"
                  placeholder="Email"
                  defaultValue={editingUser?.email}
                  required
                />
                <input
                  name="phone"
                  placeholder="Phone"
                  defaultValue={editingUser?.phone}
                  required
                />
                <input
                  name="type"
                  placeholder="User Type"
                  defaultValue={editingUser?.type}
                  required
                />
                <input
                  name="wallet"
                  placeholder="Wallet ID"
                  defaultValue={editingUser?.wallet}
                  required
                />
                <input
                  name="market"
                  placeholder="Market"
                  defaultValue={editingUser?.market}
                  required
                />
                <input
                  name="broker"
                  placeholder="Broker"
                  defaultValue={editingUser?.broker}
                  required
                />
                <input
                  name="joined"
                  placeholder="Joined Date"
                  defaultValue={editingUser?.joined}
                  required
                />
                <input
                  name="status"
                  placeholder="Status"
                  defaultValue={editingUser?.status}
                  required
                />
                <input
                  name="investors"
                  placeholder="Investors"
                  defaultValue={editingUser?.investors}
                  required
                />
                <input
                  name="profit"
                  placeholder="Net Profit"
                  defaultValue={editingUser?.profit}
                  required
                />
                <input
                  name="equity"
                  placeholder="Equity"
                  defaultValue={editingUser?.equity}
                  required
                />
                <input
                  name="exp"
                  placeholder="Experience"
                  defaultValue={editingUser?.exp}
                  required
                />
                <input
                  name="avatar"
                  placeholder="Avatar URL"
                  defaultValue={editingUser?.avatar}
                  required
                />
                <div className="form-actions">
                  <button type="submit" className="btn green">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn red"
                    onClick={() => {
                      setShowForm(false);
                      setEditingUser(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {deleteUserId && (
          <div className="modal">
            <div className="confirm-box">
              <p>Are you sure you want to delete this user?</p>
              <div className="confirm-actions">
                <button className="btn red" onClick={confirmDelete}>
                  Delete
                </button>
                <button
                  className="btn outline"
                  onClick={() => setDeleteUserId(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {editingMetric && (
          <div className="modal">
            <div className="modal-content small">
              <h4>Edit {editingMetric}</h4>
              <input
                type="text"
                value={newMetricValue}
                onChange={(e) => setNewMetricValue(e.target.value)}
              />
              <div className="form-actions">
                <button className="btn green" onClick={handleMetricUpdate}>
                  Save
                </button>
                <button
                  className="btn red"
                  onClick={() => setEditingMetric(null)}
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

  // Table View
  return (
    <div className="app">
      <main className="main-content">
        <div className="page-header">
          <h2 className="page-title">
            Users <span className="sub-title">› User Details</span>
          </h2>
          <button
            className="btn green add-user-btn"
            onClick={() => setShowForm(true)}
          >
            <FaPlus /> Add User
          </button>
        </div>

        <div className="filters-container">
          <div className="reports-search-container">
            <div className="reports-search-input-wrapper">
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
            </div>
          </div>
        </div>

        <div className="table-container">
          <table className="team-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Email</th>
                <th>Type</th>
                <th>Wallet</th>
                <th>Market</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td data-label="Member">
                    <div className="user-cell">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="user-avatar"
                      />
                      <span className="user-name">{user.name}</span>
                    </div>
                  </td>
                  <td data-label="Email">{user.email}</td>
                  <td data-label="Type">{user.type}</td>
                  <td data-label="Wallet">{user.wallet}</td>
                  <td data-label="Market">{user.market}</td>
                  <td data-label="Joined">{user.joined}</td>
                  <td data-label="Status">
                    <span className={`status-badge ${getStatusClass(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td data-label="Actions" className="team-actions">
                    <div className="team-action-menu">
                      <button
                        className="team-action-btn"
                        onClick={() => toggleMenu(user.id)}
                      >
                        <MoreHorizontal size={16} /> {/* Placeholder for dropdown icon */}
                      </button>
                      {menuOpen === user.id && (
                        <div className="team-dropdown-menu">
                          <button onClick={() => handleAction(user, "view")}>
                            View Profile
                          </button>
                          <button onClick={() => handleAction(user, "edit")}>
                            Edit
                          </button>
                          <button onClick={() => handleAction(user, "remove")}>
                            Remove
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

        <div className="table-footer">
          <div className="showing-info">
            Showing: {Math.min(filteredUsers.length, itemsPerPage)} of {filteredUsers.length} Entries
          </div>
          <div className="pagination">
            <button
              className="pagination-button"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <div className="pagination-numbers">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={`pagination-number ${i + 1 === currentPage ? "active" : ""}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              className="pagination-button"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Users;
