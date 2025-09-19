import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChevronLeft, Phone, FileText, TrendingUp, Target, BarChart3, DollarSign, Calendar, Award } from "lucide-react";
import "../TraderProfile.css";

const TraderProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trader, setTrader] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem("tableData");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      const allUsers = [
        ...parsed["Top Investors"],
        ...parsed["Top Traders"],
        ...parsed["Awaiting Approvals"],
      ];
      const found = allUsers.find((u) => u.id.toString() === id);
      setTrader(found || null);
    }
  }, [id]);

  if (!trader) {
    return <p style={{ padding: "20px" }}>Trader not found</p>;
  }

  return (
    <div className="trader-profile-container">
      <div className="profile-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={18} /> Back
        </button>
        <div className="header-title">
        <h2 className="pagee-titlees">Traders <span className="subb-titlees">› Trader Details</span></h2>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-main">
          <div className="profile-card">
            <div className="profile-top">
              <img src={trader.avatar} alt={trader.name} className="profile-avatar" />
              <div className="profile-details">
                <h2 className="trader-name">{trader.name}</h2>
                <span className="status-badge active">Active</span>
              </div>
            </div>

            <div className="profile-stats">
              <div className="stat-item">
                <div className="stat-icon">
                  <TrendingUp size={20} />
                </div>
                <div className="stat-content">
                  <span className="stat-number">12</span>
                  <span className="stat-label">Investors</span>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <DollarSign size={20} />
                </div>
                <div className="stat-content">
                  <span className="stat-number">{trader.portfolio}</span>
                  <span className="stat-label">Net Profit</span>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <BarChart3 size={20} />
                </div>
                <div className="stat-content">
                  <span className="stat-number">87.5%</span>
                  <span className="stat-label">Win Rate</span>
                </div>
              </div>
            </div>

            <div className="profile-secondary-stats">
              <div className="secondary-stat">
                <Target size={16} className="secondary-stat-icon" />
                <span className="secondary-stat-value">35%</span>
                <span className="secondary-stat-label">Equity</span>
              </div>
              <div className="secondary-stat">
                <Calendar size={16} className="secondary-stat-icon" />
                <span className="secondary-stat-value">2-3 years</span>
                <span className="secondary-stat-label">Experience</span>
              </div>
              <div className="secondary-stat">
                <Award size={16} className="secondary-stat-icon" />
                <span className="secondary-stat-value">Gold</span>
                <span className="secondary-stat-label">Tier</span>
              </div>
            </div>

            <div className="trading-metrics">
              <h4>Trading Performance</h4>
              <div className="metrics-grid">
                <div className="metric-item">
                  <span className="metric-label">Total Trades</span>
                  <span className="metric-value">1,247</span>
                </div>
                <div className="metric-item">
                  <span className="metric-label">Avg. Return</span>
                  <span className="metric-value positive">+24.8%</span>
                </div>
                <div className="metric-item">
                  <span className="metric-label">Max Drawdown</span>
                  <span className="metric-value negative">-8.2%</span>
                </div>
                <div className="metric-item">
                  <span className="metric-label">Sharpe Ratio</span>
                  <span className="metric-value">2.34</span>
                </div>
              </div>
            </div>

            <div className="risk-management">
              <h4>Risk Management</h4>
              <div className="risk-indicators">
                <div className="risk-item">
                  <span className="risk-label">Risk Level</span>
                  <div className="risk-badge moderate">Moderate</div>
                </div>
                <div className="risk-item">
                  <span className="risk-label">Position Size</span>
                  <span className="risk-value">2-5% per trade</span>
                </div>
                <div className="risk-item">
                  <span className="risk-label">Stop Loss</span>
                  <span className="risk-value">Always used</span>
                </div>
              </div>
            </div>
          </div>

          <div className="trading-strategy">
            <h3>Trading Strategy</h3>
            <div className="strategy-content">
              <p>Advanced momentum trading with strict risk management protocols. Specializes in swing trading with focus on high-growth tech stocks and major cryptocurrency pairs. Uses technical analysis combined with fundamental research for entry and exit points.</p>
              <div className="strategy-tags">
                <span className="strategy-tag">Momentum Trading</span>
                <span className="strategy-tag">Technical Analysis</span>
                <span className="strategy-tag">Risk Management</span>
                <span className="strategy-tag">Swing Trading</span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-sidebar">
          <div className="info-section">
            <div className="info-group">
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">trader@gmail.com</span>
              </div>
              <div className="info-item">
                <span className="info-label">User Type:</span>
                <span className="info-value">Trader</span>
              </div>
            </div>

            <div className="info-group">
              <div className="info-item">
                <span className="info-label">Wallet ID:</span>
                <span className="info-value wallet-id">fjsjfjsjfsfjyyyyeuucn</span>
              </div>
              <div className="info-item">
                <span className="info-label">Market:</span>
                <span className="info-value">Forex</span>
              </div>
            </div>

            <div className="info-group">
              <div className="info-item">
                <span className="info-label">Broker:</span>
                <span className="info-value">Binance</span>
              </div>
              <div className="info-item">
                <span className="info-label">Joined:</span>
                <span className="info-value">26 July 2025</span>
              </div>
            </div>

            <div className="sidebar-actions">
              <button className="btn btn-kyc">
                <FileText size={16} /> View KYC
              </button>
              <button className="btn btn-contact">
                <Phone size={16} /> Contact Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraderProfile;