import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserCharts from '../components/UserCharts';
import { getUserById, updateUserStatus, submitKycReview, sendEmail, freezeUser, unfreezeUser } from '../services/user.service';
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
import { X, Activity, Mail, AtSign, MessageSquare, Send, FileText } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Users.css';

const InvestorProfile = () => {
  const { investmentId, investorId } = useParams();
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [activeTab, setActiveTab] = useState('investments');
  const [kycTab, setKycTab] = useState('documents'); // 'documents' or 'status'
  const [showMetricsDialog, setShowMetricsDialog] = useState(false);
  const [showRoiDialog, setShowRoiDialog] = useState(false);
  const [showKycDialog, setShowKycDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);

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

  // ==================== FETCH INVESTOR DATA ====================
  useEffect(() => {
    const fetchInvestor = async () => {
      if (!investorId) return;

      try {
        setIsLoading(true);
        setError(null);

        const response = await getUserById(investorId);

        // API structure: { status: 'success', message: '...', data: { ...user data... } }
        const userData = response.data || response;

        // Transform API data to component format
        const transformedUser = {
          id: userData._id || userData.id,
          _id: userData._id,
          name: userData.username || userData.name || 'N/A',
          email: userData.email || 'N/A',
          phone: userData.phone || '',
          type: userData.role || 'INVESTOR',
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
          avatar: userData.profileImage?.url || userData.avatar || 'https://via.placeholder.com/40',
          investors: userData.investors || 0,
          profit: userData.profit || '$0',
          equity: userData.equity || '0%',
          exp: userData.exp || '-',
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

        setSelectedUser(transformedUser);
      } catch (err) {
        console.error('Error fetching investor:', err);
        setError(err.message || 'Failed to fetch investor details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvestor();
  }, [investorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Extract form data
      const formData = new FormData(e.target);
      const updatedData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        role: formData.get('type'),
        wallet: formData.get('wallet'),
        market: formData.get('market'),
        broker: formData.get('broker'),
        createdAt: formData.get('joined'),
        kycStatus: formData.get('status'),
        investors: parseInt(formData.get('investors')),
        profit: formData.get('profit'),
        equity: formData.get('equity'),
        exp: formData.get('exp'),
        avatar: formData.get('avatar'),
      };

      // For now, we'll just update the local state
      // In a real implementation, you would make an API call to update the user
      setSelectedUser(prev => ({
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

  // Remove the old confirmDelete function since we're handling delete differently now

  const handleToggle = () => {
    // Placeholder for toggle functionality
  };

  const handleViewDetails = (item) => {
    console.log(`Viewing details for: ${item}`);
  };

  const handleSendEmail = () => {
    if (!selectedUser || !selectedUser.email) {
      toast.error('User email not available');
      return;
    }
    setShowEmailDialog(true);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser || !selectedUser.email) {
      toast.error('User email not available');
      return;
    }

    const formData = new FormData(e.target);
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    if (!email || !subject || !message) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsEmailSending(true);
    try {
      await sendEmail({
        email: email,
        subject: subject,
        message: message,
      });

      toast.success(`Email sent successfully to ${email}`);
      setShowEmailDialog(false);
      // Reset form
      e.target.reset();
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error(error.message || 'Failed to send email');
    } finally {
      setIsEmailSending(false);
    }
  };

  const handleDeactivate = async () => {
    if (!selectedUser || !selectedUser.id) {
      toast.error('User data not available');
      return;
    }

    const originalStatus = selectedUser.status;
    const originalKycStatus = selectedUser.kycStatus;
    const newStatus = selectedUser.status === 'Active' ? 'Deactivate' : 'Active';

    try {
      // Update the local state immediately to provide visual feedback
      setSelectedUser(prev => ({
        ...prev,
        status: newStatus,
        kycStatus: newStatus === 'Active' ? 'APPROVED' : 'PENDING',
        isFrozen: false // Keep isFrozen false for deactivation
      }));

      // Make the API call
      await updateUserStatus(selectedUser.id, newStatus);

      // Refresh user data to get the latest state from server
      try {
        const updatedUser = await getUserById(selectedUser.id);
        const userData = updatedUser.data || updatedUser;
        setSelectedUser(prev => ({
          ...prev,
          status: userData.isFrozen ? 'Delete' : (userData.kycStatus === 'APPROVED' ? 'Active' : 'PENDING'),
          kycStatus: userData.kycStatus,
          isFrozen: userData.isFrozen
        }));
      } catch (refreshError) {
        console.warn('Could not refresh user data:', refreshError);
      }

      toast.success(`User ${newStatus === 'Active' ? 'activated' : 'deactivated'} successfully`);
    } catch (error) {
      console.error('Error updating user status:', error);
      toast.error(error.message || `Failed to ${originalStatus === 'Active' ? 'deactivate' : 'activate'} user`);

      // Revert the status if API call failed
      setSelectedUser(prev => ({
        ...prev,
        status: originalStatus,
        kycStatus: originalKycStatus,
        isFrozen: selectedUser.isFrozen
      }));
    }
  };

  const handleFreeze = async () => {
    if (!selectedUser || !selectedUser.id) {
      toast.error('User data not available');
      return;
    }

    const originalIsFrozen = selectedUser.isFrozen;
    const newIsFrozen = !selectedUser.isFrozen;

    try {
      // Update the local state immediately to provide visual feedback
      setSelectedUser(prev => ({
        ...prev,
        status: newIsFrozen ? 'Delete' : 'Active',
        isFrozen: newIsFrozen,
        kycStatus: newIsFrozen ? 'PENDING' : 'APPROVED'
      }));

      // Make the API call
      if (newIsFrozen) {
        await freezeUser(selectedUser.id, 'Account frozen by admin');
      } else {
        await unfreezeUser(selectedUser.id);
      }

      // Refresh user data to get the latest state from server
      try {
        const updatedUser = await getUserById(selectedUser.id);
        const userData = updatedUser.data || updatedUser;
        setSelectedUser(prev => ({
          ...prev,
          status: userData.isFrozen ? 'Delete' : (userData.kycStatus === 'APPROVED' ? 'Active' : 'PENDING'),
          isFrozen: userData.isFrozen,
          kycStatus: userData.kycStatus
        }));
      } catch (refreshError) {
        console.warn('Could not refresh user data:', refreshError);
      }

      toast.success(`User ${newIsFrozen ? 'frozen' : 'unfrozen'} successfully`);
    } catch (error) {
      console.error('Error updating user freeze status:', error);
      toast.error(error.message || `Failed to ${originalIsFrozen ? 'unfreeze' : 'freeze'} user`);

      // Revert the status if API call failed
      setSelectedUser(prev => ({
        ...prev,
        status: selectedUser.status,
        isFrozen: originalIsFrozen,
        kycStatus: selectedUser.kycStatus
      }));
    }
  };

  const handleDelete = async () => {
    if (!selectedUser || !selectedUser.id) {
      toast.error('User data not available');
      return;
    }

    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!selectedUser || !selectedUser.id) {
      toast.error('User data not available');
      setShowDeleteDialog(false);
      return;
    }

    const originalStatus = selectedUser.status;
    const originalIsFrozen = selectedUser.isFrozen;
    const newStatus = selectedUser.status === 'Delete' ? 'Active' : 'Delete';

    try {
      // Update the local state immediately to provide visual feedback
      setSelectedUser(prev => ({
        ...prev,
        status: newStatus,
        isFrozen: newStatus === 'Delete',
        kycStatus: newStatus === 'Delete' ? 'PENDING' : 'APPROVED'
      }));

      // Delete status freezes the account (soft delete)
      await updateUserStatus(selectedUser.id, newStatus);

      // Refresh user data to get the latest state from server
      try {
        const updatedUser = await getUserById(selectedUser.id);
        const userData = updatedUser.data || updatedUser;
        setSelectedUser(prev => ({
          ...prev,
          status: userData.isFrozen ? 'Delete' : (userData.kycStatus === 'APPROVED' ? 'Active' : 'PENDING'),
          isFrozen: userData.isFrozen,
          kycStatus: userData.kycStatus
        }));
      } catch (refreshError) {
        console.warn('Could not refresh user data:', refreshError);
      }

      toast.success(`User account ${newStatus === 'Delete' ? 'deleted (frozen)' : 'restored'} successfully`);
      setShowDeleteDialog(false);
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error(error.message || 'Failed to update user');
      setShowDeleteDialog(false);

      // Revert the status if API call failed
      setSelectedUser(prev => ({
        ...prev,
        status: originalStatus,
        isFrozen: originalIsFrozen
      }));
    }
  };

  const handleKycApprove = async () => {
    if (!selectedUser || !selectedUser.id) {
      toast.error('User data not available');
      return;
    }

    try {
      // Use submitKycReview for proper KYC workflow
      await submitKycReview(selectedUser.id, {
        status: 'APPROVED',
        adminNotes: 'KYC Approved via Profile'
      });

      // Update the local state to reflect the change
      setSelectedUser(prev => ({
        ...prev,
        status: 'Active',
        kycStatus: 'APPROVED',
        kycReview: { ...prev.kycReview, status: 'APPROVED' }
      }));

      toast.success('KYC approved successfully');
    } catch (error) {
      console.error('Error approving KYC:', error);
      toast.error('Failed to approve KYC');
    }
  };

  const handleKycReject = async () => {
    if (!selectedUser || !selectedUser.id) {
      toast.error('User data not available');
      return;
    }

    if (window.confirm('Are you sure you want to reject this user\'s KYC?')) {
      try {
        await submitKycReview(selectedUser.id, {
          status: 'REJECTED',
          adminNotes: 'KYC Rejected via Profile'
        });

        // Update the local state to reflect the change
        setSelectedUser(prev => ({
          ...prev,
          status: 'Deactivate',
          kycStatus: 'REJECTED',
          kycReview: { ...prev.kycReview, status: 'REJECTED' }
        }));

        toast.success('KYC rejected successfully');
      } catch (error) {
        console.error('Error rejecting KYC:', error);
        toast.error('Failed to reject KYC');
      }
    }
  };

  const handleKycPending = async () => {
    if (!selectedUser || !selectedUser.id) {
      toast.error('User data not available');
      return;
    }

    try {
      await submitKycReview(selectedUser.id, {
        status: 'PENDING',
        adminNotes: 'KYC status reset to Pending'
      });

      // Update the local state to reflect the change
      setSelectedUser(prev => ({
        ...prev,
        status: 'PENDING',
        kycStatus: 'PENDING',
        kycReview: { ...prev.kycReview, status: 'PENDING' }
      }));

      toast.success('KYC status set to pending');
    } catch (error) {
      console.error('Error setting KYC to pending:', error);
      toast.error('Failed to update KYC status');
    }
  };



  const handleEdit = () => {
    if (selectedUser) {
      setEditingUser(selectedUser);
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
        investors: parseInt(formData.get('investors')),
        profit: formData.get('profit'),
        equity: formData.get('equity'),
        exp: formData.get('exp'),
      };

      // Update the user via API
      const userId = selectedUser.id || selectedUser._id;
      await updateUserStatus(userId, selectedUser.status); // We'll update other fields separately if needed

      // Update local state
      setSelectedUser(prev => ({
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

if (isLoading) {
  return (
    <div className="loader-wrapper">
      <div className="loader1"></div>
    </div>
  );
}

  if (error) {
    return (
      <div className="app">
        <main className="main-content">
          <div style={{ padding: "40px", textAlign: "center", color: "red" }}>
            Error: {error}
            <br />
            <button className="btn outline" onClick={() => navigate('/investments')}>
              Back to Investors
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (!selectedUser) {
    return (
      <div className="app">
        <main className="main-content">
          
          <div style={{ padding: "40px", textAlign: "center" }}>
            Investor not found
            <br />
            <button className="btn outline" onClick={() => navigate('/investments')}>
              Back to Investors
            </button>
          </div>
        </main>
      </div>
    );
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
              <button className="btn green" onClick={handleSendEmail} disabled={isEmailSending}>
                <FaEnvelope /> {isEmailSending ? 'Sending...' : 'Send Email'}
              </button>
              <button className="btn orange" onClick={handleDeactivate}>
                <FaBan /> {selectedUser?.status === 'Active' ? 'Deactivate' : 'Activate'}
              </button>
              <button className="btn red" onClick={handleFreeze}>
                <FaSnowflake /> {selectedUser?.isFrozen ? 'Unfreeze' : 'Freeze'}
              </button>
              <button
                className="btn red"
                onClick={() => setShowDeleteDialog(true)}
              >
                <FaTrash /> {selectedUser?.status === 'Delete' ? 'Undelete' : 'Delete'}
              </button>
              <button
                className="btn outline"
                onClick={handleEdit}
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
                <span className="label">Phone:</span>
                <span className="value">{selectedUser.phone || '-'}</span>
              </p>
            </div>
            <div className="detail-row">
              <p>
                <span className="label">Username:</span>
                <span className="value">{selectedUser.username || '-'}</span>
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
                <span className="value">{selectedUser.broker || '-'}</span>
              </p>
              <p>
                <span className="label">Joined:</span>
                <span className="value">{selectedUser.joined}</span>
              </p>
            </div>
            <div className="detail-row">
              <p>
                <span className="label">KYC Status:</span>
                <span className={`value ${selectedUser.kycStatus === 'APPROVED' ? 'status-active' : 'status-pending'}`}>
                  {selectedUser.kycStatus || '-'}
                </span>
              </p>
              <p>
                <span className="label">Verification Method:</span>
                <span className="value">{selectedUser.verificationMethod || 'NONE'}</span>
              </p>
            </div>
            <div className="detail-row">
              <p>
                <span className="label">Profile Completed:</span>
                <span className={`value ${selectedUser.profileCompleted ? 'status-active' : 'status-pending'}`}>
                  {selectedUser.profileCompleted ? 'Yes' : 'No'}
                </span>
              </p>
              <p>
                <span className="label">Email Verified:</span>
                <span className={`value ${selectedUser.isEmailVerified ? 'status-active' : 'status-pending'}`}>
                  {selectedUser.isEmailVerified ? 'Yes' : 'No'}
                </span>
              </p>
            </div>
            <div className="detail-row">
              <p>
                <span className="label">Account Frozen:</span>
                <span className={`value ${selectedUser.isFrozen ? 'status-withdraw' : 'status-active'}`}>
                  {selectedUser.isFrozen ? 'Yes' : 'No'}
                </span>
              </p>
              <p>
                <span className="label">Last Login:</span>
                <span className="value">
                  {selectedUser.lastLoginAt
                    ? new Date(selectedUser.lastLoginAt).toLocaleString()
                    : '-'}
                </span>
              </p>
            </div>
            {selectedUser.verificationCompleted && (
              <div className="detail-row">
                <p>
                  <span className="label">CNIC Verified:</span>
                  <span className={`value ${selectedUser.verificationCompleted.cnic ? 'status-active' : 'status-pending'}`}>
                    {selectedUser.verificationCompleted.cnic ? 'Yes' : 'No'}
                  </span>
                </p>
                <p>
                  <span className="label">Face ID Verified:</span>
                  <span className={`value ${selectedUser.verificationCompleted.faceId ? 'status-active' : 'status-pending'}`}>
                    {selectedUser.verificationCompleted.faceId ? 'Yes' : 'No'}
                  </span>
                </p>
              </div>
            )}
            {selectedUser.kycReview && (
              <div className="detail-row">
                <p>
                  <span className="label">KYC Review Status:</span>
                  <span className={`value ${selectedUser.kycReview.status === 'APPROVED' ? 'status-active' : 'status-pending'}`}>
                    {selectedUser.kycReview.status || 'PENDING'}
                  </span>
                </p>

              </div>
            )}
            <div className="actions">
              <button
                className="btn green"
                onClick={handleSendEmail}
                disabled={isEmailSending}
              >
                <FaEnvelope /> {isEmailSending ? 'Sending...' : 'Send Email'}
              </button>
              <button
                className="btn outline"
                onClick={() => setShowKycDialog(true)}
              >
                <FaIdCard /> View KYC Documents
              </button>
              {selectedUser?.kycStatus === 'PENDING' && (
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

        {/* KYC Documents Section */}
        <div className="container" style={{ marginTop: '40px' }}>
          <h3 className="strategy-title">KYC Documents</h3>
          <div className="tabs-container">
            <div className="tabs">
              <button
                className={`tabs ${kycTab === 'documents' ? 'active' : ''}`}
                onClick={() => setKycTab('documents')}
              >
                Documents
              </button>
              <button
                className={`tabs ${kycTab === 'status' ? 'active' : ''}`}
                onClick={() => setKycTab('status')}
              >
                Document Status
              </button>
            </div>
          </div>

          {/* Documents Tab */}
          <div className={`tab-content-wrapper ${kycTab === 'documents' ? 'active' : ''}`}>
            {kycTab === 'documents' && (
              <div className="tab-content">
                <h4 className="content-title">Uploaded Documents</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
                  {/* CNIC Front */}
                  <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', background: '#fff' }}>
                    <h5 style={{ marginBottom: '10px' }}>CNIC Front</h5>
                    {selectedUser?.kycDocuments?.cnicFront?.url || selectedUser?.kycDocuments?.cnicFront?.filename ? (
                      <div>
                        <img
                          src={selectedUser.kycDocuments.cnicFront.url ?
                            (selectedUser.kycDocuments.cnicFront.url.startsWith('http') ?
                              selectedUser.kycDocuments.cnicFront.url :
                              `https://backend.greentrutle.com${selectedUser.kycDocuments.cnicFront.url}`) :
                            'https://via.placeholder.com/300x200?text=CNIC+Front'}
                          alt="CNIC Front"
                          style={{ width: '100%', height: 'auto', borderRadius: '4px', marginBottom: '10px' }}
                        />
                        <p style={{ fontSize: '12px', color: '#666' }}>
                          Uploaded: {selectedUser.kycDocuments.cnicFront.uploadedAt ?
                            new Date(selectedUser.kycDocuments.cnicFront.uploadedAt).toLocaleDateString() :
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
                    {selectedUser?.kycDocuments?.cnicBack?.url || selectedUser?.kycDocuments?.cnicBack?.filename ? (
                      <div>
                        <img
                          src={selectedUser.kycDocuments.cnicBack.url ?
                            (selectedUser.kycDocuments.cnicBack.url.startsWith('http') ?
                              selectedUser.kycDocuments.cnicBack.url :
                              `https://backend.greentrutle.com${selectedUser.kycDocuments.cnicBack.url}`) :
                            'https://via.placeholder.com/300x200?text=CNIC+Back'}
                          alt="CNIC Back"
                          style={{ width: '100%', height: 'auto', borderRadius: '4px', marginBottom: '10px' }}
                        />
                        <p style={{ fontSize: '12px', color: '#666' }}>
                          Uploaded: {selectedUser.kycDocuments.cnicBack.uploadedAt ?
                            new Date(selectedUser.kycDocuments.cnicBack.uploadedAt).toLocaleDateString() :
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
                    {selectedUser?.kycDocuments?.facePicture?.url || selectedUser?.kycDocuments?.facePicture?.filename ? (
                      <div>
                        <img
                          src={selectedUser.kycDocuments.facePicture.url ?
                            (selectedUser.kycDocuments.facePicture.url.startsWith('http') ?
                              selectedUser.kycDocuments.facePicture.url :
                              `https://backend.greentrutle.com${selectedUser.kycDocuments.facePicture.url}`) :
                            'https://via.placeholder.com/300x300?text=Face+Picture'}
                          alt="Face Picture"
                          style={{ width: '100%', height: 'auto', borderRadius: '4px', marginBottom: '10px' }}
                        />
                        <p style={{ fontSize: '12px', color: '#666' }}>
                          Uploaded: {selectedUser.kycDocuments.facePicture.uploadedAt ?
                            new Date(selectedUser.kycDocuments.facePicture.uploadedAt).toLocaleDateString() :
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
            )}
          </div>

          {/* Document Status Tab */}
          <div className={`tab-content-wrapper ${kycTab === 'status' ? 'active' : ''}`}>
            {kycTab === 'status' && (
              <div className="tab-content">
                <h4 className="content-title">Document Status</h4>
                <table className="transactions-table" style={{ marginTop: '20px' }}>
                  <thead>
                    <tr>
                      <th>Document Type</th>
                      <th>Uploaded</th>
                      <th>Verification Status</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* CNIC Front Status */}
                    <tr>
                      <td><strong>CNIC Front</strong></td>
                      <td>
                        {selectedUser?.kycDocuments?.cnicFront?.url || selectedUser?.kycDocuments?.cnicFront?.filename ? (
                          <span className="status-actives">Yes</span>
                        ) : (
                          <span style={{ color: '#999', fontStyle: 'italic' }}>Not Uploaded</span>
                        )}
                      </td>
                      <td>
                        {selectedUser?.kycDocuments?.cnicFront?.verified ? (
                          <span className="status-actives">Verified</span>
                        ) : (
                          <span className="status-pendings">Not Verified</span>
                        )}
                      </td>
                      <td>
                        {selectedUser?.kycDocuments?.cnicFront?.url || selectedUser?.kycDocuments?.cnicFront?.filename ? (
                          <span className="status-actives">Uploaded</span>
                        ) : (
                          <span style={{ color: '#999' }}>Pending</span>
                        )}
                      </td>
                    </tr>

                    {/* CNIC Back Status */}
                    <tr>
                      <td><strong>CNIC Back</strong></td>
                      <td>
                        {selectedUser?.kycDocuments?.cnicBack?.url || selectedUser?.kycDocuments?.cnicBack?.filename ? (
                          <span className="status-actives">Yes</span>
                        ) : (
                          <span style={{ color: '#999', fontStyle: 'italic' }}>Not Uploaded</span>
                        )}
                      </td>
                      <td>
                        {selectedUser?.kycDocuments?.cnicBack?.verified ? (
                          <span className="status-actives">Verified</span>
                        ) : (
                          <span className="status-pendings">Not Verified</span>
                        )}
                      </td>
                      <td>
                        {selectedUser?.kycDocuments?.cnicBack?.url || selectedUser?.kycDocuments?.cnicBack?.filename ? (
                          <span className="status-actives">Uploaded</span>
                        ) : (
                          <span style={{ color: '#999' }}>Pending</span>
                        )}
                      </td>
                    </tr>

                    {/* Face Picture Status */}
                    <tr>
                      <td><strong>Face Picture</strong></td>
                      <td>
                        {selectedUser?.kycDocuments?.facePicture?.url || selectedUser?.kycDocuments?.facePicture?.filename ? (
                          <span className="status-actives">Yes</span>
                        ) : (
                          <span style={{ color: '#999', fontStyle: 'italic' }}>Not Uploaded</span>
                        )}
                      </td>
                      <td>
                        {selectedUser?.kycDocuments?.facePicture?.verified ? (
                          <span className="status-actives">Verified</span>
                        ) : (
                          <span className="status-pendings">Not Verified</span>
                        )}
                      </td>
                      <td>
                        {selectedUser?.kycDocuments?.facePicture?.url || selectedUser?.kycDocuments?.facePicture?.filename ? (
                          <span className="status-actives">Uploaded</span>
                        ) : (
                          <span style={{ color: '#999' }}>Pending</span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Overall KYC Status */}
                <div style={{ marginTop: '30px', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
                  <h4 style={{ marginBottom: '15px' }}>Overall KYC Status</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                    <div>
                      <p><span className="label">KYC Review Status:</span></p>
                      <p>
                        <span className={`value ${selectedUser?.kycReview?.status === 'APPROVED' ? 'status-active' : 'status-pending'}`}>
                          {selectedUser?.kycReview?.status || 'PENDING'}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p><span className="label">CNIC Verified:</span></p>
                      <p>
                        <span className={`value ${selectedUser?.verificationCompleted?.cnic ? 'status-active' : 'status-pending'}`}>
                          {selectedUser?.verificationCompleted?.cnic ? 'Yes' : 'No'}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p><span className="label">Face ID Verified:</span></p>
                      <p>
                        <span className={`value ${selectedUser?.verificationCompleted?.faceId ? 'status-active' : 'status-pending'}`}>
                          {selectedUser?.verificationCompleted?.faceId ? 'Yes' : 'No'}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p><span className="label">Verification Method:</span></p>
                      <p>
                        <span className="value">{selectedUser?.verificationMethod || 'NONE'}</span>
                      </p>
                    </div>
                  </div>
                </div>
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

        {showKycDialog && selectedUser && (
          <div className="modal" onClick={() => setShowKycDialog(false)}>
            <div className="modal-content kyc-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '900px', maxHeight: '90vh', overflowY: 'auto' }}>
              <div className="modal-header">
                <h3 className="dialog-title">KYC Documents</h3>
                <button className="modal-close" onClick={() => setShowKycDialog(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className="kyc-content" style={{ padding: '20px' }}>
                {/* KYC Review Status */}
                {selectedUser.kycReview && (
                  <div style={{ marginBottom: '20px', padding: '15px', background: '#f5f5f5', borderRadius: '8px' }}>
                    <h4 style={{ marginBottom: '10px' }}>KYC Review Status</h4>
                    <p>
                      <span className="label">Status:</span>
                      <span className={`value ${selectedUser.kycReview.status === 'APPROVED' ? 'status-active' : 'status-pending'}`}>
                        {selectedUser.kycReview.status || 'PENDING'}
                      </span>
                    </p>
                  </div>
                )}

                {/* CNIC Front */}
                <div style={{ marginBottom: '30px' }}>
                  <h4 style={{ marginBottom: '15px' }}>CNIC Front</h4>
                  {selectedUser.kycDocuments?.cnicFront?.url || selectedUser.kycDocuments?.cnicFront?.filename ? (
                    <div>
                      <div style={{ marginBottom: '10px', border: '1px solid #ddd', borderRadius: '8px', padding: '10px', background: '#fff' }}>
                        <img
                          src={selectedUser.kycDocuments.cnicFront.url ?
                            (selectedUser.kycDocuments.cnicFront.url.startsWith('http') ?
                              selectedUser.kycDocuments.cnicFront.url :
                              `https://backend.greentrutle.com${selectedUser.kycDocuments.cnicFront.url}`) :
                            'https://via.placeholder.com/400x250?text=CNIC+Front'}
                          alt="CNIC Front"
                          style={{ width: '100%', maxWidth: '400px', height: 'auto', borderRadius: '4px' }}
                        />
                      </div>
                      <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
                        <p>
                          <span className="label">Verified:</span>
                          <span className={`value ${selectedUser.kycDocuments.cnicFront.verified ? 'status-active' : 'status-pending'}`}>
                            {selectedUser.kycDocuments.cnicFront.verified ? 'Yes' : 'No'}
                          </span>
                        </p>
                        {selectedUser.kycDocuments.cnicFront.uploadedAt && (
                          <p>
                            <span className="label">Uploaded:</span>
                            <span className="value">
                              {new Date(selectedUser.kycDocuments.cnicFront.uploadedAt).toLocaleString()}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p style={{ color: '#999', fontStyle: 'italic' }}>No CNIC Front document uploaded</p>
                  )}
                </div>

                {/* CNIC Back */}
                <div style={{ marginBottom: '30px' }}>
                  <h4 style={{ marginBottom: '15px' }}>CNIC Back</h4>
                  {selectedUser.kycDocuments?.cnicBack?.url || selectedUser.kycDocuments?.cnicBack?.filename ? (
                    <div>
                      <div style={{ marginBottom: '10px', border: '1px solid #ddd', borderRadius: '8px', padding: '10px', background: '#fff' }}>
                        <img
                          src={selectedUser.kycDocuments.cnicBack.url ?
                            (selectedUser.kycDocuments.cnicBack.url.startsWith('http') ?
                              selectedUser.kycDocuments.cnicBack.url :
                              `https://backend.greentrutle.com${selectedUser.kycDocuments.cnicBack.url}`) :
                            'https://via.placeholder.com/400x250?text=CNIC+Back'}
                          alt="CNIC Back"
                          style={{ width: '100%', maxWidth: '400px', height: 'auto', borderRadius: '4px' }}
                        />
                      </div>
                      <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
                        <p>
                          <span className="label">Verified:</span>
                          <span className={`value ${selectedUser.kycDocuments.cnicBack.verified ? 'status-active' : 'status-pending'}`}>
                            {selectedUser.kycDocuments.cnicBack.verified ? 'Yes' : 'No'}
                          </span>
                        </p>
                        {selectedUser.kycDocuments.cnicBack.uploadedAt && (
                          <p>
                            <span className="label">Uploaded:</span>
                            <span className="value">
                              {new Date(selectedUser.kycDocuments.cnicBack.uploadedAt).toLocaleString()}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p style={{ color: '#999', fontStyle: 'italic' }}>No CNIC Back document uploaded</p>
                  )}
                </div>

                {/* Face Picture */}
                <div style={{ marginBottom: '30px' }}>
                  <h4 style={{ marginBottom: '15px' }}>Face Picture</h4>
                  {selectedUser.kycDocuments?.facePicture?.url || selectedUser.kycDocuments?.facePicture?.filename ? (
                    <div>
                      <div style={{ marginBottom: '10px', border: '1px solid #ddd', borderRadius: '8px', padding: '10px', background: '#fff' }}>
                        <img
                          src={selectedUser.kycDocuments.facePicture.url ?
                            (selectedUser.kycDocuments.facePicture.url.startsWith('http') ?
                              selectedUser.kycDocuments.facePicture.url :
                              `https://backend.greentrutle.com${selectedUser.kycDocuments.facePicture.url}`) :
                            'https://via.placeholder.com/400x400?text=Face+Picture'}
                          alt="Face Picture"
                          style={{ width: '100%', maxWidth: '400px', height: 'auto', borderRadius: '4px' }}
                        />
                      </div>
                      <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
                        <p>
                          <span className="label">Verified:</span>
                          <span className={`value ${selectedUser.kycDocuments.facePicture.verified ? 'status-active' : 'status-pending'}`}>
                            {selectedUser.kycDocuments.facePicture.verified ? 'Yes' : 'No'}
                          </span>
                        </p>
                        {selectedUser.kycDocuments.facePicture.uploadedAt && (
                          <p>
                            <span className="label">Uploaded:</span>
                            <span className="value">
                              {new Date(selectedUser.kycDocuments.facePicture.uploadedAt).toLocaleString()}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p style={{ color: '#999', fontStyle: 'italic' }}>No Face Picture uploaded</p>
                  )}
                </div>

                {/* Verification Completed Summary */}
                {selectedUser.verificationCompleted && (
                  <div style={{ marginTop: '20px', padding: '15px', background: '#f5f5f5', borderRadius: '8px' }}>
                    <h4 style={{ marginBottom: '10px' }}>Verification Summary</h4>
                    <div style={{ display: 'flex', gap: '30px' }}>
                      <p>
                        <span className="label">CNIC Verified:</span>
                        <span className={`value ${selectedUser.verificationCompleted.cnic ? 'status-active' : 'status-pending'}`}>
                          {selectedUser.verificationCompleted.cnic ? 'Yes' : 'No'}
                        </span>
                      </p>
                      <p>
                        <span className="label">Face ID Verified:</span>
                        <span className={`value ${selectedUser.verificationCompleted.faceId ? 'status-active' : 'status-pending'}`}>
                          {selectedUser.verificationCompleted.faceId ? 'Yes' : 'No'}
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="kyc-actions" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                {selectedUser?.kycStatus === 'PENDING' && (
                  <>
                    <button className="btn green" onClick={handleKycApprove}>
                      Approve KYC
                    </button>
                    <button className="btn red" onClick={handleKycReject}>
                      Reject KYC
                    </button>
                    <button className="btn orange" onClick={handleKycPending}>
                      Set to Pending
                    </button>
                  </>
                )}
                <button className="btn outline" onClick={() => setShowKycDialog(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {showForm && (
          <div className="modal">
            <div className="modal-content small">
              <h3>{editingUser ? 'Edit User' : 'Add User'}</h3>
              <form onSubmit={handleEditSubmit} className="form">
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

        {showDeleteDialog && (
          <div className="modal">
            <div className="modal-content small">
              <div className="modal-header">
                <h3>Confirm Action</h3>
                <button className="modal-close" onClick={() => setShowDeleteDialog(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to {selectedUser?.status === 'Delete' ? 'undelete' : 'delete'} this user?</p>
                <p className="warning-text">This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn red"
                  onClick={confirmDelete}
                >
                  {selectedUser?.status === 'Delete' ? 'Undelete' : 'Delete'}
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

        {showEmailDialog && (
          <div className="modal" onClick={() => setShowEmailDialog(false)}>
            <div className="modal-content small email-dialog" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>
                  <Mail size={24} />
                  Send Email
                </h3>
                <button className="modal-close" onClick={() => setShowEmailDialog(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleEmailSubmit} className="form">
                  <div className="form-group">
                    <label>
                      <AtSign size={16} />
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      defaultValue={selectedUser?.email || ''}
                      className="form-control"
                      placeholder="recipient@example.com"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <FileText size={16} />
                      Subject
                    </label>
                    <input
                      name="subject"
                      type="text"
                      placeholder="Enter email subject"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <MessageSquare size={16} />
                      Message
                    </label>
                    <textarea
                      name="message"
                      placeholder="Enter your message here..."
                      className="form-control"
                      rows="6"
                      required
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn outline"
                      onClick={() => setShowEmailDialog(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn green"
                      disabled={isEmailSending}
                    >
                      <Send size={16} />
                      {isEmailSending ? 'Sending...' : 'Send Email'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}


      </main>
    </div>
  );
};

export default InvestorProfile;