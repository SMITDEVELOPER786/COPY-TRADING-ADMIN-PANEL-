import React, { useState, useEffect } from 'react';
import { 
  Search,
  Calendar,
  ChevronDown,
  MoreHorizontal
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import '../Traders.css';
import { useNavigate } from 'react-router-dom';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Traders() {
  const [activeTab, setActiveTab] = useState('30 Days');
  const [roiTab, setRoiTab] = useState('Average ROI');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [menuOpen, setMenuOpen] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState(null);
  const navigate = useNavigate();

  const handleViewProfile = (id) => {
    navigate(`/profile/${id}`); // Updated to match DataTable and Users routing
  };

  const [traders, setTraders] = useState(() => {
    const savedData = localStorage.getItem('tradersData');
    try {
      const parsedData = savedData ? JSON.parse(savedData) : null;
      if (parsedData && Array.isArray(parsedData)) {
        return parsedData;
      }
      return defaultTraders();
    } catch {
      return defaultTraders();
    }
  });

  useEffect(() => {
    localStorage.setItem('tradersData', JSON.stringify(traders));
  }, [traders]);

  const handleStatusChange = (id, newStatus, newTagColor) => {
    setTraders(prev =>
      prev.map(trader =>
        trader.id === id ? { ...trader, tag: newStatus, tagColor: newTagColor } : trader
      )
    );
    setMenuOpen(null);
  };

  const filteredTraders = traders.filter(trader =>
    trader.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedStatus === '' || trader.tag === selectedStatus) &&
    (selectedDate === '' || trader.date.toLowerCase().includes(selectedDate.toLowerCase()))
  );

  const calculateMetrics = () => {
    const totalTraders = filteredTraders.length;
    const totalAmountSecured = filteredTraders.reduce((sum, trader) => {
      const amount = parseFloat(trader.amountSecured.replace('$', '').replace('k', '')) * 1000;
      return sum + amount;
    }, 0);
    const totalProfit = filteredTraders.reduce((sum, trader) => {
      const profit = parseFloat(trader.netProfit.replace('k', '')) * 1000;
      return sum + profit;
    }, 0);
    const totalLoss = filteredTraders.reduce((sum, trader) => {
      const loss = parseFloat(trader.avgDrawdown.replace('%', '')) * parseFloat(trader.amountSecured.replace('$', '').replace('k', '')) * 10;
      return sum + loss;
    }, 0);

    return [
      { title: 'Total Trader', value: totalTraders.toLocaleString(), change: '+12%', positive: true },
      { title: 'Amount Invested', value: `$${Math.round(totalAmountSecured / 1000)}k`, change: '+12%', positive: true },
      { title: 'Total Profit', value: `$${Math.round(totalProfit / 1000)}k`, change: '+12%', positive: true },
      { title: 'Total Loss', value: `$${Math.round(totalLoss / 1000)}k`, change: '2%', positive: false }
    ];
  };

  const metricCards = selectedMetric ? calculateMetrics().filter(card => card.title === selectedMetric) : calculateMetrics();

  const chartData = {
    labels: ['Jan 2025', 'Feb 2025', 'Mar 2025', 'Apr 2025', 'May 2025', 'Jun 2025', 'Jul 2025', 'Aug 2025', 'Sep 2025', 'Oct 2025', 'Nov 2025', 'Dec 2025'],
    datasets: [
      {
        label: roiTab,
        data: roiTab === 'Average ROI'
          ? [45.7, 30.2, 15.5, 20, 25, 35, 40, 50, 45, 30, 20, 10]
          : [2.4, 3.1, 5.0, 4.0, 3.5, 2.8, 2.0, 1.5, 2.2, 3.0, 4.5, 5.5],
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: '#10B981',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#10B981',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: roiTab === 'Average ROI' ? 'ROI (%)' : 'Drawdown (%)',
          color: '#6b7280',
          font: { size: 12 }
        },
        ticks: {
          color: '#9ca3af',
          font: { size: 12 }
        },
        grid: { color: '#e5e7eb' }
      },
      x: {
        title: {
          display: true,
          text: 'Month',
          color: '#6b7280',
          font: { size: 12 }
        },
        ticks: {
          color: '#9ca3af',
          font: { size: 12 },
          maxRotation: 45,
          minRotation: 45
        },
        grid: { display: false }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: { color: '#6b7280', font: { size: 12 } }
      },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#1f2937',
        bodyColor: '#1f2937',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        cornerRadius: 4
      }
    }
  };

  return (
    <div className="app-container">
      <div className="app-main">
        {/* Header */}
        <div className="header-section">
          <h2 className="page-titlees">
            Dashboard <span className="sub-titlees">› Traders</span>
          </h2>
          <div className="times-filters">
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
        <div className="metrics-container">
          {metricCards.map((card, index) => (
            <div 
              key={index} 
              className="metric-box"
              onClick={() => setSelectedMetric(selectedMetric === card.title ? null : card.title)}
              style={{ cursor: 'pointer' }}
            >
              <div className="metric-box-header">
                <span className="metric-box-title">{card.title}</span>
                <div className="metric-mini-chart">
                  <svg width="60" height="30">
                    <polyline 
                      points="0,25 15,20 30,15 45,10 60,5" 
                      fill="none" 
                      stroke={card.positive ? "#10B981" : "#EF4444"} 
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
              <div className="metric-box-value">{card.value}</div>
              <div className={`metric-box-change ${card.positive ? 'positive' : 'negative'}`}>
                {card.change}
              </div>
            </div>
          ))}
        </div>

        {/* ROI Panel */}
        <div className="roi-panel">
          <div className="roi-panel-header">
            <div className="roi-tab-group">
              <button 
                className={`roi-tab-item ${roiTab === 'Average ROI' ? 'active' : ''}`}
                onClick={() => setRoiTab('Average ROI')}
              >
                Average ROI
              </button>
              <button 
                className={`roi-tab-item ${roiTab === 'Average Downtime' ? 'active' : ''}`}
                onClick={() => setRoiTab('Average Downtime')}
              >
                Average Downtime
              </button>
            </div>
            <button className="date-picker">
              <Calendar size={16} />
              Select Date
            </button>
          </div>

          <div className="roi-panel-value">
            <span className="roi-amount-display">$2,820</span>
            <div className="roi-change-display">
              <span className="roi-percentage-display">+40%</span>
              <span className="roi-absolute-display">+$5000</span>
            </div>
          </div>

          <div className="chart-wrapper" style={{ height: '300px' }}>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Traders Table */}
        <div className="traders-panel">
          <h2>Traders</h2>
          <div className="table-controls-panel">
            <div className="search-box">
              <Search size={20} />
              <input 
                type="text" 
                placeholder="Search Traders" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <div className="filter-button">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="">All Status</option>
                  <option value="Profitable">Profitable</option>
                  <option value="Average">Average</option>
                  <option value="Unprofitable">Unprofitable</option>
                </select>
                <ChevronDown size={16} />
              </div>
              <div className="filter-button">
                <input
                  type="text"
                  placeholder="Filter by Date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
                <Calendar size={16} />
              </div>
            </div>
          </div>

          <div className="table-wrapper">
            <table className="traders-data-table">
              <thead>
                <tr>
                  <th>Trader Name</th>
                  <th>Amount Secured</th>
                  <th>Net Profit</th>
                  <th>Avg ROI</th>
                  <th>Avg Drawdown</th>
                  <th>Tag</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTraders.map((trader, index) => (
                  <tr key={trader.id}>
                    <td data-label="Trader Name">
                      <div className="trader-details">
                        <img src={trader.avatar} alt={trader.name} className="user-profile-pic" />
                        <span>{trader.name}</span>
                      </div>
                    </td>
                    <td data-label="Amount Secured">{trader.amountSecured}</td>
                    <td data-label="Net Profit">{trader.netProfit}</td>
                    <td data-label="Avg ROI">{trader.avgROI}</td>
                    <td data-label="Avg Drawdown">{trader.avgDrawdown}</td>
                    <td data-label="Tag">
                      <span className={`status-tag status-tag-${trader.tagColor}`}>
                        {trader.tag}
                      </span>
                    </td>
                    <td data-label="Actions" className="traders-actions">
                      <div className="traders-action-menu">
                        <button 
                          className="traders-action-btn"
                          onClick={() => setMenuOpen(menuOpen === trader.id ? null : trader.id)}
                          aria-label="More actions"
                        >
                          <MoreHorizontal size={16} />
                        </button>
                        {menuOpen === trader.id && (
                          <div
                            className={`traders-dropdown-menu ${index >= filteredTraders.length - 2 ? 'drop-up' : ''}`}
                          >
                            <button onClick={() => handleViewProfile(trader.id)}>
                              View Profile
                            </button>
                            {[
                              { status: 'Profitable', color: 'green' },
                              { status: 'Average', color: 'orange' },
                              { status: 'Unprofitable', color: 'red' }
                            ].filter(({ status }) => status !== trader.tag).map(({ status, color }) => (
                              <button 
                                key={status}
                                onClick={() => handleStatusChange(trader.id, status, color)}
                              >
                                Set to {status}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
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

function defaultTraders() {
  // Trader data from Users.jsx
  const tradersData = [
    {
      id: 2,
      name: 'Ali Raza',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      amountSecured: '$800k', // Estimated based on profit and investors
      netProfit: '900k',
      avgROI: '30.2%', // Assigned based on original data inspiration
      avgDrawdown: '3.1%',
      tag: 'Average',
      tagColor: 'orange',
      date: 'Jul 2023'
    },
    {
      id: 3,
      name: 'John Smith',
      avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
      amountSecured: '$2.5M',
      netProfit: '3200k',
      avgROI: '45.7%',
      avgDrawdown: '2.4%',
      tag: 'Profitable',
      tagColor: 'green',
      date: 'Jul 2023'
    },
    {
      id: 5,
      name: 'David Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/28.jpg',
      amountSecured: '$500k',
      netProfit: '600k',
      avgROI: '15.5%',
      avgDrawdown: '5.0%',
      tag: 'Average',
      tagColor: 'orange',
      date: 'Jul 2023'
    },
    {
      id: 7,
      name: 'William Lee',
      avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
      amountSecured: '$300k',
      netProfit: '400k',
      avgROI: '10.0%',
      avgDrawdown: '6.0%',
      tag: 'Unprofitable',
      tagColor: 'red',
      date: 'Jul 2023'
    },
    {
      id: 9,
      name: 'James Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
      amountSecured: '$3.0M',
      netProfit: '4100k',
      avgROI: '50.0%',
      avgDrawdown: '2.0%',
      tag: 'Profitable',
      tagColor: 'green',
      date: 'Aug 2023'
    }
  ];

  // Sort by netProfit in descending order
  return tradersData.sort((a, b) => {
    const profitA = parseFloat(a.netProfit.replace('k', '')) * 1000;
    const profitB = parseFloat(b.netProfit.replace('k', '')) * 1000;
    return profitB - profitA;
  });
}

export default Traders;