import React, { useState } from 'react';
import '../Charts.css';

const Charts = () => {
  const [activeTab, setActiveTab] = useState('Users');
  
  const barData = [
    { month: 'Jan', value: 58 },
    { month: 'Feb', value: 85 },
    { month: 'Mar', value: 72 },
    { month: 'Apr', value: 92 },
    { month: 'May', value: 68 },
    { month: 'Jun', value: 85 },
    { month: 'Jul', value: 78 },
    { month: 'Aug', value: 65 },
    { month: 'Sep', value: 58 },
    { month: 'Oct', value: 85 },
    { month: 'Nov', value: 75 },
    { month: 'Dec', value: 82 }
  ];

  const maxValue = Math.max(...barData.map(d => d.value));

  return (
    <div className="charts-section">
      <div className="chart-card">
        <div className="chart-header">
          <div className="chart-tabs">
            {['Investments', 'Users', 'Revenue'].map((tab) => (
              <button
                key={tab}
                className={`chart-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        <div className="chart-stats">
          <h3 className="chart-value">8,500</h3>
          <span className="chart-growth">+40%</span>
        </div>

        <div className="bar-chart">
          {barData.map((data, index) => (
            <div key={index} className="bar-container">
              <div 
                className="bar" 
                style={{ height: `${(data.value / maxValue) * 100}%` }}
              ></div>
              <span className="bar-label">{data.month}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="revenue-section">
        <div className="revenue-card">
          <h2 className="revenue-value">$8,500,100</h2>
          <p className="revenue-label">Total Revenue</p>
          <div className="revenue-growth">
            <span>↗ 40% vs Last Month</span>
          </div>
        </div>

        <div className="pie-chart-card">
          <div className="pie-chart">
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="20"
                strokeDasharray="125.66 188.5"
                strokeDashoffset="0"
                transform="rotate(-90 60 60)"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#10b981"
                strokeWidth="20"
                strokeDasharray="94.25 188.5"
                strokeDashoffset="-125.66"
                transform="rotate(-90 60 60)"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="20"
                strokeDasharray="62.83 188.5"
                strokeDashoffset="-219.91"
                transform="rotate(-90 60 60)"
              />
            </svg>
          </div>
          <div className="pie-legend">
            <div className="legend-item">
              <div className="legend-color investor"></div>
              <span>Investor</span>
            </div>
            <div className="legend-item">
              <div className="legend-color trader"></div>
              <span>Trader</span>
            </div>
            <div className="legend-item">
              <div className="legend-color company"></div>
              <span>Company</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;