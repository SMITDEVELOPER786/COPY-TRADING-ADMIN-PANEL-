import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { defaultUsers } from '../data/usersData';
import UserCharts from '../components/UserCharts';
import {
  FaEnvelope,
  FaBan,
  FaSnowflake,
  FaTrash,
  FaIdCard,
  FaPhone,
  FaEdit,
  FaChartLine,
} from 'react-icons/fa';
import { X, Activity } from 'lucide-react';
import '../Users.css';

const InvestorProfile = () => {
  const { investmentId, investorId } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState(defaultUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [activeTab, setActiveTab] = useState('investments');
  const [showMetricsDialog, setShowMetricsDialog] = useState(false);
  const [showRoiDialog, setShowRoiDialog] = useState(false);

  const investorMetrics = {
    portfolioValue: selectedUser ? parseFloat(selectedUser.profit.replace('$', '').replace('M', '')) * 1000000 : 0,
    annualizedReturn: 12.5,
    roi: 28.3,
    diversificationScore: 75,
    totalInvestments: selectedUser ? parseInt(selectedUser.investors) : 0,
    averageInvestmentSize: 150000,
    largestInvestment: 500000,
    largestInvestmentDate: '15 Mar 2023',
    smallestInvestment: 20000,
    smallestInvestmentDate: '10 Jan 2023',
    sharpeRatio: 1.8,
    volatility: 10.2,
    maxDrawdown: -5.6,
    averageInvestmentDuration: '18 months',
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

  useEffect(() => {
    const user = users.find((u) => u.id === parseInt(investorId));
    setSelectedUser(user || null);
  }, [investorId, users]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const userData = {
      id: editingUser ? editingUser.id : Date.now(),
      name: form.get('name'),
      email: form.get('email'),
      phone: form.get('phone') || '',
      type: form.get('type'),
      wallet: form.get('wallet'),
      market: form.get('type') === 'Investor' ? '' : form.get('market'),
      broker: form.get('broker'),
      joined: form.get('joined'),
      status: form.get('status'),
      investors: form.get('investors'),
      profit: form.get('profit'),
      equity: form.get('equity'),
      exp: form.get('exp'),
      avatar: form.get('avatar'),
    };

    if (editingUser) {
      setUsers(users.map((u) => (u.id === editingUser.id ? userData : u)));
    } else {
      setUsers([...users, userData]);
    }
    setShowForm(false);
    setEditingUser(null);
  };

  const confirmDelete = () => {
    setUsers(users.filter((u) => u.id !== deleteUserId));
    setDeleteUserId(null);
    navigate('/investments');
  };

  const handleToggle = () => {
    // Placeholder for toggle functionality
  };

  const handleViewDetails = (item) => {
    console.log(`Viewing details for: ${item}`);
  };

  if (!selectedUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <main className="main-content">
        <div className="page-header">
          <button
            className="btn outline back-btn"
            onClick={() => navigate('/investments')}
          >
            ← Back to Investments
          </button>
          <h2 className="page-title">Profile: {selectedUser.name}</h2>
        </div>

        <div className="user-info">
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

        <div className="container">
          <h3 className="strategy-title">Investment Strategy</h3>
          <div className="tabs-container">
            <div className="tabs">
              <button
                className={`tabs ${activeTab === 'investments' ? 'active' : ''}`}
                onClick={() => setActiveTab('investments')}
              >
                Investments
              </button>
              <button
                className={`tabs ${activeTab === 'transactions' ? 'active' : ''}`}
                onClick={() => setActiveTab('transactions')}
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

          <div className={`tab-content-wrapper ${activeTab === 'investments' ? 'active' : ''}`}>
            {activeTab === 'investments' && (
              <div className="tab-content">
                <h4 className="content-title">Top Investments</h4>
                <ul className="investment-list">
                  <li className="investment-item">
                    <span className="investment-name">Tech Fund — $50,000</span>
                    <button className="premium-btn" onClick={() => handleViewDetails('Tech Fund')}>
                      View Details
                    </button>
                  </li>
                  <li className="investment-item">
                    <span className="investment-name">Real Estate Trust — $32,500</span>
                    <button className="premium-btn" onClick={() => handleViewDetails('Real Estate Trust')}>
                      View Details
                    </button>
                  </li>
                  <li className="investment-item">
                    <span className="investment-name">Healthcare ETF — $21,000</span>
                    <button className="premium-btn" onClick={() => handleViewDetails('Healthcare ETF')}>
                      View Details
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className={`tab-content-wrapper ${activeTab === 'transactions' ? 'active' : ''}`}>
            {activeTab === 'transactions' && (
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
                        <button className="premium-btn" onClick={() => handleViewDetails('Investment - 15 Sep 2025')}>
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
                        <button className="premium-btn" onClick={() => handleViewDetails('Withdrawal - 12 Sep 2025')}>
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
                        <button className="premium-btn" onClick={() => handleViewDetails('Dividend - 10 Sep 2025')}>
                          View Details
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="charts-section" style={{ marginTop: '70px' }}>
          <div className="chart-box">
            <h3>Portfolio Growth</h3>
            <UserCharts type="equity" />
          </div>
          <div className="chart-box">
            <h3>Monthly Performance Trends</h3>
            <UserCharts type="performance" />
          </div>
        </div>

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

        {showForm && (
          <div className="modal">
            <div className="modal-content small">
              <h3>{editingUser ? 'Edit User' : 'Add User'}</h3>
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
                    if (e.target.value === 'Investor') {
                      document.getElementsByName('market')[0].value = '';
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
                  disabled={editingUser?.type === 'Investor'}
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

export default InvestorProfile;