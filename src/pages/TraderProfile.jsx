"use client";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ChevronLeft,
  Phone,
  FileText,
  TrendingUp,
  Target,
  BarChart3,
  DollarSign,
  Calendar,
  Award,
  X,
  Activity,
} from "lucide-react";
import "../TraderProfile.css";
import { FaBan, FaEnvelope, FaSnowflake, FaTrash, FaEdit } from "react-icons/fa";

const TraderProfile = ({ user }) => {
  const navigate = useNavigate();
  const [showMetricsDialog, setShowMetricsDialog] = useState(false);

  const advancedMetricsMain = {
    totalTrades: "1,247",
    avgReturn: "+24.8%",
    maxDrawdown: "-8.2%",
    sharpeRatio: "2.34",
    expectancy: "0.68",
    rrRatio: "2:1",
    tradeFrequency: "12 days",
    avgDuration: "2.3 days",
    slTpHitRatio: "65/35",
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
    beta: "0.87%",
    alpha: "8.2%",
    informationRatio: "1.34",
    treynorRatio: "18.5",
    trackingError: "4.2%",
    valueAtRisk: "2.1%",
  };

  const advancedMetricsDialog = {
    equity: 3.88,
    margin: 0,
    freeMargin: 3.88,
    profit: -393.09,
    trades: 7,
    balance: 3.88,
    highestBalance: 396.97,
    highestBalanceDate: "2024-11-07 15:02:39.905",
    wonTradesPercent: 14.285714285714285,
    lostTradesPercent: 85.71428571428571,
    wonTrades: 1,
    lostTrades: 6,
    averageWin: 5.8,
    averageLoss: -66.48166666666665,
    pips: -393.0899999999999,
    averageWinPips: 5.8,
    averageLossPips: -66.48166666666665,
    bestTrade: 5.8,
    bestTradeDate: "2024-11-12 15:41:49.642",
    worstTrade: -269,
    worstTradeDate: "2024-11-08 13:54:45.334",
    bestTradePips: 5.8,
    bestTradePipsDate: "2024-11-12 15:41:49.642",
    worstTradePips: -269,
    worstTradePipsDate: "2024-11-08 13:54:45.334",
    tradingStartBrokerTime: "2024-11-08 12:22:23.587",
    cagr: -99.02259616595711,
    longWonTrades: 1,
    longTrades: 6,
    shortTrades: 1,
    longWonTradesPercent: 16.666666666666664,
    dailyGain: -5.492384429714137,
    monthlyGain: -82.04477285108788,
    daysSinceTradingStarted: 82.27277336805555,
    equityPercent: 100,
    expectancy: -56.15571428571427,
    expectancyPips: -56.15571428571427,
    averageTradeLengthInMilliseconds: 7423064,
    lots: 0.5700000000000001,
  };

  if (!user) {
    return <p style={{ padding: "20px" }}>Trader not found</p>;
  }

  const defaultWallet = Math.floor(1000000000 + Math.random() * 9000000000).toString();
  const defaultEmail = user.name ? user.name.replace(/\s/g, "").toLowerCase() + "@gmail.com" : "unknowntrader@gmail.com";
  const defaultBroker = Math.floor(Math.random() * 100) + 1;
  const defaultJoined = new Date(
    Date.now() - Math.floor(Math.random() * 5 * 365 * 24 * 60 * 60 * 1000)
  ).toLocaleDateString();

  return (
    <div className="trader-profile-container">
      <div className="profile-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={18} /> Back
        </button>
        <div className="header-title">
          <h2 className="pagee-titlees">
            Traders <span className="subb-titlees">› Trader Details</span>
          </h2>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-main">
          <div className="profile-card">
            <div className="profile-top">
              <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="profile-avatar" />
              <div className="profile-details">
                <h2 className="trader-name">{user.name}</h2>
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
                  <button className="action-btn green">
                    <FaEnvelope /> Send Email
                  </button>
                  <button className="action-btn orange">
                    <FaBan /> Deactivate
                  </button>
                  <button className="action-btn red">
                    <FaSnowflake /> Freeze
                  </button>
                  <button className="action-btn red">
                    <FaTrash /> Delete
                  </button>
                  <button className="action-btn outline">
                    <FaEdit /> Edit
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
                  <span className="stat-numbers">12</span>
                  <span className="stat-labels">Investors</span>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <DollarSign size={20} />
                </div>
                <div className="stat-content">
                  <span className="stat-numbers">{user.portfolio}</span>
                  <span className="stat-labels">Net Profit</span>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <BarChart3 size={20} />
                </div>
                <div className="stat-content">
                  <span className="stat-numbers">87.5%</span>
                  <span className="stat-labels">Win Rate</span>
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
                  <span className="metric-value">{advancedMetricsMain.totalTrades}</span>
                </div>
                <div className="metric-item">
                  <span className="metric-label">Avg. Return</span>
                  <span className="metric-value positive">{advancedMetricsMain.avgReturn}</span>
                </div>
                <div className="metric-item">
                  <span className="metric-label">Max Drawdown</span>
                  <span className="metric-value negative">{advancedMetricsMain.maxDrawdown}</span>
                </div>
              </div>
            </div>

            <div className="advanced-metrics">
              <div className="advanced-metrics-grid">
                <div className="metrics-section">
                  <h4 className="section-title">Risk-Adjusted Metrics</h4>
                  <div className="metrics-row">
                    <div className="advanced-metric-item">
                      <span className="metric-label">Sharpe Ratio</span>
                      <span className="metric-value">{advancedMetricsMain.sharpeRatio}</span>
                    </div>
                    <div className="advanced-metric-item">
                      <span className="metric-label">Expectancy</span>
                      <span className="metric-value">{advancedMetricsMain.expectancy}</span>
                    </div>
                    <div className="advanced-metric-item">
                      <span className="metric-label">R:R Ratio</span>
                      <span className="metric-value">{advancedMetricsMain.rrRatio}</span>
                    </div>
                    <div className="advanced-metric-item">
                      <span className="metric-label">Profit Factor</span>
                      <span className="metric-value">{advancedMetricsMain.profitFactor}</span>
                    </div>
                    <div className="advanced-metric-item">
                      <span className="metric-label">Calmar Ratio</span>
                      <span className="metric-value">{advancedMetricsMain.calmarRatio}</span>
                    </div>
                    <div className="advanced-metric-item">
                      <span className="metric-label">Sortino Ratio</span>
                      <span className="metric-value">{advancedMetricsMain.sortinoRatio}</span>
                    </div>
                  </div>
                </div>

                <div className="metrics-section">
                  <h4 className="section-title">Trade Performance</h4>
                  <div className="metrics-row">
                    <div className="advanced-metric-item">
                      <span className="metric-label">Trade Frequency</span>
                      <span className="metric-value">{advancedMetricsMain.tradeFrequency}</span>
                    </div>
                    <div className="advanced-metric-item">
                      <span className="metric-label">Avg Duration</span>
                      <span className="metric-value">{advancedMetricsMain.avgDuration}</span>
                    </div>
                    <div className="advanced-metric-item">
                      <span className="metric-label">SL/TP Hit Ratio</span>
                      <span className="metric-value">{advancedMetricsMain.slTpHitRatio}</span>
                    </div>
                    <div className="advanced-metric-item">
                      <span className="metric-label">Max Consecutive Wins</span>
                      <span className="metric-value positive">{advancedMetricsMain.maxConsecutiveWins}</span>
                    </div>
                    <div className="advanced-metric-item">
                      <span className="metric-label">Max Consecutive Losses</span>
                      <span className="metric-value negative">{advancedMetricsMain.maxConsecutiveLosses}</span>
                    </div>
                    <div className="advanced-metric-item">
                      <span className="metric-label">Total Trading Days</span>
                      <span className="metric-value">{advancedMetricsMain.totalTradingDays}</span>
                    </div>
                  </div>
                </div>

                <div className="metrics-section">
                  <h4 className="section-title">Trade Outcomes</h4>
                  <div className="metrics-row">
                    <div className="advanced-metric-item">
                      <span className="metric-label">Average Winning Trade</span>
                      <span className="metric-value positive">{advancedMetricsMain.averageWinningTrade}</span>
                    </div>
                    <div className="advanced-metric-item">
                      <span className="metric-label">Average Losing Trade</span>
                      <span className="metric-value negative">{advancedMetricsMain.averageLosingTrade}</span>
                    </div>
                    <div className="advanced-metric-item">
                      <span className="metric-label">Largest Winning Trade</span>
                      <span className="metric-value positive">{advancedMetricsMain.largestWinningTrade}</span>
                    </div>
                    <div className="advanced-metric-item">
                      <span className="metric-label">Largest Losing Trade</span>
                      <span className="metric-value negative">{advancedMetricsMain.largestLosingTrade}</span>
                    </div>
                    <div className="advanced-metric-item">
                      <span className="metric-label">Profitable Days</span>
                      <span className="metric-value">{advancedMetricsMain.profitableDays}</span>
                    </div>
                    <div className="advanced-metric-item">
                      <span className="metric-label">Unprofitable Days</span>
                      <span className="metric-value">{advancedMetricsMain.unprofitableDays}</span>
                    </div>
                  </div>
                </div>

                <div className="metrics-section">
                  <h4 className="section-title">Market Metrics</h4>
                  <div className="metrics-row">
                    <div className="advanced-metric-item">
                      <span className="metric-label">Avg Daily Return</span>
                      <span className="metric-value">{advancedMetricsMain.avgDailyReturn}</span>
                    </div>
                    <div className="advanced-metric-item">
                      <span className="metric-label">Volatility</span>
                      <span className="metric-value">{advancedMetricsMain.volatility}</span>
                    </div>
                    <div className="advanced-metric-item">
                      <span className="metric-label">Beta</span>
                      <span className="metric-value">{advancedMetricsMain.beta}</span>
                    </div>
                    <div className="advanced-metric-item">
                      <span className="metric-label">Alpha</span>
                      <span className="metric-value">{advancedMetricsMain.alpha}</span>
                    </div>
                    <div className="advanced-metric-item">
                      <span className="metric-label">Information Ratio</span>
                      <span className="metric-value">{advancedMetricsMain.informationRatio}</span>
                    </div>
                    <div className="advanced-metric-item">
                      <span className="metric-label">Treynor Ratio</span>
                      <span className="metric-value">{advancedMetricsMain.treynorRatio}</span>
                    </div>
                  </div>
                </div>

                <div className="metrics-section">
                  <h4 className="section-title">Risk Metrics</h4>
                  <div className="metrics-row">
                    <div className="advanced-metric-item">
                      <span className="metric-label">Tracking Error</span>
                      <span className="metric-value">{advancedMetricsMain.trackingError}</span>
                    </div>
                    <div className="advanced-metric-item">
                      <span className="metric-label">Value at Risk</span>
                      <span className="metric-value">{advancedMetricsMain.valueAtRisk}</span>
                    </div>
                    <div className="advanced-metric-item">
                      <span className="metric-label">Max Drawdown</span>
                      <span className="metric-value negative">{advancedMetricsMain.maxDrawdown}</span>
                    </div>
                    <div className="advanced-metric-item">
                      <span className="metric-label">Avg. Return</span>
                      <span className="metric-value positive">{advancedMetricsMain.avgReturn}</span>
                    </div>
                  </div>
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
              <p>
                Advanced momentum trading with strict risk management protocols. Specializes in swing trading with focus
                on high-growth tech stocks and major cryptocurrency pairs. Uses technical analysis combined with
                fundamental research for entry and exit points.
              </p>
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
                <span className="info-value">{user.email || defaultEmail}</span>
              </div>
              <div className="info-item">
                <span className="info-label">User Type:</span>
                <span className="info-value">{user.userType}</span>
              </div>
            </div>

            <div className="info-group">
              <div className="info-item">
                <span className="info-label">Wallet ID:</span>
                <span className="info-value wallet-id">{user.wallet || defaultWallet}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Market:</span>
                <span className="info-value">{user.market || "-"}</span>
              </div>
            </div>

            <div className="info-group">
              <div className="info-item">
                <span className="info-label">Broker:</span>
                <span className="info-value">{user.broker || defaultBroker}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Joined:</span>
                <span className="info-value">{user.joined || defaultJoined}</span>
              </div>
            </div>

            <div className="sidebar-actions">
              <button className="btn-kyc">
                <FileText size={16} /> View KYC
              </button>
              <button className="btn-contact">
                <Phone size={16} /> Contact Info
              </button>
            </div>
          </div>
        </div>
      </div>

      {showMetricsDialog && (
        <div className="metrics-dialog-overlay" onClick={() => setShowMetricsDialog(false)}>
          <div className="metrics-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-header">
              <h3 className="dialog-title">Trading Metrics</h3>
              <button className="dialog-close-icon" onClick={() => setShowMetricsDialog(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="advanced-metrics-grid">
              <div className="metrics-section">
                <h4 className="section-title">Trading Metrics</h4>
                <div className="metrics-row">
                  <div className="advanced-metric-item">
                    <span className="metric-label">Equity</span>
                    <span className="metric-value">{advancedMetricsDialog.equity.toFixed(2)}</span>
                  </div>
                  <div className="advanced-metric-item">
                    <span className="metric-label">Margin</span>
                    <span className="metric-value">{advancedMetricsDialog.margin.toFixed(2)}</span>
                  </div>
                  <div className="advanced-metric-item">
                    <span className="metric-label">Free Margin</span>
                    <span className="metric-value">{advancedMetricsDialog.freeMargin.toFixed(2)}</span>
                  </div>
                  <div className="advanced-metric-item">
                    <span className="metric-label">Profit</span>
                    <span className={`metric-value ${advancedMetricsDialog.profit >= 0 ? "positive" : "negative"}`}>
                      {advancedMetricsDialog.profit.toFixed(2)}
                    </span>
                  </div>
                  <div className="advanced-metric-item">
                    <span className="metric-label">Balance</span>
                    <span className="metric-value">{advancedMetricsDialog.balance.toFixed(2)}</span>
                  </div>
                  <div className="advanced-metric-item">
                    <span className="metric-label">Highest Balance</span>
                    <span className="metric-value">{advancedMetricsDialog.highestBalance.toFixed(2)}</span>
                  </div>
                  <div className="advanced-metric-item">
                    <span className="metric-label">Highest Balance Date</span>
                    <span className="metric-value">{advancedMetricsDialog.highestBalanceDate}</span>
                  </div>
                </div>
              </div>

              <div className="metrics-section">
                <h4 className="section-title">Trading Performance</h4>
                <div className="metrics-row">
                  <div className="advanced-metric-item">
                    <span className="metric-label">Total Trades</span>
                    <span className="metric-value">{advancedMetricsDialog.trades}</span>
                  </div>
                  <div className="advanced-metric-item">
                    <span className="metric-label">Won Trades %</span>
                    <span className="metric-value positive">{advancedMetricsDialog.wonTradesPercent.toFixed(2)}%</span>
                  </div>
                  <div className="advanced-metric-item">
                    <span className="metric-label">Lost Trades %</span>
                    <span className="metric-value negative">{advancedMetricsDialog.lostTradesPercent.toFixed(2)}%</span>
                  </div>
                  <div className="advanced-metric-item">
                    <span className="metric-label">Won Trades</span>
                    <span className="metric-value">{advancedMetricsDialog.wonTrades}</span>
                  </div>
                  <div className="advanced-metric-item">
                    <span className="metric-label">Lost Trades</span>
                    <span className="metric-value">{advancedMetricsDialog.lostTrades}</span>
                  </div>
                  <div className="advanced-metric-item">
                    <span className="metric-label">Daily Gain</span>
                    <span className={`metric-value ${advancedMetricsDialog.dailyGain >= 0 ? "positive" : "negative"}`}>
                      {advancedMetricsDialog.dailyGain.toFixed(2)}%
                    </span>
                  </div>
                  <div className="advanced-metric-item">
                    <span className="metric-label">Monthly Gain</span>
                    <span
                      className={`metric-value ${advancedMetricsDialog.monthlyGain >= 0 ? "positive" : "negative"}`}
                    >
                      {advancedMetricsDialog.monthlyGain.toFixed(2)}%
                    </span>
                  </div>
                  <div className="advanced-metric-item">
                    <span className="metric-label">CAGR</span>
                    <span className={`metric-value ${advancedMetricsDialog.cagr >= 0 ? "positive" : "negative"}`}>
                      {advancedMetricsDialog.cagr.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="metrics-section">
                <h4 className="section-title">Trade Analysis</h4>
                <div className="metrics-row">
                  <div className="advanced-metric-item">
                    <span className="metric-label">Average Win</span>
                    <span className="metric-value positive">{advancedMetricsDialog.averageWin.toFixed(2)}</span>
                  </div>
                  <div className="advanced-metric-item">
                    <span className="metric-label">Average Loss</span>
                    <span className="metric-value negative">{advancedMetricsDialog.averageLoss.toFixed(2)}</span>
                  </div>
                  <div className="advanced-metric-item">
                    <span className="metric-label">Best Trade</span>
                    <span className="metric-value positive">{advancedMetricsDialog.bestTrade.toFixed(2)}</span>
                  </div>
                  <div className="advanced-metric-item">
                    <span className="metric-label">Best Trade Date</span>
                    <span className="metric-value">{advancedMetricsDialog.bestTradeDate}</span>
                  </div>
                  <div className="advanced-metric-item">
                    <span className="metric-label">Worst Trade</span>
                    <span className="metric-value negative">{advancedMetricsDialog.worstTrade.toFixed(2)}</span>
                  </div>
                  <div className="advanced-metric-item">
                    <span className="metric-label">Worst Trade Date</span>
                    <span className="metric-value">{advancedMetricsDialog.worstTradeDate}</span>
                  </div>
                </div>
              </div>

              <div className="metrics-section">
                <h4 className="section-title">Pips Analysis</h4>
                <div className="metrics-row">
                  <div className="advanced-metric-item">
                    <span className="metric-label">Pips</span>
                    <span className={`metric-value ${advancedMetricsDialog.pips >= 0 ? "positive" : "negative"}`}>
                      {advancedMetricsDialog.pips.toFixed(2)}
                    </span>
                  </div>
                  <div className="advanced-metric-item">
                    <span className="metric-label">Average Win Pips</span>
                    <span className="metric-value positive">{advancedMetricsDialog.averageWinPips.toFixed(2)}</span>
                  </div>
                  <div className="advanced-metric-item">
                    <span className="metric-label">Average Loss Pips</span>
                    <span className="metric-value negative">{advancedMetricsDialog.averageLossPips.toFixed(2)}</span>
                  </div>
                  <div className="advanced-metric-item">
                    <span className="metric-label">Best Trade Pips</span>
                    <span className="metric-value positive">{advancedMetricsDialog.bestTradePips.toFixed(2)}</span>
                  </div>
                  <div className="advanced-metric-item">
                    <span className="metric-label">Best Trade Pips Date</span>
                    <span className="metric-value">{advancedMetricsDialog.bestTradePipsDate}</span>
                  </div>
                  <div className="advanced-metric-item">
                    <span className="metric-label">Worst Trade Pips</span>
                    <span className="metric-value negative">{advancedMetricsDialog.worstTradePips.toFixed(2)}</span>
                  </div>
                  <div className="advanced-metric-item">
                    <span className="metric-label">Worst Trade Pips Date</span>
                    <span className="metric-value">{advancedMetricsDialog.worstTradePipsDate}</span>
                  </div>
                </div>
              </div>

              <div className="metrics-section">
                <h4 className="section-title">Trading Statistics</h4>
                <div className="metrics-row">
                  <div className="advanced-metric-item">
                    <span className="metric-label">Long Won Trades</span>
                    <span className="metric-value">{advancedMetricsDialog.longWonTrades}</span>
                  </div>
                  <div className="advanced-metric-item">
                    <span className="metric-label">Long Trades</span>
                    <span className="metric-value">{advancedMetricsDialog.longTrades}</span>
                  </div>
                  <div className="advanced-metric-item">
                    <span className="metric-label">Short Trades</span>
                    <span className="metric-value">{advancedMetricsDialog.shortTrades}</span>
                  </div>
                  <div className="advanced-metric-item">
                    <span className="metric-label">Long Won Trades %</span>
                    <span className="metric-value positive">
                      {advancedMetricsDialog.longWonTradesPercent.toFixed(2)}%
                    </span>
                  </div>
                  <div className="advanced-metric-item">
                    <span className="metric-label">Days Since Trading Started</span>
                    <span className="metric-value">{advancedMetricsDialog.daysSinceTradingStarted.toFixed(2)}</span>
                  </div>
                  <div className="advanced-metric-item">
                    <span className="metric-label">Equity %</span>
                    <span className="metric-value">{advancedMetricsDialog.equityPercent.toFixed(2)}%</span>
                  </div>
                  <div className="advanced-metric-item">
                    <span className="metric-label">Expectancy</span>
                    <span className={`metric-value ${advancedMetricsDialog.expectancy >= 0 ? "positive" : "negative"}`}>
                      {advancedMetricsDialog.expectancy.toFixed(2)}
                    </span>
                  </div>
                  <div className="advanced-metric-item">
                    <span className="metric-label">Expectancy Pips</span>
                    <span
                      className={`metric-value ${advancedMetricsDialog.expectancyPips >= 0 ? "positive" : "negative"}`}
                    >
                      {advancedMetricsDialog.expectancyPips.toFixed(2)}
                    </span>
                  </div>
                  <div className="advanced-metric-item">
                    <span className="metric-label">Average Trade Length (Hours)</span>
                    <span className="metric-value">
                      {(advancedMetricsDialog.averageTradeLengthInMilliseconds / (1000 * 60 * 60)).toFixed(2)}
                    </span>
                  </div>
                  <div className="advanced-metric-item">
                    <span className="metric-label">Lots</span>
                    <span className="metric-value">{advancedMetricsDialog.lots.toFixed(2)}</span>
                  </div>
                  <div className="advanced-metric-item">
                    <span className="metric-label">Trading Start Time</span>
                    <span className="metric-value">{advancedMetricsDialog.tradingStartBrokerTime}</span>
                  </div>
                </div>
              </div>
            </div>

            <button className="dialog-close-btn" onClick={() => setShowMetricsDialog(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TraderProfile;