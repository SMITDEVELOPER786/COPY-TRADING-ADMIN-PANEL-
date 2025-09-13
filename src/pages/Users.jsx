import React from "react";
import "../Users.css";
import UserCharts from "../components/UserCharts";
import { FaEnvelope, FaBan, FaSnowflake, FaTrash, FaIdCard, FaPhone } from "react-icons/fa";

const Users = () => {
  return (
    <div className="app">
      <main className="main-content">
        {/* ---------- PAGE TITLE ---------- */}
        <h2 className="page-title">
          Users <span className="sub-title">› User Details</span>
        </h2>

        {/* ---------- USER CARD + DETAILS ---------- */}
        <div className="user-info">
          <div className="user-card">
            <img
              src="https://randomuser.me/api/portraits/women/65.jpg"
              alt="User Avatar"
              className="avatar"
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

          {/* ---------- USER DETAILS ---------- */}
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

        {/* ---------- WRAPPED SECTIONS ---------- */}
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
              Momentum based Swing trader focusing on major currency pairs during
              high volatility periods. Strategy involves capturing short- to
              medium-term gains during high volatility periods.
            </p>
          </div>

          <h3>Performance Metrics</h3>
          <div className="metrics-grid">
            <p>Win Rate <span className="green">78%</span></p>
            <p>Profit Factor <span>2.14</span></p>
            <p>Sharpe Ratio <span>1.67</span></p>
            <p>ROI <span className="green">+42.8%</span></p>
            <p>Max Drawdown <span className="red">-8.2%</span></p>
            <p>Total Trades <span>127</span></p>
            <p>Avg Win <span className="green">$285.5</span></p>
            <p>Avg Loss <span className="red">$142.3</span></p>
            <p>Best Trade <span className="green">1250.4</span></p>
            <p>Worst Trade <span className="red">890</span></p>
            <p>Risk Reward <span>2.3:1</span></p>
          </div>

          <div className="charts-sections">
            <div className="chart-boxs">
              <h3>Equity Graph</h3>
              <UserCharts type="equity" />
            </div>
            <div className="chart-boxs">
              <h3>Monthly Performance Trends</h3>
              <UserCharts type="performance" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Users;
