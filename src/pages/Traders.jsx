import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  User, 
  UserCheck, 
  MessageCircle, 
  FileText, 
  Shield, 
  Settings, 
  LogOut,
  Search,
  Calendar,
  ChevronDown,
  MoreHorizontal
} from 'lucide-react';
import '../Traders.css';

function Traders() {
  const [activeTab, setActiveTab] = useState('30 Days');
  const [roiTab, setRoiTab] = useState('Average ROI');




  const metricCards = [
    { title: 'Total Trader', value: '12,500', change: '+12%', positive: true },
    { title: 'Amount Invested', value: '$1.4M', change: '+12%', positive: true },
    { title: 'Total Profit', value: '$800k', change: '+12%', positive: true },
    { title: 'Total Loss', value: '$120k', change: '2%', positive: false }
  ];

  const traders = [
    { 
      name: 'Maria Khan', 
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400', 
      amountSecured: '$750k', 
      netProfit: '240k', 
      avgROI: '45.7%', 
      avgDrawdown: '2.4%', 
      tag: 'Profitable',
      tagColor: 'green'
    },
    { 
      name: 'Maria Khan', 
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400', 
      amountSecured: '$750k', 
      netProfit: '240k', 
      avgROI: '45.7%', 
      avgDrawdown: '2.4%', 
      tag: 'Average',
      tagColor: 'orange'
    },
    { 
      name: 'Maria Khan', 
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400', 
      amountSecured: '$750k', 
      netProfit: '240k', 
      avgROI: '45.7%', 
      avgDrawdown: '2.4%', 
      tag: 'Unprofitable',
      tagColor: 'red'
    }
  ];

  return (
    <div className="dashboard">


      {/* Main Content */}
      <div className="main-content">
      <div className="content-header">
  <h1>Traders</h1>
  <div className="time-filters">
    {['Months', '30 Days', '7 Days', '24 Hour'].map((period) => (
      <button 
        key={period}
        className={`time-filter ${activeTab === period ? 'active' : ''}`}
        onClick={() => setActiveTab(period)}
      >
        {period}
      </button>
    ))}
  </div>
</div>


        {/* Metric Cards */}
        <div className="metrics-grid">
          {metricCards.map((card, index) => (
            <div key={index} className="metric-card">
              <div className="metric-header">
                <span className="metric-title">{card.title}</span>
                <div className="mini-chart">
                  <svg width="60" height="30">
                    <polyline 
                      points="0,25 15,20 30,15 45,10 60,5" 
                      fill="none" 
                      stroke={card.positive ? "#10B981" : "#EF4444"} 
                      strokeWidth="2"
                    />
                    {[0, 15, 30, 45, 60].map((x, i) => (
                      <circle 
                        key={i} 
                        cx={x} 
                        cy={25 - i * 5} 
                        r="2" 
                        fill={card.positive ? "#10B981" : "#EF4444"} 
                      />
                    ))}
                  </svg>
                </div>
              </div>
              <div className="metric-value">{card.value}</div>
              <div className={`metric-change ${card.positive ? 'positive' : 'negative'}`}>
                {card.change}
              </div>
            </div>
          ))}
        </div>

        {/* ROI Section */}
        <div className="roi-section">
          <div className="roi-header">
            <div className="roi-tabs">
              <button 
                className={`roi-tab ${roiTab === 'Average ROI' ? 'active' : ''}`}
                onClick={() => setRoiTab('Average ROI')}
              >
                Average ROI
              </button>
              <button 
                className={`roi-tab ${roiTab === 'Average Downtime' ? 'active' : ''}`}
                onClick={() => setRoiTab('Average Downtime')}
              >
                Average Downtime
              </button>
            </div>
            <button className="date-selector">
              <Calendar size={16} />
              Select Date
            </button>
          </div>

          <div className="roi-value">
            <span className="roi-amount">$2,820</span>
            <div className="roi-change">
              <span className="roi-percentage">+40%</span>
              <span className="roi-absolute">+$5000</span>
            </div>
          </div>

          {/* Chart */}
          <div className="chart-container">
            <div className="chart-y-axis">
              <span>12500</span>
              <span>10000</span>
              <span>7500</span>
              <span>5000</span>
              <span>2500</span>
              <span>0</span>
            </div>
            <div className="chart-area">
              <svg width="100%" height="200">
                <polyline 
                  points="0,150 50,120 100,100 150,80 200,60 250,90 300,120 350,140 400,100 450,90 500,80 550,60 600,40" 
                  fill="none" 
                  stroke="#10B981" 
                  strokeWidth="3"
                />
                {[0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600].map((x, i) => {
                  const heights = [150, 120, 100, 80, 60, 90, 120, 140, 100, 90, 80, 60, 40];
                  return (
                    <circle 
                      key={i} 
                      cx={x} 
                      cy={heights[i]} 
                      r="4" 
                      fill="#10B981" 
                    />
                  );
                })}
              </svg>
              <div className="chart-x-axis">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
                  <span key={month}>{month}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Traders Table */}
        <div className="traders-section">
          <h2>Traders</h2>
          
          <div className="table-controls">
            <div className="search-container">
              <Search size={20} />
              <input type="text" placeholder="Search Traders" />
            </div>
            
            <div className="filters">
              <button className="filter-btn">
                All Type <ChevronDown size={16} />
              </button>
              <button className="filter-btn">
                Amount Secured <ChevronDown size={16} />
              </button>
              <button className="filter-btn">
                Filter by <ChevronDown size={16} />
              </button>
            </div>
          </div>

          <div className="table-container">
            <table className="traders-table">
              <thead>
                <tr>
                  <th>Trader Name</th>
                  <th>Amount Secured</th>
                  <th>Net Profit</th>
                  <th>Avg ROI</th>
                  <th>Avg Drawdown</th>
                  <th>Tag</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {traders.map((trader, index) => (
                  <tr key={index}>
                    <td>
                    <div className="trader-info">
                      <img src={trader.avatar} alt={trader.name} className="user-avatar" />
                      <span>{trader.name}</span>
                      </div>
                    </td>
                    <td>{trader.amountSecured}</td>
                    <td>{trader.netProfit}</td>
                    <td>{trader.avgROI}</td>
                    <td>{trader.avgDrawdown}</td>
                    <td>
                      <span className={`tag tag-${trader.tagColor}`}>
                        {trader.tag}
                      </span>
                    </td>
                    <td>
                      <button className="more-btn">
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Traders;