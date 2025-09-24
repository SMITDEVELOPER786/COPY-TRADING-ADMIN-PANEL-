import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChevronLeft, Phone, FileText, TrendingUp, Target, BarChart3, DollarSign, Calendar, Award, X, Activity } from "lucide-react";
import "../TraderProfile.css";

const TraderProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trader, setTrader] = useState(null);
  const [showMetricsDialog, setShowMetricsDialog] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("tableData") ;
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

  const advancedMetrics = {
  // 📊 Trading Metrics
  totalTrades: "1,247",
  avgReturn: "+24.8%",
  maxDrawdown: "-8.2%",
  sharpeRatio: "2.34",
  expectancy: "0.68",
  rrRatio: "2:1",
  tradeFrequency: "12 days",
  avgDuration: "2.3 days",
  slTpHitRatio: "65/35",

  // 📈 Advanced Metrics
  profitFactor: "2.45",
  calmarRatio: "3.21",
  sortinoRatio: "2.87",
  maxConsecutiveWins: "14",
  maxConsecutiveLosses: "4",
  averageWinningTrade: "$2,450",
  averageLosingTrade: "-$890",
  largestWinningTrade: "$12,500",
  largestLosingTrade: "-$3,200",
  totalTradingDays: "287",
  profitableDays: "195",
  unprofitableDays: "92",
  avgDailyReturn: "1.8%",
  volatility: "15.3%",
  beta: "0.87",
  alpha: "8.2%",
  informationRatio: "1.34",
  treynorRatio: "18.5",
  trackingError: "4.2%",
  valueAtRisk: "2.1%"
};


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
             <div className="profile-actions">
          <span className="status-badge active">Active</span>
          <button 
            className="metrics-btn"
            onClick={() => setShowMetricsDialog(true)}
            title="View Advanced Trading Metrics"
          >
            <Activity size={20} />
            <span>Trading Metrics</span>
          </button>
        </div>
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

 {/* Advanced Metrics Dialog */}
{showMetricsDialog && (
  <div className="metrics-dialog-overlay" onClick={() => setShowMetricsDialog(false)}>
    <div className="metrics-dialog" onClick={(e) => e.stopPropagation()}>
      <div className="dialog-header">
        <h3 className="dialog-title">Advanced Trading Metrics</h3>
        <button 
          className="dialog-close-icon" 
          onClick={() => setShowMetricsDialog(false)}
        >
          <X size={20} />
        </button>
      </div>

      <div className="advanced-metrics-grid">

        {/* 🟢 Trading Metrics Section */}
        <div className="metrics-section">
          <h4 className="section-title">Trading Metrics</h4>
          <div className="metrics-row">
            <div className="advanced-metric-item">
              <span className="metric-label">Total Trades</span>
              <span className="metric-value">{advancedMetrics.totalTrades}</span>
            </div>
            <div className="advanced-metric-item">
              <span className="metric-label">Avg. Return</span>
              <span className="metric-value positive">{advancedMetrics.avgReturn}</span>
            </div>
            <div className="advanced-metric-item">
              <span className="metric-label">Max Drawdown</span>
              <span className="metric-value negative">{advancedMetrics.maxDrawdown}</span>
            </div>
          </div>

          <div className="metrics-row">
            <div className="advanced-metric-item">
              <span className="metric-label">Sharpe Ratio</span>
              <span className="metric-value">{advancedMetrics.sharpeRatio}</span>
            </div>
            <div className="advanced-metric-item">
              <span className="metric-label">Expectancy</span>
              <span className="metric-value">{advancedMetrics.expectancy}</span>
            </div>
            <div className="advanced-metric-item">
              <span className="metric-label">R:R Ratio</span>
              <span className="metric-value">{advancedMetrics.rrRatio}</span>
            </div>
          </div>

          <div className="metrics-row">
            <div className="advanced-metric-item">
              <span className="metric-label">Trade Frequency</span>
              <span className="metric-value">{advancedMetrics.tradeFrequency}</span>
            </div>
            <div className="advanced-metric-item">
              <span className="metric-label">Avg Duration</span>
              <span className="metric-value">{advancedMetrics.avgDuration}</span>
            </div>
            <div className="advanced-metric-item">
              <span className="metric-label">SL/TP Hit Ratio</span>
              <span className="metric-value">{advancedMetrics.slTpHitRatio}</span>
            </div>
          </div>
        </div>



        {/* 🟠 Trading Statistics */}
        <div className="metrics-section">
          <h4 className="section-title">Trading Statistics</h4>
          <div className="metrics-row">
            <div className="advanced-metric-item">
              <span className="metric-label">Max Consecutive Wins</span>
              <span className="metric-value positive">{advancedMetrics.maxConsecutiveWins}</span>
            </div>
            <div className="advanced-metric-item">
              <span className="metric-label">Max Consecutive Losses</span>
              <span className="metric-value negative">{advancedMetrics.maxConsecutiveLosses}</span>
            </div>
            <div className="advanced-metric-item">
              <span className="metric-label">Total Trading Days</span>
              <span className="metric-value">{advancedMetrics.totalTradingDays}</span>
            </div>
          </div>
        </div>

        {/* 🔵 Trade Analysis */}
        <div className="metrics-section">
          <h4 className="section-title">Trade Analysis</h4>
          <div className="metrics-row">
            <div className="advanced-metric-item">
              <span className="metric-label">Avg Winning Trade</span>
              <span className="metric-value positive">{advancedMetrics.averageWinningTrade}</span>
            </div>
            <div className="advanced-metric-item">
              <span className="metric-label">Avg Losing Trade</span>
              <span className="metric-value negative">{advancedMetrics.averageLosingTrade}</span>
            </div>
            <div className="advanced-metric-item">
              <span className="metric-label">Largest Win</span>
              <span className="metric-value positive">{advancedMetrics.largestWinningTrade}</span>
            </div>
          </div>
        </div>


        {/* 🟣 Market Performance */}

      </div>

      <button 
        className="dialog-close-btn"
        onClick={() => setShowMetricsDialog(false)}
      >
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default TraderProfile;