import React, { useState, useEffect, useMemo } from "react";
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
import { getUsers } from "../services/user.service";


const Users = () => {
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

  // ==================== STATE MANAGEMENT ====================
  const [usersData, setUsersData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // ==================== HELPER FUNCTIONS ====================
  
  /**
   * Transform API user data to component format
   */
  const transformUserData = (apiUser) => {
    return {
      id: apiUser._id || apiUser.id,
      _id: apiUser._id,
      name: apiUser.username || apiUser.name || apiUser.fullName || 'N/A',
      email: apiUser.email || 'N/A',
      phone: apiUser.phone || '',
      type: apiUser.role || 'INVESTOR',
      role: apiUser.role,
      wallet: apiUser.wallet || apiUser.walletAddress || '-',
      market: apiUser.market || '-',
      broker: apiUser.broker || '-',
      joined: apiUser.createdAt 
        ? new Date(apiUser.createdAt).toLocaleDateString('en-GB', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
          })
        : '-',
      createdAt: apiUser.createdAt,
      status: apiUser.kycStatus === 'APPROVED' ? 'Active' : 
              apiUser.kycStatus === 'PENDING' ? 'Deactivate' : 
              apiUser.isFrozen ? 'Delete' : 'Active',
      kycStatus: apiUser.kycStatus,
      isFrozen: apiUser.isFrozen,
      avatar: apiUser.profileImage?.url || apiUser.avatar || apiUser.profilePicture || 'https://via.placeholder.com/40',
      investors: apiUser.investors || 0,
      profit: apiUser.profit || '$0',
      equity: apiUser.equity || '0%',
      exp: apiUser.exp || '-',
    };
  };

  /**
   * Fetch users from API
   */
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Pass empty role to get all users, then filter client-side
      const response = await getUsers({
        role: '',
        all: true,
      });
      
      setUsersData(response);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.message || 'Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  // ==================== DATA TRANSFORMATION ====================
  
  /**
   * Extract and transform users from API response
   */
  const users = useMemo(() => {
    if (!usersData) return [];
    
    // API structure: { status: 'success', message: '...', data: { users: [...], total: 2, count: 2 } }
    let apiUsers = [];
    
    // Handle nested structure: usersData.data.users
    if (usersData.data && usersData.data.users && Array.isArray(usersData.data.users)) {
      apiUsers = usersData.data.users;
    } else if (usersData.users && Array.isArray(usersData.users)) {
      apiUsers = usersData.users;
    } else if (usersData.data && Array.isArray(usersData.data)) {
      apiUsers = usersData.data;
    } else if (Array.isArray(usersData)) {
      apiUsers = usersData;
    }
    
    // Filter to show only INVESTOR or TRADER roles
    const filteredApiUsers = apiUsers.filter(
      user => user.role === 'INVESTOR' || user.role === 'TRADER'
    );
    
    // Transform to component format
    return filteredApiUsers.map(transformUserData);
  }, [usersData]);

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

  // Fixed date parsing function
  const parseJoinedDate = (joinedStr) => {
    // Convert "29 June 2023" format to Date object
    const monthNames = {
      'January': 0, 'February': 1, 'March': 2, 'April': 3,
      'May': 4, 'June': 5, 'July': 6, 'August': 7,
      'September': 8, 'October': 9, 'November': 10, 'December': 11
    };
    
    const parts = joinedStr.split(' ');
    if (parts.length === 3) {
      const day = parseInt(parts[0]);
      const month = monthNames[parts[1]];
      const year = parseInt(parts[2]);
      
      if (!isNaN(day) && month !== undefined && !isNaN(year)) {
        return new Date(year, month, day);
      }
    }
    return null;
  };

  // Date matching function - handles both formatted dates and ISO dates
  const isDateMatch = (joinedStr, searchDate) => {
    if (!searchDate || !joinedStr) return true;
    
    // Try to parse as ISO date first (from API)
    let joinedDate = null;
    if (joinedStr.includes('T') || joinedStr.includes('-')) {
      // ISO format from API
      joinedDate = new Date(joinedStr);
    } else {
      // Formatted date string
      joinedDate = parseJoinedDate(joinedStr);
    }
    
    if (!joinedDate || isNaN(joinedDate.getTime())) return false;
    
    const year = joinedDate.getFullYear().toString();
    const month = String(joinedDate.getMonth() + 1).padStart(2, '0');
    const day = String(joinedDate.getDate()).padStart(2, '0');
    
    // Support different search formats
    if (searchDate.length === 4) {
      return year === searchDate;
    } else if (searchDate.length === 7 && searchDate.includes('-')) {
      return `${year}-${month}` === searchDate;
    } else if (searchDate.length === 10 && searchDate.includes('-')) {
      return `${year}-${month}-${day}` === searchDate;
    } else {
      return joinedStr.toLowerCase().includes(searchDate.toLowerCase());
    }
  };

  // ==================== API CALLS ====================
  
  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // ==================== FILTERS & PAGINATION ====================
  
  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedStatus, selectedDate]);

  // Dynamic Profile: Check if viewing a specific user
  useEffect(() => {
    const userId = params.id;
    if (userId && users.length > 0) {
      // Try to find by id (could be number or string)
      const user = users.find((u) => 
        u.id === parseInt(userId) || 
        u.id === userId || 
        u._id === userId ||
        String(u.id) === String(userId)
      );
      setSelectedUser(user || null);
    } else {
      setSelectedUser(null);
    }
  }, [params.id, users]);

  // ==================== EVENT HANDLERS ====================
  
  // Handle Add/Edit user submit
  const handleSubmit = async (e) => {
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

    // TODO: Implement API call for create/update user
    setShowForm(false);
    setEditingUser(null);
    fetchUsers(); // Refresh data
  };

  // Confirm delete
  const confirmDelete = async () => {
    // TODO: Implement API call for delete user
    setDeleteUserId(null);
    if (selectedUser && (selectedUser.id === deleteUserId || selectedUser._id === deleteUserId)) {
      navigate("/users");
    }
    fetchUsers(); // Refresh data
  };

  // Toggle dropdown menu
  const toggleMenu = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  // Handle actions (View, Edit, Remove)
  const handleAction = (user, action) => {
    const userId = user.id || user._id;
    if (action === "view") {
      if (user.type === "Trader" || user.role === "TRADER") {
        navigate(`/profile/${userId}`);
      } else {
        navigate(`/users/${userId}`);
      }
    } else if (action === "edit") {
      setEditingUser(user);
      setShowForm(true);
    } else if (action === "remove") {
      setDeleteUserId(userId);
    }
    setMenuOpen(null);
  };

  // Filter users by search, status, and date
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      // Search filter
      const searchMatch = !searchTerm || 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Status filter
      const statusMatch = !selectedStatus || user.status === selectedStatus;
      
      // Date filter - check both formatted date and raw createdAt
      const dateMatch = !selectedDate || 
        (user.joined && isDateMatch(user.joined, selectedDate)) ||
        (user.createdAt && isDateMatch(user.createdAt, selectedDate));
      
      return searchMatch && statusMatch && dateMatch;
    });
  }, [users, searchTerm, selectedStatus, selectedDate]);

  // Paginate filtered results (client-side pagination)
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

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

  // Handle toggle and view details functions for investor profile
  const handleToggle = (checked) => {
    // Add your toggle logic here
    console.log("Toggle switched:", checked);
  };

  const handleViewDetails = (item) => {
    // Add your view details logic here
    console.log("View details for:", item);
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
                placeholder="Search Date (YYYY, YYYY-MM, YYYY-MM-DD, or text)"
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
          {isLoading && (
            <div style={{ padding: "20px", textAlign: "center" }}>
              Loading investors...
            </div>
          )}
          {error && (
            <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
              Error loading investors: {error.message}
            </div>
          )}
          {!isLoading && !error && (
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
                {currentUsers.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                      No investors found
                    </td>
                  </tr>
                ) : (
                  currentUsers.map((user, index) => (
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
                          onClick={() => toggleMenu(user.id || user._id)}
                        >
                          <MoreHorizontal size={16} />
                        </button>
                        {menuOpen === (user.id || user._id) && (
                          <div
                            className={`team-dropdown-menu ${
                              index >= currentUsers.length - 2 ? "drop-up" : ""
                            }`}
                          >
                            <button onClick={() => handleAction(user, "view")}>
                              <Eye size={14} /> View Profile
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
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        <div className="table-footer">
          <div className="showing-info">
            {isLoading ? (
              "Loading..."
            ) : error ? (
              `Error: ${error}`
            ) : (
              `Showing: ${currentUsers.length} of ${filteredUsers.length}${usersData?.data?.total ? ` (Total: ${usersData.data.total})` : usersData?.total ? ` (Total: ${usersData.total})` : ''} Entries`
            )}
          </div>
          {!isLoading && !error && totalPages > 0 && (
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
          )}
        </div>

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
      </main>
    </div>
  );
};

export default Users;