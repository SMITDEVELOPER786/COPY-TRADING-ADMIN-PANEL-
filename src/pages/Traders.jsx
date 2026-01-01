import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Calendar,
  ChevronDown,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  FileText,
  CheckCircle,
  XCircle,
  X
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
import { getUsers, updateUserStatus, submitKycReview } from '../services/user.service';

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

  // ==================== STATE MANAGEMENT ====================
  const [usersData, setUsersData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showKycApprovalDialog, setShowKycApprovalDialog] = useState(false);
  const [selectedUserForKyc, setSelectedUserForKyc] = useState(null);
  const [adminNotes, setAdminNotes] = useState("");

  // ==================== HELPER FUNCTIONS ====================

  /**
   * Transform API user data to component format
   */
  const transformUserData = (apiUser) => {
    return {
      id: apiUser._id || apiUser.id,
      _id: apiUser._id,
      name: apiUser.username || apiUser.name || apiUser.fullName || 'N/A',
      email: apiUser.email || 'N/A',
      isEmailVerified: apiUser.isEmailVerified || false,
      phone: apiUser.phone || '',
      type: apiUser.role || 'TRADER',
      role: apiUser.role,
      wallet: apiUser.wallet || apiUser.walletAddress || '-',
      market: apiUser.market || '-',
      broker: apiUser.broker || '-',
      joined: apiUser.createdAt
        ? new Date(apiUser.createdAt).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
        : '-',
      createdAt: apiUser.createdAt,
      status: apiUser.isFrozen ? 'Delete' :
        apiUser.kycStatus === 'APPROVED' ? 'Active' :
          apiUser.kycStatus === 'PENDING' ? 'PENDING' :
            'Active',
      kycStatus: apiUser.kycStatus,
      isFrozen: apiUser.isFrozen,
      avatar: apiUser.profileImage?.url || apiUser.avatar || apiUser.profilePicture || 'https://via.placeholder.com/40',
      amountSecured: apiUser.amountSecured || '$0',
      netProfit: apiUser.netProfit || '$0',
      avgROI: apiUser.avgROI || '0%',
      avgDrawdown: apiUser.avgDrawdown || '0%',
      tag: apiUser.kycStatus === 'APPROVED' ? 'Profitable' :
        apiUser.kycStatus === 'PENDING' ? 'Average' :
          apiUser.isFrozen ? 'Unprofitable' : 'Profitable',
      tagColor: apiUser.kycStatus === 'APPROVED' ? 'green' :
        apiUser.kycStatus === 'PENDING' ? 'orange' :
          apiUser.isFrozen ? 'red' : 'green',
      kycDocuments: apiUser.kycDocuments || {},
      kycReview: apiUser.kycReview || {},
    };
  };

  /**
   * Fetch traders from API
   */
  const fetchTraders = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await getUsers({
        role: 'TRADER',
        all: true,
      });

      setUsersData(response);
    } catch (err) {
      console.error('Error fetching traders:', err);
      setError(err.message || 'Failed to fetch traders');
    } finally {
      setIsLoading(false);
    }
  };

  // ==================== DATA TRANSFORMATION ====================

  /**
   * Extract and transform traders from API response
   */
  const traders = useMemo(() => {
    if (!usersData) return [];

    let apiUsers = [];

    try {
      // Handle nested structure: usersData.data.users
      if (usersData.data && usersData.data.users && Array.isArray(usersData.data.users)) {
        apiUsers = usersData.data.users;
      }
      // Handle direct users property
      else if (usersData.users && Array.isArray(usersData.users)) {
        apiUsers = usersData.users;
      }
      // Handle data as array
      else if (usersData.data && Array.isArray(usersData.data)) {
        apiUsers = usersData.data;
      }
      // Handle if response is directly an array
      else if (Array.isArray(usersData)) {
        apiUsers = usersData;
      }

      // Ensure apiUsers is an array before mapping
      if (!Array.isArray(apiUsers)) {
        console.error('API response is not an array:', { usersData, apiUsers });
        return [];
      }

      // Transform to component format
      return apiUsers.map(transformUserData);
    } catch (error) {
      console.error('Error transforming traders:', error, { usersData });
      return [];
    }
  }, [usersData]);

  // ==================== API CALLS ====================

  useEffect(() => {
    fetchTraders();
  }, []);

  // ==================== EVENT HANDLERS ====================

  const handleViewProfile = (id) => {
    navigate(`/trader/${id}`);
  };

  const handleStatusChange = async (user, newStatus) => {
    const userId = user.id || user._id;
    try {
      setIsLoading(true);
      await updateUserStatus(userId, newStatus);
      // Refresh the traders list
      await fetchTraders();
      setMenuOpen(null);
    } catch (error) {
      console.error('Error updating status:', error);
      setError(error.message || 'Failed to update status');
      // Clear error after 3 seconds
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproveKyc = (user) => {
    setSelectedUserForKyc(user);
    setAdminNotes("");
    setShowKycApprovalDialog(true);
    setMenuOpen(null);
  };

  const handleSubmitKycApproval = async (status = "APPROVED") => {
    if (!selectedUserForKyc) return;

    // Default admin notes if empty
    let notes = adminNotes;
    if (!notes) {
      notes = status === "APPROVED"
        ? "All documents verified successfully. Identity confirmed."
        : "Documents rejected due to insufficient quality or mismatch.";
    }

    const userId = selectedUserForKyc.id || selectedUserForKyc._id;
    try {
      setIsLoading(true);
      await submitKycReview(userId, {
        status: status,
        adminNotes: notes
      });
      // Refresh the traders list
      await fetchTraders();
      setShowKycApprovalDialog(false);
      setSelectedUserForKyc(null);
      setAdminNotes("");
    } catch (error) {
      console.error('Error approving KYC:', error);
      setError(error.message || 'Failed to approve KYC');
      // Clear error after 3 seconds
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user has submitted KYC documents
  const hasKycDocuments = (user) => {
    const docs = user.kycDocuments || {};
    return !!(docs.cnicFront?.url || docs.cnicFront?.filename ||
      docs.cnicBack?.url || docs.cnicBack?.filename ||
      docs.facePicture?.url || docs.facePicture?.filename);
  };

  // ==================== FILTERS ====================

  const filteredTraders = useMemo(() => {
    return traders.filter(trader => {
      const searchMatch = !searchTerm ||
        trader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trader.email.toLowerCase().includes(searchTerm.toLowerCase());

      const statusMatch = !selectedStatus || trader.tag === selectedStatus;

      const dateMatch = !selectedDate ||
        (trader.joined && trader.joined.toLowerCase().includes(selectedDate.toLowerCase())) ||
        (trader.createdAt && trader.createdAt.toLowerCase().includes(selectedDate.toLowerCase()));

      return searchMatch && statusMatch && dateMatch;
    });
  }, [traders, searchTerm, selectedStatus, selectedDate]);

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
                placeholder="Search Traders by Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* <div className="filter-group"> */}
            <div className="filter-controls">
              <div className="kyc-status-filter">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="kyc-status-select"
                >
                  <option value="">All Status</option>
                  <option value="Profitable">Profitable</option>
                  <option value="Average">Average</option>
                  <option value="Unprofitable">Unprofitable</option>
                </select>
                <ChevronDown size={16} className="kyc-select-icon" />
              </div>
              <div className="reports-date-filter">
                <input
                  type="text"
                  placeholder="Filter by Date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="date-input"
                />
                <Calendar size={16} className="date-icon" />
              </div>
            </div>
          </div>

          <div className="table-wrapper">
            {isLoading && (
              <div style={{ padding: "20px", textAlign: "center" }}>
                Loading traders...
              </div>
            )}
            {error && (
              <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
                Error loading traders: {error}
              </div>
            )}
            {!isLoading && !error && (
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
                  {filteredTraders.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                        No traders found
                      </td>
                    </tr>
                  ) : (
                    filteredTraders.map((trader, index) => (
                      <tr key={trader.id}>
                        <td data-label="Trader Name">
                          <div
                            className="trader-details"
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleViewProfile(trader.id || trader._id)}
                            title="Click to view profile"
                          >
                            <img src={trader.avatar} alt={trader.name} className="user-profile-pic" />
                            <span style={{ textDecoration: 'underline', color: '#10B981' }}>{trader.name}</span>
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
                              onClick={() => setMenuOpen(menuOpen === (trader.id || trader._id) ? null : (trader.id || trader._id))}
                              aria-label="More actions"
                            >
                              <MoreHorizontal size={16} />
                            </button>
                            {menuOpen === (trader.id || trader._id) && (
                              <div
                                className={`traders-dropdown-menu ${index >= filteredTraders.length - 2 ? 'drop-up' : ''}`}
                              >
                                <button onClick={() => handleViewProfile(trader.id || trader._id)}>
                                  <Eye size={14} /> View Profile
                                </button>
                                {hasKycDocuments(trader) && (
                                  <>
                                    <button onClick={() => handleApproveKyc(trader)}>
                                      <FileText size={14} /> View KYC
                                    </button>
                                    {trader.kycStatus !== 'APPROVED' && (
                                      <button onClick={() => handleApproveKyc(trader)}>
                                        <CheckCircle size={14} color="#166534" /> Approve KYC
                                      </button>
                                    )}
                                  </>
                                )}
                                {/* Status Update Options */}
                                {[
                                  { status: 'Active', icon: <CheckCircle size={14} color="#166534" /> },
                                  { status: 'Deactivate', icon: <XCircle size={14} color="#92400e" /> },
                                  { status: 'Delete', icon: <XCircle size={14} color="#dc2626" /> }
                                ].filter(({ status }) => {
                                  // Map status to trader tag for comparison
                                  const statusMap = {
                                    'Active': 'Profitable',
                                    'Deactivate': 'Average',
                                    'Delete': 'Unprofitable'
                                  };
                                  return statusMap[status] !== trader.tag;
                                }).map(({ status, icon }) => (
                                  <button
                                    key={status}
                                    onClick={() => handleStatusChange(trader, status)}
                                  >
                                    {icon}
                                    Set to {status}
                                  </button>
                                ))}
                                <button onClick={() => console.log('Edit trader:', trader)}>
                                  <Edit size={14} /> Edit
                                </button>
                                <button onClick={() => console.log('Remove trader:', trader)}>
                                  <Trash2 size={14} /> Remove
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* KYC Details & Approval Modal */}
      {showKycApprovalDialog && selectedUserForKyc && (
        <div className="modal" onClick={() => setShowKycApprovalDialog(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '800px', width: '90%', maxHeight: '90vh', overflowY: 'auto' }}
          >
            <div className="modal-header" style={{ borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <img
                  src={selectedUserForKyc.avatar}
                  alt={selectedUserForKyc.name}
                  style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <h3 style={{ margin: 0 }}>{selectedUserForKyc.name}</h3>
                  <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{selectedUserForKyc.email}</p>
                </div>
              </div>
              <button className="modal-close" onClick={() => setShowKycApprovalDialog(false)}>
                <X size={24} />
              </button>
            </div>

            <div style={{ padding: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ fontWeight: '600', color: '#666' }}>User Type</label>
                  <p>{selectedUserForKyc.role}</p>
                </div>
                <div>
                  <label style={{ fontWeight: '600', color: '#666' }}>Status</label>
                  <p>
                    <span className={`status-tag status-tag-${selectedUserForKyc.tagColor}`}>
                      {selectedUserForKyc.kycStatus || selectedUserForKyc.status}
                    </span>
                  </p>
                </div>
                <div>
                  <label style={{ fontWeight: '600', color: '#666' }}>Joined</label>
                  <p>{selectedUserForKyc.joined}</p>
                </div>
                <div>
                  <label style={{ fontWeight: '600', color: '#666' }}>Wallet</label>
                  <p>{selectedUserForKyc.wallet}</p>
                </div>
              </div>

              <h4 style={{ borderBottom: '2px solid #f0f0f0', paddingBottom: '10px', marginBottom: '15px' }}>KYC Documents</h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                {/* CNIC Front */}
                <div style={{ border: '1px solid #eee', borderRadius: '8px', padding: '10px' }}>
                  <p style={{ fontWeight: '600', marginBottom: '10px', textAlign: 'center' }}>CNIC/ID Front</p>
                  {selectedUserForKyc.kycDocuments?.cnicFront?.url ? (
                    <img
                      src={selectedUserForKyc.kycDocuments.cnicFront.url}
                      alt="CNIC Front"
                      style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px', cursor: 'pointer' }}
                      onClick={() => window.open(selectedUserForKyc.kycDocuments.cnicFront.url, '_blank')}
                    />
                  ) : (
                    <div style={{ height: '150px', background: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
                      No Image
                    </div>
                  )}
                </div>

                {/* CNIC Back */}
                <div style={{ border: '1px solid #eee', borderRadius: '8px', padding: '10px' }}>
                  <p style={{ fontWeight: '600', marginBottom: '10px', textAlign: 'center' }}>CNIC/ID Back</p>
                  {selectedUserForKyc.kycDocuments?.cnicBack?.url ? (
                    <img
                      src={selectedUserForKyc.kycDocuments.cnicBack.url}
                      alt="CNIC Back"
                      style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px', cursor: 'pointer' }}
                      onClick={() => window.open(selectedUserForKyc.kycDocuments.cnicBack.url, '_blank')}
                    />
                  ) : (
                    <div style={{ height: '150px', background: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
                      No Image
                    </div>
                  )}
                </div>

                {/* Face Picture */}
                <div style={{ border: '1px solid #eee', borderRadius: '8px', padding: '10px' }}>
                  <p style={{ fontWeight: '600', marginBottom: '10px', textAlign: 'center' }}>Face Verification</p>
                  {selectedUserForKyc.kycDocuments?.facePicture?.url ? (
                    <img
                      src={selectedUserForKyc.kycDocuments.facePicture.url}
                      alt="Face Picture"
                      style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px', cursor: 'pointer' }}
                      onClick={() => window.open(selectedUserForKyc.kycDocuments.facePicture.url, '_blank')}
                    />
                  ) : (
                    <div style={{ height: '150px', background: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
                      No Image
                    </div>
                  )}
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                  Admin Notes
                </label>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Enter reasons for rejection or approval notes..."
                  style={{
                    width: '100%',
                    minHeight: '80px',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div className="form-actions" style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                <button
                  className="btn outline"
                  onClick={() => {
                    setShowKycApprovalDialog(false);
                    setSelectedUserForKyc(null);
                    setAdminNotes("");
                  }}
                  disabled={isLoading}
                >
                  Close
                </button>

                {selectedUserForKyc.kycStatus !== 'APPROVED' && (
                  <button
                    className="btn green"
                    onClick={() => handleSubmitKycApproval('APPROVED')}
                    disabled={isLoading}
                    style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                  >
                    <CheckCircle size={16} /> Approve
                  </button>
                )}

                {selectedUserForKyc.kycStatus !== 'REJECTED' && selectedUserForKyc.kycStatus !== 'FAILED' && (
                  <button
                    className="btn red"
                    onClick={() => handleSubmitKycApproval('REJECTED')}
                    disabled={isLoading}
                    style={{ backgroundColor: '#dc2626', color: 'white', display: 'flex', alignItems: 'center', gap: '5px' }}
                  >
                    <XCircle size={16} /> Reject
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Traders;