import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../Users.css";
import UserCharts from "../components/UserCharts";
import {
  FaEnvelope,
  FaBan,
  FaSnowflake,
  FaTrash,
  FaIdCard,
  FaPhone,
  FaEdit,
  FaPlus,
  FaChartLine
} from "react-icons/fa";
import { MoreHorizontal, Search, Calendar, ChevronDown, Eye, Edit, Trash2, Activity, X } from "lucide-react";

const STORAGE_KEY = "users_data";

const defaultUsers = [
  {
    id: 1,
    name: "Maria Khan",
    email: "maria.khan@example.com",
    phone: "+923331111111",
    type: "Investor",
    wallet: "fkdjf9393kdkd9393",
    market: "",
    broker: "Fidelity",
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
    type: "Trader",
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
    type: "Trader",
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
    type: "Investor",
    wallet: "emmb987xyz456",
    market: "",
    broker: "Vanguard",
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
    type: "Trader",
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
    type: "Investor",
    wallet: "sm987xyz789",
    market: "",
    broker: "Schwab",
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
    type: "Trader",
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
    type: "Investor",
    wallet: "od789xyz123",
    market: "",
    broker: "Fidelity",
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
    type: "Trader",
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
    type: "Investor",
    wallet: "at456xyz789",
    market: "",
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
  const [showMetricsDialog, setShowMetricsDialog] = useState(false);
  const [showRoiDialog, setShowRoiDialog] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const itemsPerPage = 10;

  // Investor Metrics for Dialog
  const investorMetrics = {
    portfolioValue: selectedUser ? parseFloat(selectedUser.profit.replace('$', '').replace('M', '')) * 1000000 : 0,
    annualizedReturn: 12.5,
    roi: 28.3,
    diversificationScore: 75,
    totalInvestments: selectedUser ? parseInt(selectedUser.investors) : 0,
    averageInvestmentSize: 150000,
    largestInvestment: 500000,
    largestInvestmentDate: "15 Mar 2023",
    smallestInvestment: 20000,
    smallestInvestmentDate: "10 Jan 2023",
    sharpeRatio: 1.8,
    volatility: 10.2,
    maxDrawdown: -5.6,
    averageInvestmentDuration: "18 months",
    positiveReturnMonths: 20,
    negativeReturnMonths: 4,
    averageMonthlyReturn: 1.2,
    sectorAllocation: {
      technology: 40,
      realEstate: 25,
      healthcare: 20,
      others: 15,
    },
  };

  // Load from localStorage
  useEffect(() => {
    const storedUsers = localStorage.getItem(STORAGE_KEY);
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      setUsers(defaultUsers);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUsers));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    }
  }, [users]);

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
      market: form.get("type") === "Investor" ? "" : form.get("market"),
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

  // Toggle dropdown menu
  const toggleMenu = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  // Handle actions (View, Edit, Remove)
  const handleAction = (user, action) => {
    if (action === "view") {
      if (user.type === "Trader") {
        navigate(`/profile/${user.id}`);
      } else {
        navigate(`/users/${user.id}`);
      }
    } else if (action === "edit") {
      setEditingUser(user);
      setShowForm(true);
    } else if (action === "remove") {
      setDeleteUserId(user.id);
    }
    setMenuOpen(null);
  };

  // Filtered users for table
  const filteredUsers = users.filter((user) => {
    const searchMatch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = selectedStatus === "" || user.status === selectedStatus;
    const isValidDate = /^\d{4}(-\d{2}){0,2}$/;
    const dateMatch =
      selectedDate === "" ||
      (isValidDate.test(selectedDate) && user.joined.includes(selectedDate));
    return searchMatch && statusMatch && dateMatch;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

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

  if (selectedUser && selectedUser.type === "Investor") {
    // Investor Profile View
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
                  <strong>{selectedUser.investors}</strong> Investments
                </p>
                <p>
                  <strong>{selectedUser.profit}</strong> Portfolio Value
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
                <button
                  className="btn green"
                  onClick={() => setShowMetricsDialog(true)}
                  title="View Investor Metrics"
                >
                  <Activity size={18} /> Investor Metrics
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
                  <span className="value">{selectedUser.market || '-'}</span>
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
               <button
                className="btn outline"
                onClick={() => setShowRoiDialog(true)}
                title="View ROI"
              >
              <FaChartLine /> View ROI
                </button>
              </div>
            </div>
          </div>

{/* Investment Strategy */}
<div className="container">
  <h3 className="strategy-title">Investment Strategy</h3>
  <div className="tabs-container">
    <div className="tabs">
      <button
        className={`tabs ${activeTab === "investments" ? "active" : ""}`}
        onClick={() => setActiveTab("investments")}
      >
        Investments
      </button>
      <button
        className={`tabs ${activeTab === "transactions" ? "active" : ""}`}
        onClick={() => setActiveTab("transactions")}
      >
        Transactions
      </button>
    </div>
    <label className="switch">
      <input
        type="checkbox"
        onChange={(e) => handleToggle(e.target.checked)}
      />
      <span className="slider"></span>
    </label>
  </div>

  <div className={`tab-content-wrapper ${activeTab === "investments" ? "active" : ""}`}>
    {activeTab === "investments" && (
      <div className="tab-content">
        <h4 className="content-title">Top Investments</h4>
        <ul className="investment-list">
          <li className="investment-item">
            <span className="investment-name">Tech Fund — $50,000</span>
            <button className="premium-btn" onClick={() => handleViewDetails("Tech Fund")}>
              View Details
            </button>
          </li>
          <li className="investment-item">
            <span className="investment-name">Real Estate Trust — $32,500</span>
            <button className="premium-btn" onClick={() => handleViewDetails("Real Estate Trust")}>
              View Details
            </button>
          </li>
          <li className="investment-item">
            <span className="investment-name">Healthcare ETF — $21,000</span>
            <button className="premium-btn" onClick={() => handleViewDetails("Healthcare ETF")}>
              View Details
            </button>
          </li>
        </ul>
      </div>
    )}
  </div>

  <div className={`tab-content-wrapper ${activeTab === "transactions" ? "active" : ""}`}>
    {activeTab === "transactions" && (
      <div className="tab-content">
        <h4 className="content-title">Recent Transactions</h4>
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>15 Sep 2025</td>
              <td>Investment</td>
              <td>$5,000</td>
              <td className="status-actives">Completed</td>
              <td>
                <button className="premium-btn" onClick={() => handleViewDetails("Investment - 15 Sep 2025")}>
                  View Details
                </button>
              </td>
            </tr>
            <tr>
              <td>12 Sep 2025</td>
              <td>Withdrawal</td>
              <td>$2,300</td>
              <td className="status-pendings">Pending</td>
              <td>
                <button className="premium-btn" onClick={() => handleViewDetails("Withdrawal - 12 Sep 2025")}>
                  View Details
                </button>
              </td>
            </tr>
            <tr>
              <td>10 Sep 2025</td>
              <td>Dividend</td>
              <td>$1,250</td>
              <td className="status-actives">Completed</td>
              <td>
                <button className="premium-btn" onClick={() => handleViewDetails("Dividend - 10 Sep 2025")}>
                  View Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )}
  </div>
            {/* Charts */}
            <div className="charts-section" style={{ marginTop: "70px" }}>
              <div className="chart-box">
                <h3>Portfolio Growth</h3>
                <UserCharts type="equity" />
              </div>
              <div className="chart-box">
                <h3>Monthly Performance Trends</h3>
                <UserCharts type="performance" />
              </div>
            </div>
          </div>

          {/* Investor Metrics Dialog */}
{showMetricsDialog && (
  <div className="modal" onClick={() => setShowMetricsDialog(false)}>
    <div className="modal-content metrics-dialog" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <h3 className="dialog-title">Investor Metrics</h3>
        <button className="modal-close" onClick={() => setShowMetricsDialog(false)}>
          <X size={20} />
        </button>
      </div>
      <div className="advanced-metrics-grid">
        {/* Portfolio Metrics */}
        <div className="metrics-section">
          <h4>Portfolio Metrics</h4>
          <div className="metrics-row">
            <p>
              <span className="metric-label">Portfolio Value:</span>
              <span className="metric-value">${investorMetrics.portfolioValue.toLocaleString()}</span>
            </p>
            <p>
              <span className="metric-label">Annualized Return:</span>
              <span className={`metric-value ${investorMetrics.annualizedReturn >= 0}`}>
                {investorMetrics.annualizedReturn.toFixed(2)}%
              </span>
            </p>
            <p>
              <span className="metric-label">ROI:</span>
              <span className={`metric-value ${investorMetrics.roi >= 0}`}>
                {investorMetrics.roi.toFixed(2)}%
              </span>
            </p>
            <p>
              <span className="metric-label">Diversification Score:</span>
              <span className="metric-value">{investorMetrics.diversificationScore.toFixed(2)}</span>
            </p>
          </div>
        </div>

        {/* Investment Activity */}
        <div className="metrics-section">
          <h4>Investment Activity</h4>
          <div className="metrics-row">
            <p>
              <span className="metric-label">Total Investments:</span>
              <span className="metric-value">{investorMetrics.totalInvestments}</span>
            </p>
            <p>
              <span className="metric-label">Average Investment Size:</span>
              <span className="metric-value">${investorMetrics.averageInvestmentSize.toLocaleString()}</span>
            </p>
            <p>
              <span className="metric-label">Largest Investment:</span>
              <span className="metric-value">${investorMetrics.largestInvestment.toLocaleString()}</span>
            </p>
            <p>
              <span className="metric-label">Largest Investment Date:</span>
              <span className="metric-value">{investorMetrics.largestInvestmentDate}</span>
            </p>
            <p>
              <span className="metric-label">Smallest Investment:</span>
              <span className="metric-value">${investorMetrics.smallestInvestment.toLocaleString()}</span>
            </p>
            <p>
              <span className="metric-label">Smallest Investment Date:</span>
              <span className="metric-value">{investorMetrics.smallestInvestmentDate}</span>
            </p>
          </div>
        </div>

        {/* Risk Metrics */}
        <div className="metrics-section">
          <h4>Risk Metrics</h4>
          <div className="metrics-row">
            <p>
              <span className="metric-label">Sharpe Ratio:</span>
              <span className="value">{investorMetrics.sharpeRatio.toFixed(2)}</span>
            </p>
            <p>
              <span className="metric-label">Volatility:</span>
              <span className="metric-value">{investorMetrics.volatility.toFixed(2)}%</span>
            </p>
            <p>
              <span className="metric-label">Max Drawdown:</span>
              <span className={`metric-value ${investorMetrics.maxDrawdown >= 0 ? 'status-active' : 'status-withdraw'}`}>
                {investorMetrics.maxDrawdown.toFixed(2)}%
              </span>
            </p>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="metrics-section">
          <h4>Performance Metrics</h4>
          <div className="metrics-row">
            <p>
              <span className="metric-label">Average Investment Duration:</span>
              <span className="metric-value">{investorMetrics.averageInvestmentDuration}</span>
            </p>
            <p>
              <span className="metric-label">Positive Return Months:</span>
              <span className="metric-value">{investorMetrics.positiveReturnMonths}</span>
            </p>
            <p>
              <span className="metric-label">Negative Return Months:</span>
              <span className="metric-value">{investorMetrics.negativeReturnMonths}</span>
            </p>
            <p>
              <span className="metric-label">Average Monthly Return:</span>
              <span className={`metric-value ${investorMetrics.averageMonthlyReturn >= 0}`}>
                {investorMetrics.averageMonthlyReturn.toFixed(2)}%
              </span>
            </p>
          </div>
        </div>

        {/* Sector Allocation */}
        <div className="metrics-section">
          <h4>Sector Allocation</h4>
          <div className="metrics-row">
            <p>
              <span className="metric-label">Technology:</span>
              <span className="metric-value">{investorMetrics.sectorAllocation.technology}%</span>
            </p>
            <p>
              <span className="metric-label">Real Estate:</span>
              <span className="metric-value">{investorMetrics.sectorAllocation.realEstate}%</span>
            </p>
            <p>
              <span className="metric-label">Healthcare:</span>
              <span className="metric-value">{investorMetrics.sectorAllocation.healthcare}%</span>
            </p>
            <p>
              <span className="metric-label">Others:</span>
              <span className="metric-value">{investorMetrics.sectorAllocation.others}%</span>
            </p>
          </div>
        </div>
      </div>
      <button className="dialog-close-btn" onClick={() => setShowMetricsDialog(false)}>
        Close
      </button>
    </div>
  </div>
)}

 {showRoiDialog && (
          <div className="modal" onClick={() => setShowRoiDialog(false)}>
            <div className="modal-content roi-dialog" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3 className="dialog-title">Investor ROI</h3>
                <button className="modal-close" onClick={() => setShowRoiDialog(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className="roi-content">
                <p>
                  <span className="label">Return on Investment (ROI):</span>
                  <span className={`value ${investorMetrics.roi >= 0 ? 'status-active' : 'status-withdraw'}`}>
                    {investorMetrics.roi.toFixed(2)}%
                  </span>
                </p>
              </div>
              <button className="dialog-close-btn" onClick={() => setShowRoiDialog(false)}>
                Close
              </button>
            </div>
          </div>
        )}

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
                <select
                  name="type"
                  defaultValue={editingUser?.type}
                  required
                  onChange={(e) => {
                    if (e.target.value === "Investor") {
                      document.getElementsByName("market")[0].value = "";
                    }
                  }}
                >
                  <option value="Trader">Trader</option>
                  <option value="Investor">Investor</option>
                </select>
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
                  disabled={editingUser?.type === "Investor"}
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
                  placeholder="Investments"
                  defaultValue={editingUser?.investors}
                  required
                />
                <input
                  name="profit"
                  placeholder="Portfolio Value"
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
      </div>
    );
  }

  // Table View
  return (
    <div className="app users-component">
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
              <Search className="search-icon" size={18} />
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
                placeholder="Search Date"
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
              {currentUsers.map((user, index) => (
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
                  <td data-label="Market">{user.market || '-'}</td>
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
                        <MoreHorizontal size={16} />
                      </button>
                      {menuOpen === user.id && (
                        <div
                          className={`team-dropdown-menu ${
                            index >= currentUsers.length - 2 ? "drop-up" : ""
                          }`}
                        >
                          <button onClick={() => handleAction(user, "view")}>
                            <Eye size= {14} /> View Profile
                          </button>
                          <button onClick={() => handleAction(user, "edit")}>
                            <Edit size={14} /> Edit
                          </button>
                          <button onClick={() => handleAction(user, "remove")}>
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