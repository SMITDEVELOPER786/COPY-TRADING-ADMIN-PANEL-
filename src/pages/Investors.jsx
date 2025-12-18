import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../Users.css";
import { getUsers } from "../services/user.service";
import {
  FaEnvelope,
  FaBan,
  FaSnowflake,
  FaTrash,
  FaIdCard,
  FaPhone,
  FaEdit,
  FaPlus,
} from "react-icons/fa";
import { MoreHorizontal, Search, Calendar, ChevronDown, Eye, Edit, Trash2, FileText } from "lucide-react";

const Investors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(null);
  const [activeTab, setActiveTab] = useState("all"); // "all", "kyc-approval", "kyc-submit"
  const params = useParams();
  const navigate = useNavigate();

  const itemsPerPage = 10;

  // ==================== STATE MANAGEMENT ====================
  const [usersData, setUsersData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
      phone: apiUser.phone || '',
      type: apiUser.role || 'INVESTOR',
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
      status: apiUser.kycStatus === 'APPROVED' ? 'Active' : 
              apiUser.kycStatus === 'PENDING' ? 'PENDING' : 
              apiUser.isFrozen ? 'Delete' : 'Active',
      kycStatus: apiUser.kycStatus,
      isFrozen: apiUser.isFrozen,
      avatar: apiUser.profileImage?.url || apiUser.avatar || apiUser.profilePicture || 'https://via.placeholder.com/40',
      investors: apiUser.investors || 0,
      profit: apiUser.profit || '$0',
      equity: apiUser.equity || '0%',
      exp: apiUser.exp || '-',
      kycDocuments: apiUser.kycDocuments || {},
      kycReview: apiUser.kycReview || {},
    };
  };

  /**
   * Fetch investors from API - Simple: just pass role='INVESTOR'
   */
  const fetchInvestors = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simple: pass role='INVESTOR'
      const response = await getUsers({
        role: 'INVESTOR',
        all: true,
      });
      
      setUsersData(response);
    } catch (err) {
      console.error('Error fetching investors:', err);
      setError(err.message || 'Failed to fetch investors');
    } finally {
      setIsLoading(false);
    }
  };

  // ==================== DATA TRANSFORMATION ====================
  
  /**
   * Extract and transform investors from API response
   * API structure: { status: 'success', message: '...', data: { users: [...], total: 2, count: 2 } }
   */
  const users = useMemo(() => {
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
      console.error('Error transforming users:', error, { usersData });
      return [];
    }
  }, [usersData]);

  // ==================== DATE UTILITIES ====================
  
  const parseJoinedDate = (joinedStr) => {
    const monthNames = {
      'January': 0, 'February': 1, 'March': 2, 'April': 3,
      'May': 4, 'June': 5, 'July': 6, 'August': 7,
      'September': 8, 'October': 9, 'November': 10, 'December': 11
    };
    
    const parts = joinedStr.split(' ');
    if (parts.length === 3) {
      const day = parseInt(parts[0]);
      const month = monthNames[parts[1]];
      const year = parseInt(parts[2]);
      
      if (!isNaN(day) && month !== undefined && !isNaN(year)) {
        return new Date(year, month, day);
      }
    }
    return null;
  };

  const isDateMatch = (joinedStr, searchDate) => {
    if (!searchDate || !joinedStr) return true;
    
    let joinedDate = null;
    if (joinedStr.includes('T') || (joinedStr.includes('-') && joinedStr.length > 10)) {
      joinedDate = new Date(joinedStr);
    } else {
      joinedDate = parseJoinedDate(joinedStr);
    }
    
    if (!joinedDate || isNaN(joinedDate.getTime())) return false;
    
    const year = joinedDate.getFullYear().toString();
    const month = String(joinedDate.getMonth() + 1).padStart(2, '0');
    const day = String(joinedDate.getDate()).padStart(2, '0');
    
    if (searchDate.length === 4) {
      return year === searchDate;
    } else if (searchDate.length === 7 && searchDate.includes('-')) {
      return `${year}-${month}` === searchDate;
    } else if (searchDate.length === 10 && searchDate.includes('-')) {
      return `${year}-${month}-${day}` === searchDate;
    } else {
      return joinedStr.toLowerCase().includes(searchDate.toLowerCase());
    }
  };

  // ==================== API CALLS ====================
  
  useEffect(() => {
    fetchInvestors();
  }, []);

  // ==================== FILTERS & PAGINATION ====================
  
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedStatus, selectedDate, activeTab]);

  // Check if user has submitted KYC documents
  const hasKycDocuments = (user) => {
    const docs = user.kycDocuments || {};
    return !!(docs.cnicFront?.url || docs.cnicFront?.filename || 
              docs.cnicBack?.url || docs.cnicBack?.filename || 
              docs.facePicture?.url || docs.facePicture?.filename);
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchMatch = !searchTerm || 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const statusMatch = !selectedStatus || user.status === selectedStatus;
      
      const dateMatch = !selectedDate || 
        (user.joined && isDateMatch(user.joined, selectedDate)) ||
        (user.createdAt && isDateMatch(user.createdAt, selectedDate));
      
      // Tab-based filtering
      let tabMatch = true;
      if (activeTab === "kyc-approval") {
        // Show users with KYC status (APPROVED, PENDING, REJECTED, etc.)
        tabMatch = !!(user.kycStatus && user.kycStatus !== '');
      } else if (activeTab === "kyc-submit") {
        // Show users who have submitted KYC documents
        tabMatch = hasKycDocuments(user);
      }
      
      return searchMatch && statusMatch && dateMatch && tabMatch;
    });
  }, [users, searchTerm, selectedStatus, selectedDate, activeTab]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  // ==================== EVENT HANDLERS ====================
  
  const toggleMenu = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  const handleAction = (user, action) => {
    const userId = user.id || user._id;
    if (action === "view") {
      // Navigate to investor profile
      navigate(`/investment/1/investor/${userId}`);
    } else if (action === "viewKyc") {
      // Navigate to investor profile with KYC tab focus
      navigate(`/investment/1/investor/${userId}?tab=kyc`);
    } else if (action === "edit") {
      // TODO: Implement edit
      console.log('Edit user:', user);
    } else if (action === "remove") {
      // TODO: Implement remove
      console.log('Remove user:', user);
    }
    setMenuOpen(null);
  };

  const getStatusClass = (status) => {
    console.log('Status:', status);
    switch (status) {
      case "Active":
        return "status-active";
      case "Deactivate":
        return "status-pending";
      case "Delete":
        return "status-withdraw";
      default:
        return "status-active";
    }
  };

  // ==================== RENDER ====================
  
  return (
    <div className="app users-component">
      <main className="main-content">
        <div className="page-header">
          <h2 className="page-title">
            Investors <span className="sub-title">› Investor List</span>
          </h2>
        </div>

        {/* Tabs */}
        <div className="investor-tabs-container">
          <button
            className={`investor-tab ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All Investors
          </button>
          <button
            className={`investor-tab ${activeTab === "kyc-approval" ? "active" : ""}`}
            onClick={() => setActiveTab("kyc-approval")}
          >
            KYC Approval
          </button>
          <button
            className={`investor-tab ${activeTab === "kyc-submit" ? "active" : ""}`}
            onClick={() => setActiveTab("kyc-submit")}
          >
            KYC Submit Type
          </button>
        </div>

        <div className="filters-container">
          <div className="reports-search-container">
            <div className="reports-search-input-wrapper">
              <Search className="search-icon" size={18} />
              <input
                type="text"
                placeholder="Search by Name or Email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="reports-search-input"
              />
            </div>
          </div>

          <div className="filter-controls">
            <div className="reports-date-filter">
              <input
                type="text"
                placeholder="Search Date (YYYY, YYYY-MM, YYYY-MM-DD)"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="date-input"
              />
              <Calendar className="date-icon" size={16} />
            </div>
            <div className="kyc-status-filter">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="kyc-status-select"
              >
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Deactivate">Deactivate</option>
                <option value="Delete">Delete</option>
              </select>
              <ChevronDown className="kyc-select-icon" size={16} />
            </div>
          </div>
        </div>

        <div className="table-container">
          {isLoading && (
            <div style={{ padding: "20px", textAlign: "center" }}>
              Loading investors...
            </div>
          )}
          {error && (
            <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
              Error loading investors: {error}
            </div>
          )}
          {!isLoading && !error && (
            <table className="team-table">
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Email</th>
                  <th>Type</th>
                  <th>Wallet</th>
                  <th>Joined</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                      No investors found
                    </td>
                  </tr>
                ) : (
                  currentUsers.map((user, index) => (
                    <tr key={user.id}>
                      <td data-label="Member">
                        <div className="user-cell">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="user-avatar"
                          />
                          <span className="user-name">{user.name}</span>
                        </div>
                      </td>
                      <td data-label="Email">{user.email}</td>
                      <td data-label="Type">{user.type}</td>
                      <td data-label="Wallet">{user.wallet}</td>
                      <td data-label="Joined">{user.joined}</td>
                      <td data-label="Status">
                        <span className={`status-badge ${getStatusClass(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td data-label="Actions" className="team-actions">
                        <div className="team-action-menu">
                          <button
                            className="team-action-btn"
                            onClick={() => toggleMenu(user.id || user._id)}
                          >
                            <MoreHorizontal size={16} />
                          </button>
                          {menuOpen === (user.id || user._id) && (
                            <div
                              className={`team-dropdown-menu ${
                                index >= currentUsers.length - 2 ? "drop-up" : ""
                              }`}
                            >
                              <button onClick={() => handleAction(user, "view")}>
                                <Eye size={14} /> View Profile
                              </button>
                              {hasKycDocuments(user) && (
                                <button onClick={() => handleAction(user, "viewKyc")}>
                                  <FileText size={14} /> View KYC
                                </button>
                              )}
                              <button onClick={() => handleAction(user, "edit")}>
                                <Edit size={14} /> Edit
                              </button>
                              <button onClick={() => handleAction(user, "remove")}>
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

        <div className="table-footer">
          <div className="showing-info">
            {isLoading ? (
              "Loading..."
            ) : error ? (
              `Error: ${error}`
            ) : (
              `Showing: ${currentUsers.length} of ${filteredUsers.length}${usersData?.total ? ` (Total: ${usersData.total})` : ''} Entries`
            )}
          </div>
          {!isLoading && !error && totalPages > 0 && (
            <div className="pagination">
              <button
                className="pagination-button"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <div className="pagination-numbers">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    className={`pagination-number ${i + 1 === currentPage ? "active" : ""}`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                className="pagination-button"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Investors;

