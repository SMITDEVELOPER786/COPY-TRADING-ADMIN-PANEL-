"use client";

import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
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
import { FaBan, FaEnvelope, FaSnowflake, FaTrash, FaEdit, FaIdCard } from "react-icons/fa";
import { getUserById } from "../services/user.service";
import { updateUserStatus } from "../services/user.service";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TraderProfile = ({ user: propUser }) => {
  const { traderId } = useParams();
  const navigate = useNavigate();
  const [showMetricsDialog, setShowMetricsDialog] = useState(false);
  const [showKycDialog, setShowKycDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [user, setUser] = useState(propUser || null);
  const [isLoading, setIsLoading] = useState(!propUser);
  const [error, setError] = useState(null);

  // ==================== FETCH TRADER DATA ====================
  useEffect(() => {
    const fetchTrader = async () => {
      // If user is passed as prop, use it
      if (propUser) {
        setUser(propUser);
        setIsLoading(false);
        return;
      }

      // Otherwise fetch from API using traderId from URL
      if (!traderId) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await getUserById(traderId);
        
        // API structure: { status: 'success', message: '...', data: { ...user data... } }
        const userData = response.data || response;
        
        // Transform API data to component format
        const transformedUser = {
          id: userData._id || userData.id,
          _id: userData._id,
          name: userData.username || userData.name || 'N/A',
          email: userData.email || 'N/A',
          phone: userData.phone || '',
          type: userData.role || 'TRADER',
          role: userData.role,
          wallet: userData.wallet || userData.walletAddress || '-',
          market: userData.market || '-',
          broker: userData.broker || '-',
          joined: userData.createdAt 
            ? new Date(userData.createdAt).toLocaleDateString('en-GB', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })
            : '-',
          createdAt: userData.createdAt,
          status: userData.kycStatus === 'APPROVED' ? 'APPROVED' : 
                  userData.kycStatus === 'PENDING' ? 'PENDING' : 
                  userData.isFrozen ? 'Delete' : 'Active',
          kycStatus: userData.kycStatus,
          isFrozen: userData.isFrozen,
          avatar: userData.profileImage?.url || userData.avatar || userData.profilePicture || 'https://via.placeholder.com/40',
          amountSecured: userData.amountSecured || '$0',
          netProfit: userData.netProfit || '$0',
          avgROI: userData.avgROI || '0%',
          avgDrawdown: userData.avgDrawdown || '0%',
          tag: userData.kycStatus === 'APPROVED' ? 'Profitable' : 
               userData.kycStatus === 'PENDING' ? 'Average' : 
               userData.isFrozen ? 'Unprofitable' : 'Profitable',
          tagColor: userData.kycStatus === 'APPROVED' ? 'green' : 
                    userData.kycStatus === 'PENDING' ? 'orange' : 
                    userData.isFrozen ? 'red' : 'green',
          // API specific fields
          username: userData.username,
          profileCompleted: userData.profileCompleted,
          isEmailVerified: userData.isEmailVerified,
          verificationMethod: userData.verificationMethod,
          verificationCompleted: userData.verificationCompleted || {},
          kycDocuments: userData.kycDocuments || {},
          kycReview: userData.kycReview || {},
          lastLoginAt: userData.lastLoginAt,
          updatedAt: userData.updatedAt,
        };
        
        setUser(transformedUser);
      } catch (err) {
        console.error('Error fetching trader:', err);
        setError(err.message || 'Failed to fetch trader details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrader();
  }, [traderId, propUser]);

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

  const handleDeactivate = async () => {
    if (!user || !user.id) {
      toast.error('User data not available');
      return;
    }
    
    try {
      // Determine the new status based on current status
      const newStatus = user.status === 'Active' ? 'Deactivate' : 'Active';
      
      // Update the local state immediately to provide visual feedback
      setUser(prev => ({
        ...prev,
        status: newStatus,
        kycStatus: newStatus === 'Active' ? 'APPROVED' : 'PENDING',
        isFrozen: newStatus === 'Active' ? false : false // Keep isFrozen false for deactivation
      }));
      
      // Make the API call
      await updateUserStatus(user.id, newStatus);
      
      toast.success(`User ${newStatus === 'Active' ? 'activated' : 'deactivated'} successfully`);
    } catch (error) {
      console.error('Error updating user status:', error);
      toast.error(`Failed to ${user?.status === 'Active' ? 'deactivate' : 'activate'} user`);
      
      // Revert the status if API call failed
      setUser(prev => ({
        ...prev,
        status: user.status, // Revert to original status
        kycStatus: user.kycStatus,
        isFrozen: user.isFrozen
      }));
    }
  };

  const handleFreeze = async () => {
    if (!user || !user.id) {
      toast.error('User data not available');
      return;
    }
    
    try {
      // Determine the new freeze status based on current status
      const newIsFrozen = !user.isFrozen;
      
      // For freezing, we update the status to reflect the freeze state
      const newStatus = newIsFrozen ? 'Delete' : 'Active';
      
      // Update the local state immediately to provide visual feedback
      setUser(prev => ({
        ...prev,
        status: newStatus,
        isFrozen: newIsFrozen,
        kycStatus: newIsFrozen ? 'PENDING' : 'APPROVED'
      }));
      
      // Make the API call
      await updateUserStatus(user.id, newStatus);
      
      toast.success(`User ${newIsFrozen ? 'frozen' : 'unfrozen'} successfully`);
    } catch (error) {
      console.error('Error updating user freeze status:', error);
      toast.error(`Failed to ${user?.isFrozen ? 'unfreeze' : 'freeze'} user`);
      
      // Revert the status if API call failed
      setUser(prev => ({
        ...prev,
        status: user.status, // Revert to original status
        isFrozen: user.isFrozen,
        kycStatus: user.kycStatus
      }));
    }
  };

  const handleDelete = async () => {
    if (!user || !user.id) {
      toast.error('User data not available');
      return;
    }
    
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!user || !user.id) {
      toast.error('User data not available');
      return;
    }
    
    try {
      // Update the local state immediately to provide visual feedback
      const newStatus = user.status === 'Delete' ? 'Active' : 'Delete';
      setUser(prev => ({
        ...prev,
        status: newStatus,
        isFrozen: newStatus === 'Delete'
      }));
      
      // In the existing updateUserStatus function, 'Delete' status actually freezes the account
      // If you want to truly delete the user, you would need a different endpoint
      await updateUserStatus(user.id, newStatus);
      
      toast.success(`User account ${newStatus === 'Delete' ? 'frozen (soft delete)' : 'activated'} successfully`);
      setShowDeleteDialog(false);
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user');
      setShowDeleteDialog(false);
      
      // Revert the status if API call failed
      setUser(prev => ({
        ...prev,
        status: user.status, // Revert to original status
        isFrozen: user.isFrozen
      }));
    }
  };

  const handleKycApprove = async () => {
    if (!user || !user.id) {
      toast.error('User data not available');
      return;
    }
    
    try {
      // Update the local state immediately to provide visual feedback
      setUser(prev => ({
        ...prev,
        status: 'Active',
        kycStatus: 'APPROVED'
      }));
      
      // In a real implementation, this would call the submitKycReview function
      // For now, we'll update the user status directly
      await updateUserStatus(user.id, 'Active');
      
      toast.success('KYC approved successfully');
    } catch (error) {
      console.error('Error approving KYC:', error);
      toast.error('Failed to approve KYC');
      
      // Revert the status if API call failed
      setUser(prev => ({
        ...prev,
        status: user.status, // Revert to original status
        kycStatus: user.kycStatus
      }));
    }
  };

  const handleKycReject = async () => {
    if (!user || !user.id) {
      toast.error('User data not available');
      return;
    }
    
    if (window.confirm(`Are you sure you want to reject this user's KYC?`)) {
      try {
        // Update the local state immediately to provide visual feedback
        setUser(prev => ({
          ...prev,
          status: 'Deactivate',
          kycStatus: 'REJECTED'
        }));
        
        // In a real implementation, this would call the submitKycReview function
        // For now, we'll update the user status directly
        await updateUserStatus(user.id, 'Deactivate');
        
        toast.success('KYC rejected successfully');
      } catch (error) {
        console.error('Error rejecting KYC:', error);
        toast.error('Failed to reject KYC');
        
        // Revert the status if API call failed
        setUser(prev => ({
          ...prev,
          status: user.status, // Revert to original status
          kycStatus: user.kycStatus
        }));
      }
    }
  };

  const handleKycPending = async () => {
    if (!user || !user.id) {
      toast.error('User data not available');
      return;
    }
    
    try {
      // Update the local state immediately to provide visual feedback
      setUser(prev => ({
        ...prev,
        status: 'PENDING',
        kycStatus: 'PENDING'
      }));
      
      // In a real implementation, this would call the submitKycReview function
      // For now, we'll update the user status directly
      await updateUserStatus(user.id, 'Deactivate');
      
      toast.success('KYC status set to pending');
    } catch (error) {
      console.error('Error setting KYC to pending:', error);
      toast.error('Failed to update KYC status');
      
      // Revert the status if API call failed
      setUser(prev => ({
        ...prev,
        status: user.status, // Revert to original status
        kycStatus: user.kycStatus
      }));
    }
  };

  const handleSendEmail = async () => {
    if (!user || !user.email) {
      toast.error('User email not available');
      return;
    }
    
    // In a real implementation, this would call an email service
    // For now, we'll simulate the email sending
    try {
      // Simulate API call to send email
      console.log('Sending email to:', user.email);
      
      // Simulate API response
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`Email sent successfully to ${user.email}`);
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send email');
    }
  };

  const handleEdit = () => {
    if (user) {
      setEditingUser(user);
      setShowForm(true);
    }
  };

  const handleEditClose = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData(e.target);
      const updatedData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        role: formData.get('type'),
        wallet: formData.get('wallet'),
        market: formData.get('market'),
        broker: formData.get('broker'),
        kycStatus: formData.get('status'),
        amountSecured: formData.get('amountSecured'),
        netProfit: formData.get('netProfit'),
        avgROI: formData.get('avgROI'),
        avgDrawdown: formData.get('avgDrawdown'),
      };
      
      // Update the user via API
      const userId = user.id || user._id;
      await updateUserStatus(userId, user.status || 'Active'); // We'll update other fields separately if needed
      
      // Update local state
      setUser(prev => ({
        ...prev,
        ...updatedData
      }));
      
      setShowForm(false);
      setEditingUser(null);
      
      toast.success('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user');
    }
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

  if (isLoading) {
    return (
      <div className="trader-profile-container">
        <div style={{ padding: "40px", textAlign: "center" }}>
          Loading trader profile...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="trader-profile-container">
        <div style={{ padding: "40px", textAlign: "center", color: "red" }}>
          Error: {error}
          <br />
          <button 
            className="back-btn" 
            onClick={() => navigate('/trader')}
            style={{ marginTop: '20px' }}
          >
            <ChevronLeft size={18} /> Back to Traders
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="trader-profile-container">
        <div style={{ padding: "40px", textAlign: "center" }}>
          Trader not found
          <br />
          <button 
            className="back-btn" 
            onClick={() => navigate('/trader')}
            style={{ marginTop: '20px' }}
          >
            <ChevronLeft size={18} /> Back to Traders
          </button>
        </div>
      </div>
    );
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
        <button className="back-btn" onClick={() => navigate('/trader')}>
          <ChevronLeft size={18} /> Back to Traders
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
                  <span className={`status-badge ${user.status?.toLowerCase() || 'pending'}`}>{user.status || 'PENDING'}</span>
                  <button
                    className="metrics-btn"
                    onClick={() => setShowMetricsDialog(true)}
                    title="View Advanced Trading Metrics"
                  >
                    <Activity size={20} />
                    <span>Trading Metrics</span>
                  </button>
                  <button className="action-btn green" onClick={handleSendEmail}>
                    <FaEnvelope /> Send Email
                  </button>
                  <button className="action-btn orange" onClick={handleDeactivate}>
                    <FaBan /> {user?.status === 'Active' ? 'Deactivate' : 'Activate'}
                  </button>
                  <button className="action-btn red" onClick={handleFreeze}>
                    <FaSnowflake /> {user?.isFrozen ? 'Unfreeze' : 'Freeze'}
                  </button>
                  <button 
                    className="action-btn red"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <FaTrash /> {user?.status === 'Delete' ? 'Undelete' : 'Delete'}
                  </button>
                  <button className="action-btn outline" onClick={handleEdit}>
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
                    <span className="metric-label">Average Trades Length (Hours)</span>
                    <span className="metric-value">
                      {(advancedMetricsDialog.averageTradeLengthInMilliseconds / (1000 * 60 * 60)).toFixed(2)}
                    </span>
                  </div>
                 
                </div>
              </div>

               
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
              <button 
                className="btn-kyc"
                onClick={() => setShowKycDialog(true)}
              >
                <FaIdCard size={16} /> View KYC Documents
              </button>
              <button 
                className="btn green"
                onClick={handleSendEmail}
              >
                <FaEnvelope size={16} /> Send Email
              </button>
              {user?.kycStatus === 'PENDING' && (
                <div className="kyc-actions">
                  <button className="btn green" onClick={handleKycApprove}>
                    Approve KYC
                  </button>
                  <button className="btn red" onClick={handleKycReject}>
                    Reject KYC
                  </button>
                  <button className="btn orange" onClick={handleKycPending}>
                    Set to Pending
                  </button>
                </div>
              )}
              <button className="btn-contact" onClick={() => setShowContactDialog(true)}>
                <Phone size={16} /> Contact Info
              </button>
            </div>
          </div>
        </div>
      </div>

      {showDeleteDialog && (
        <div className="modal" onClick={() => setShowDeleteDialog(false)}>
          <div className="modal-content small" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Confirm Action</h3>
              <button className="modal-close" onClick={() => setShowDeleteDialog(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to {user?.status === 'Delete' ? 'undelete' : 'delete'} this user?</p>
              <p className="warning-text">This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button
                className="btn red"
                onClick={confirmDelete}
              >
                {user?.status === 'Delete' ? 'Undelete' : 'Delete'}
              </button>
              <button
                className="btn outline"
                onClick={() => setShowDeleteDialog(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showKycDialog && (
        <div className="modal" onClick={() => setShowKycDialog(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>KYC Documents</h3>
              <button className="modal-close" onClick={() => setShowKycDialog(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="kyc-documents">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
                  {/* CNIC Front */}
                  <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', background: '#fff' }}>
                    <h5 style={{ marginBottom: '10px' }}>CNIC Front</h5>
                    {user?.kycDocuments?.cnicFront?.url || user?.kycDocuments?.cnicFront?.filename ? (
                      <div>
                        <img 
                          src={user.kycDocuments.cnicFront.url ? 
                            (user.kycDocuments.cnicFront.url.startsWith('http') ? 
                              user.kycDocuments.cnicFront.url : 
                              `https://backend.greentrutle.com${user.kycDocuments.cnicFront.url}`) : 
                            'https://via.placeholder.com/300x200?text=CNIC+Front'} 
                          alt="CNIC Front" 
                          style={{ width: '100%', height: 'auto', borderRadius: '4px', marginBottom: '10px' }}
                        />
                        <p style={{ fontSize: '12px', color: '#666' }}>
                          Uploaded: {user.kycDocuments.cnicFront.uploadedAt ? 
                            new Date(user.kycDocuments.cnicFront.uploadedAt).toLocaleDateString() : 
                            'N/A'}
                        </p>
                      </div>
                    ) : (
                      <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
                        <p style={{ fontStyle: 'italic' }}>No document uploaded</p>
                      </div>
                    )}
                  </div>

                  {/* CNIC Back */}
                  <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', background: '#fff' }}>
                    <h5 style={{ marginBottom: '10px' }}>CNIC Back</h5>
                    {user?.kycDocuments?.cnicBack?.url || user?.kycDocuments?.cnicBack?.filename ? (
                      <div>
                        <img 
                          src={user.kycDocuments.cnicBack.url ? 
                            (user.kycDocuments.cnicBack.url.startsWith('http') ? 
                              user.kycDocuments.cnicBack.url : 
                              `https://backend.greentrutle.com${user.kycDocuments.cnicBack.url}`) : 
                            'https://via.placeholder.com/300x200?text=CNIC+Back'} 
                          alt="CNIC Back" 
                          style={{ width: '100%', height: 'auto', borderRadius: '4px', marginBottom: '10px' }}
                        />
                        <p style={{ fontSize: '12px', color: '#666' }}>
                          Uploaded: {user.kycDocuments.cnicBack.uploadedAt ? 
                            new Date(user.kycDocuments.cnicBack.uploadedAt).toLocaleDateString() : 
                            'N/A'}
                        </p>
                      </div>
                    ) : (
                      <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
                        <p style={{ fontStyle: 'italic' }}>No document uploaded</p>
                      </div>
                    )}
                  </div>

                  {/* Face Picture */}
                  <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', background: '#fff' }}>
                    <h5 style={{ marginBottom: '10px' }}>Face Picture</h5>
                    {user?.kycDocuments?.facePicture?.url || user?.kycDocuments?.facePicture?.filename ? (
                      <div>
                        <img 
                          src={user.kycDocuments.facePicture.url ? 
                            (user.kycDocuments.facePicture.url.startsWith('http') ? 
                              user.kycDocuments.facePicture.url : 
                              `https://backend.greentrutle.com${user.kycDocuments.facePicture.url}`) : 
                            'https://via.placeholder.com/300x300?text=Face+Picture'} 
                          alt="Face Picture" 
                          style={{ width: '100%', height: 'auto', borderRadius: '4px', marginBottom: '10px' }}
                        />
                        <p style={{ fontSize: '12px', color: '#666' }}>
                          Uploaded: {user.kycDocuments.facePicture.uploadedAt ? 
                            new Date(user.kycDocuments.facePicture.uploadedAt).toLocaleDateString() : 
                            'N/A'}
                        </p>
                      </div>
                    ) : (
                      <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
                        <p style={{ fontStyle: 'italic' }}>No document uploaded</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn outline"
                onClick={() => setShowKycDialog(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showContactDialog && (
        <div className="modal" onClick={() => setShowContactDialog(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Contact Information</h3>
              <button className="modal-close" onClick={() => setShowContactDialog(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="contact-info">
                <h4>Personal Information</h4>
                <div className="contact-details">
                  <p><strong>Name:</strong> {user?.name || 'N/A'}</p>
                  <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
                  <p><strong>Phone:</strong> {user?.phone || 'N/A'}</p>
                  <p><strong>Username:</strong> {user?.username || 'N/A'}</p>
                </div>
                
                <h4>Account Information</h4>
                <div className="contact-details">
                  <p><strong>Wallet ID:</strong> {user?.wallet || 'N/A'}</p>
                  <p><strong>Broker:</strong> {user?.broker || 'N/A'}</p>
                  <p><strong>Market:</strong> {user?.market || 'N/A'}</p>
                  <p><strong>Joined:</strong> {user?.joined || 'N/A'}</p>
                </div>
                
                <h4>Verification Status</h4>
                <div className="contact-details">
                  <p><strong>KYC Status:</strong> <span className={`status-badge ${user?.kycStatus?.toLowerCase() || 'pending'}`}>
                    {user?.kycStatus || 'PENDING'}</span>
                  </p>
                  <p><strong>Email Verified:</strong> {user?.isEmailVerified ? 'Yes' : 'No'}</p>
                  <p><strong>Profile Completed:</strong> {user?.profileCompleted ? 'Yes' : 'No'}</p>
                  <p><strong>Account Frozen:</strong> {user?.isFrozen ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn outline"
                onClick={() => setShowContactDialog(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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

            <button className="dialog-close-btn" onClick={() => setShowMetricsDialog(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Form */}
      {showForm && (
        <div className="modal" onClick={handleEditClose}>
          <div className="modal-content small" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Trader</h3>
              <button className="modal-close" onClick={handleEditClose}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleEditSubmit} className="form">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    name="name"
                    defaultValue={editingUser?.name}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    name="email"
                    defaultValue={editingUser?.email}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    name="phone"
                    defaultValue={editingUser?.phone}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Wallet ID</label>
                  <input
                    name="wallet"
                    defaultValue={editingUser?.wallet}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Market</label>
                  <input
                    name="market"
                    defaultValue={editingUser?.market}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Broker</label>
                  <input
                    name="broker"
                    defaultValue={editingUser?.broker}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>KYC Status</label>
                  <input
                    name="status"
                    defaultValue={editingUser?.kycStatus}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Amount Secured</label>
                  <input
                    name="amountSecured"
                    defaultValue={editingUser?.amountSecured}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Net Profit</label>
                  <input
                    name="netProfit"
                    defaultValue={editingUser?.netProfit}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Avg ROI</label>
                  <input
                    name="avgROI"
                    defaultValue={editingUser?.avgROI}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Avg Drawdown</label>
                  <input
                    name="avgDrawdown"
                    defaultValue={editingUser?.avgDrawdown}
                    className="form-control"
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn green">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="btn outline"
                    onClick={handleEditClose}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TraderProfile;