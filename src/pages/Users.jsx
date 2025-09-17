import React, { useState, useEffect } from "react";
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

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setUsers(JSON.parse(stored));
    } else {
      setUsers(defaultUsers);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUsers));
    }
  }, []);

  // Save to localStorage when users update
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    }
  }, [users]);

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

  return (
    <div className="app">
      <main className="main-content">
<<<<<<< HEAD
        <h2 className="page-title">
          Users <span className="sub-title">› User Details</span>
        </h2>

        <div className="user-info">
          <div className="user-card">
            <img
              src="https://randomuser.me/api/portraits/women/65.jpg"
              alt="User Avatar"
              className="avatars"
            />
            <div className="user-card-info">
              <h3>Maria Khan</h3>
              <span className="status active">Active</span>
            </div>
            <div className="user-stats">
              <p><strong>12</strong> Investors</p>
              <p><strong>$2.3M</strong> Net Profit</p>
              <p><strong>35%</strong> Equity</p>
              <p><strong>2_3 years</strong> Experience</p>
            </div>
            <div className="card-actions">
              <button className="btn green"><FaEnvelope /> Send Email</button>
              <button className="btn orange"><FaBan /> Deactivate</button>
              <button className="btn red"><FaSnowflake /> Freeze</button>
              <button className="btn red"><FaTrash /> Delete</button>
            </div>
          </div>

          <div className="user-details">
            <div className="detail-row">
              <p>
                <span className="label">Email:</span>
                <span className="value">abc@gmail.com</span>
              </p>
              <p>
                <span className="label">User Type:</span>
                <span className="value">Trader</span>
              </p>
            </div>

            <div className="detail-row">
              <p>
                <span className="label">Wallet ID:</span>
                <span className="value"><a href="#">fjfsjfhjshfsjfyyyeuucn</a></span>
              </p>
              <p>
                <span className="label">Market:</span>
                <span className="value">Forex</span>
              </p>
            </div>

            <div className="detail-row">
              <p>
                <span className="label">Broker:</span>
                <span className="value">Binance</span>
              </p>
              <p>
                <span className="label">Joined:</span>
                <span className="value">26 July 2025</span>
              </p>
            </div>

            <div className="actions">
              <button className="btn outline"><FaIdCard /> View KYC</button>
              <button className="btn outline"><FaPhone /> Contact Info</button>
            </div>
          </div>
        </div>

=======
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

        {/* Trading Strategy + Metrics + Charts */}
>>>>>>> kashaf
        <div className="container">
          <h3>Trading Strategy</h3>
          <div className="tabs-container">
            <div className="tabs">
              <button className="tab active">About Trader</button>
              <button className="tab">Investor</button>
              <button className="tab">Transactions</button>
            </div>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>

            <p>
              Momentum based Swing trader focusing on major currency pairs
              during high volatility periods. Strategy involves capturing short-
              to medium-term gains during high volatility periods.
            </p>
          </div>

          <h3>Performance Metrics</h3>
          <div className="metrics-grid">
            <p>
              Win Rate <span className="green">78%</span>
            </p>
            <p>
              Profit Factor <span>2.14</span>
            </p>
            <p>
              Sharpe Ratio <span>1.67</span>
            </p>
            <p>
              ROI <span className="green">+42.8%</span>
            </p>
            <p>
              Max Drawdown <span className="red">-8.2%</span>
            </p>
            <p>
              Total Trades <span>127</span>
            </p>
            <p>
              Avg Win <span className="green">$285.5</span>
            </p>
            <p>
              Avg Loss <span className="red">$142.3</span>
            </p>
            <p>
              Best Trade <span className="green">1250.4</span>
            </p>
            <p>
              Worst Trade <span className="red">890</span>
            </p>
            <p>
              Risk Reward <span>2.3:1</span>
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
                <input name="name" placeholder="Name" defaultValue={editingUser?.name} required />
                <input name="email" placeholder="Email" defaultValue={editingUser?.email} required />
                <input name="type" placeholder="User Type" defaultValue={editingUser?.type} required />
                <input name="wallet" placeholder="Wallet ID" defaultValue={editingUser?.wallet} required />
                <input name="market" placeholder="Market" defaultValue={editingUser?.market} required />
                <input name="broker" placeholder="Broker" defaultValue={editingUser?.broker} required />
                <input name="joined" placeholder="Joined Date" defaultValue={editingUser?.joined} required />
                <input name="status" placeholder="Status" defaultValue={editingUser?.status} required />
                <input name="investors" placeholder="Investors" defaultValue={editingUser?.investors} required />
                <input name="profit" placeholder="Net Profit" defaultValue={editingUser?.profit} required />
                <input name="equity" placeholder="Equity" defaultValue={editingUser?.equity} required />
                <input name="exp" placeholder="Experience" defaultValue={editingUser?.exp} required />
                <input name="avatar" placeholder="Avatar URL" defaultValue={editingUser?.avatar} required />

                <div className="form-actions">
                  <button type="submit" className="btn green">Save</button>
                  <button type="button" className="btn red" onClick={() => { setShowForm(false); setEditingUser(null); }}>
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
                <button className="btn red" onClick={confirmDelete}>Delete</button>
                <button className="btn outline" onClick={() => setDeleteUserId(null)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Users;
