import React, { useState, useEffect } from "react";
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

const STORAGE_KEY = "users_data";

const defaultUsers = [
  {
    id: 1,
    name: "Maria Khan",
    email: "abc@gmail.com",
    type: "Trader",
    wallet: "fjfsjfhjshfsjfyyyeuucn",
    market: "Forex",
    broker: "Binance",
    joined: "26 July 2025",
    status: "Active",
    investors: 12,
    profit: "$2.3M",
    equity: "35%",
    exp: "2-3 years",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [activeTab, setActiveTab] = useState("about");

  // 👉 Performance Metrics State
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

    const storedMetrics = localStorage.getItem("metrics_data");
    if (storedMetrics) {
      setMetrics(JSON.parse(storedMetrics));
    }
  }, []);

  // Save users
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    }
  }, [users]);

  // Save metrics
  useEffect(() => {
    localStorage.setItem("metrics_data", JSON.stringify(metrics));
  }, [metrics]);

  // Handle Add/Edit user submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const userData = {
      id: editingUser ? editingUser.id : Date.now(),
      name: form.get("name"),
      email: form.get("email"),
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

  return (
    <div className="app">
      <main className="main-content">
        {/* Page Header */}
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

        {/* Dynamic Users List */}
        {users.map((user) => (
          <div key={user.id} className="user-info">
            <div className="user-card">
              <img src={user.avatar} alt="User Avatar" className="avatar" />
              <div className="user-card-info">
                <h3>{user.name}</h3>
                <span className={`status ${user.status.toLowerCase()}`}>
                  {user.status}
                </span>
              </div>
              <div className="user-stats">
                <p>
                  <strong>{user.investors}</strong> Investors
                </p>
                <p>
                  <strong>{user.profit}</strong> Net Profit
                </p>
                <p>
                  <strong>{user.equity}</strong> Equity
                </p>
                <p>
                  <strong>{user.exp}</strong> Experience
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
                  onClick={() => setDeleteUserId(user.id)}
                >
                  <FaTrash /> Delete
                </button>
                <button
                  className="btn outline"
                  onClick={() => {
                    setEditingUser(user);
                    setShowForm(true);
                  }}
                >
                  <FaEdit /> Edit
                </button>
              </div>
            </div>

            <div className="user-details">
              <div className="detail-row">
                <p>
                  <span className="label">Email:</span>
                  <span className="value">{user.email}</span>
                </p>
                <p>
                  <span className="label">User Type:</span>
                  <span className="value">{user.type}</span>
                </p>
              </div>

              <div className="detail-row">
                <p>
                  <span className="label">Wallet ID:</span>
                  <span className="value">
                    <a href="#">{user.wallet}</a>
                  </span>
                </p>
                <p>
                  <span className="label">Market:</span>
                  <span className="value">{user.market}</span>
                </p>
              </div>

              <div className="detail-row">
                <p>
                  <span className="label">Broker:</span>
                  <span className="value">{user.broker}</span>
                </p>
                <p>
                  <span className="label">Joined:</span>
                  <span className="value">{user.joined}</span>
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
        ))}

        {/* Charts Section */}
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

          {/* Tab Content */}
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

          {/* ✅ Performance Metrics with edit */}
          <h3>Performance Metrics</h3>
          <div className="metrics-grid">
            <p onClick={() => { setEditingMetric("winRate"); setNewMetricValue(metrics.winRate); }}>
              Win Rate <span className="green">{metrics.winRate}</span>
            </p>
            <p onClick={() => { setEditingMetric("profitFactor"); setNewMetricValue(metrics.profitFactor); }}>
              Profit Factor <span>{metrics.profitFactor}</span>
            </p>
            <p onClick={() => { setEditingMetric("sharpeRatio"); setNewMetricValue(metrics.sharpeRatio); }}>
              Sharpe Ratio <span>{metrics.sharpeRatio}</span>
            </p>
            <p onClick={() => { setEditingMetric("roi"); setNewMetricValue(metrics.roi); }}>
              ROI <span className="green">{metrics.roi}</span>
            </p>
            <p onClick={() => { setEditingMetric("maxDrawdown"); setNewMetricValue(metrics.maxDrawdown); }}>
              Max Drawdown <span className="red">{metrics.maxDrawdown}</span>
            </p>
            <p onClick={() => { setEditingMetric("totalTrades"); setNewMetricValue(metrics.totalTrades); }}>
              Total Trades <span>{metrics.totalTrades}</span>
            </p>
            <p onClick={() => { setEditingMetric("avgWin"); setNewMetricValue(metrics.avgWin); }}>
              Avg Win <span className="green">{metrics.avgWin}</span>
            </p>
            <p onClick={() => { setEditingMetric("avgLoss"); setNewMetricValue(metrics.avgLoss); }}>
              Avg Loss <span className="red">{metrics.avgLoss}</span>
            </p>
            <p onClick={() => { setEditingMetric("bestTrade"); setNewMetricValue(metrics.bestTrade); }}>
              Best Trade <span className="green">{metrics.bestTrade}</span>
            </p>
            <p onClick={() => { setEditingMetric("worstTrade"); setNewMetricValue(metrics.worstTrade); }}>
              Worst Trade <span className="red">{metrics.worstTrade}</span>
            </p>
            <p onClick={() => { setEditingMetric("riskReward"); setNewMetricValue(metrics.riskReward); }}>
              Risk Reward <span>{metrics.riskReward}</span>
            </p>
          </div>

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

        {/* User Form Modal */}
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

        {/* Delete Confirm Popup */}
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

        {/* Metric Edit Modal */}
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
      </main>
    </div>
  );
};

export default Users;