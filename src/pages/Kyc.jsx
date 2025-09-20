import React, { useState, useEffect } from 'react';
import { Search, MoreHorizontal, ChevronLeft, ChevronRight, ChevronDown, Calendar, CheckCircle, XCircle, Eye } from 'lucide-react';
import '../KYC.css';

const initialKYCData = [
  {
    id: 1,
    user: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    userType: 'Participant',
    email: 'maria.khan@gmail.com',
    document: 'CNIC',
    documentDetails: '12345-6789012-3',
    date: 'Tue 29 June',
    status: 'Pending'
  },
  {
    id: 2,
    user: { name: 'John Doe', avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    userType: 'Investor',
    email: 'john.doe@gmail.com',
    document: 'Face ID',
    documentDetails: 'Face recognition verified',
    date: 'Mon 28 June',
    status: 'Pending'
  },
  {
    id: 3,
    user: { name: 'Jane Smith', avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    userType: 'Participant',
    email: 'jane.smith@gmail.com',
    document: 'CNIC',
    documentDetails: '98765-4321098-7',
    date: 'Sun 27 June',
    status: 'Pending'
  },
  {
    id: 4,
    user: { name: 'Alex Johnson', avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    userType: 'Trader',
    email: 'alex.johnson@gmail.com',
    document: 'CNIC',
    documentDetails: '11111-2222222-4',
    date: 'Sat 26 June',
    status: 'Pending'
  },
  {
    id: 5,
    user: { name: 'Emily Davis', avatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    userType: 'Participant',
    email: 'emily.davis@gmail.com',
    document: 'CNIC',
    documentDetails: '55555-6666666-5',
    date: 'Fri 25 June',
    status: 'Pending'
  },
  {
    id: 6,
    user: { name: 'Michael Brown', avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    userType: 'Investor',
    email: 'michael.brown@gmail.com',
    document: 'CNIC',
    documentDetails: '77777-8888888-6',
    date: 'Thu 24 June',
    status: 'Pending'
  },
  {
    id: 7,
    user: { name: 'Sarah Wilson', avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    userType: 'Trader',
    email: 'sarah.wilson@gmail.com',
    document: 'CNIC',
    documentDetails: '99999-0000000-7',
    date: 'Wed 23 June',
    status: 'Pending'
  },
  {
    id: 8,
    user: { name: 'David Garcia', avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    userType: 'Participant',
    email: 'david.garcia@gmail.com',
    document: 'CNIC',
    documentDetails: '33333-4444444-8',
    date: 'Tue 22 June',
    status: 'Pending'
  },
  {
    id: 9,
    user: { name: 'Lisa Martinez', avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    userType: 'Investor',
    email: 'lisa.martinez@gmail.com',
    document: 'CNIC',
    documentDetails: '66666-7777777-9',
    date: 'Mon 21 June',
    status: 'Pending'
  },
  {
    id: 10,
    user: { name: 'Robert Anderson', avatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    userType: 'Trader',
    email: 'robert.anderson@gmail.com',
    document: 'CNIC',
    documentDetails: '00000-1111111-0',
    date: 'Sun 20 June',
    status: 'Pending'
  }
];

function KYC() {
  const [kycData, setKycData] = useState(() => {
    const savedData = localStorage.getItem('kycData');
    try {
      const parsedData = savedData ? JSON.parse(savedData) : null;
      if (parsedData && Array.isArray(parsedData)) {
        return parsedData;
      }
      return initialKYCData;
    } catch (e) {
      console.error('Error parsing localStorage data:', e);
      return initialKYCData;
    }
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedReportTitle, setSelectedReportTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(null);
  const [selectedKYC, setSelectedKYC] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    localStorage.setItem('kycData', JSON.stringify(kycData));
  }, [kycData]);

  const handleStatusChange = (id, newStatus) => {
    setKycData(prev => prev.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ));
    setMenuOpen(null);
  };

  const handleViewDetails = (kyc) => {
    setSelectedKYC(kyc);
    setIsDetailsModalOpen(true);
    setMenuOpen(null);
  };

  const toggleMenu = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  const filteredKYC = kycData.filter(kyc =>
    (kyc.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     kyc.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedStatus === '' || kyc.status === selectedStatus) &&
    (selectedReportTitle === '' || kyc.document === selectedReportTitle) &&
    (selectedDate === '' || kyc.date.includes(selectedDate))
  );

  const totalPages = Math.ceil(filteredKYC.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentKYC = filteredKYC.slice(startIndex, endIndex);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Successful':
        return 'status-successful';
      case 'Failed':
        return 'status-failed';
      case 'Pending':
        return 'status-pending';
      default:
        return 'status-pending';
    }
  };

  const DetailsModal = () => (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '24px',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          width: '400px',
          maxHeight: '80vh',
          overflowY: 'auto',
          fontFamily: 'inherit',
        }}
      >
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#1f2937',
            marginBottom: '16px',
            textAlign: 'center',
          }}
        >
          User Details
        </h3>
        {selectedKYC && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '14px', fontWeight: 500, color: '#6b7280' }}>Name:</label>
              <p style={{ fontSize: '14px', color: '#1f2937' }}>{selectedKYC.user.name}</p>
            </div>
            <div>
              <label style={{ fontSize: '14px', fontWeight: 500, color: '#6b7280' }}>Email:</label>
              <p style={{ fontSize: '14px', color: '#1f2937' }}>{selectedKYC.email}</p>
            </div>
            <div>
              <label style={{ fontSize: '14px', fontWeight: 500, color: '#6b7280' }}>User Type:</label>
              <p style={{ fontSize: '14px', color: '#1f2937' }}>{selectedKYC.userType}</p>
            </div>
            <div>
              <label style={{ fontSize: '14px', fontWeight: 500, color: '#6b7280' }}>Document Type:</label>
              <p style={{ fontSize: '14px', color: '#1f2937' }}>{selectedKYC.document}</p>
            </div>
            <div>
              <label style={{ fontSize: '14px', fontWeight: 500, color: '#6b7280' }}>Document Details:</label>
              <p style={{ fontSize: '14px', color: '#1f2937' }}>{selectedKYC.documentDetails}</p>
            </div>
            <div>
              <label style={{ fontSize: '14px', fontWeight: 500, color: '#6b7280' }}>Date:</label>
              <p style={{ fontSize: '14px', color: '#1f2937' }}>{selectedKYC.date}</p>
            </div>
            <div>
              <label style={{ fontSize: '14px', fontWeight: 500, color: '#6b7280' }}>Status:</label>
              <span className={`status-badge ${getStatusClass(selectedKYC.status)}`}>
                {selectedKYC.status}
              </span>
            </div>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '20px' }}>
          <button
            onClick={() => setIsDetailsModalOpen(false)}
            style={{
              padding: '8px 20px',
              background: '#f3f4f6',
              color: '#6b7280',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}
            onMouseOver={(e) => (e.target.style.background = '#e5e7eb')}
            onMouseOut={(e) => (e.target.style.background = '#f3f4f6')}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <div className="kyc-page">
          <div className="page-header">
            <h2 className="page-titlees">
              Dashboard <span className="sub-titlees">› KYC</span>
            </h2>         
          </div>
          
          <div className="kyc-filters-container">
            <div className="kyc-search-container">
              <div className="kyc-search-input-wrapper">
                <Search className="kyc-search-icon" size={20} />
                <input type="text" placeholder="Search User" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="kyc-search-input" />
              </div>
            </div>
            <div className="kyc-filter-controls">
              <div className="kyc-status-filter">
                <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="kyc-status-select">
                  <option value="">Status</option><option value="Successful">Successful</option><option value="Failed">Failed</option><option value="Pending">Pending</option>
                </select>
                <ChevronDown className="kyc-select-icon" size={16} />
              </div>
              <div className="kyc-report-filter">
                <select value={selectedReportTitle} onChange={(e) => setSelectedReportTitle(e.target.value)} className="kyc-report-select">
                  <option value="">Document Type</option><option value="CNIC">CNIC</option><option value="Face ID">Face ID</option>
                </select>
                <ChevronDown className="kyc-select-icon" size={16} />
              </div>
              <div className="kyc-date-filter">
                <input type="text" placeholder="Select Date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="kyc-date-input" />
                <Calendar className="kyc-date-icon" size={16} />
              </div>
            </div>
          </div>

          <div className="table-containers">
            <table className="kyc-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>User Type</th>
                  <th>Email</th>
                  <th>Document</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentKYC.map((kyc, index) => (
                  <tr key={kyc.id}>
                    <td data-label="User">
                      <div className="user-cell">
                        <img 
                          src={kyc.user.avatar} 
                          alt={kyc.user.name}
                          className="user-avatar"
                        />
                        <span className="user-name">{kyc.user.name}</span>
                      </div>
                    </td>
                    <td data-label="User Type" className="user-type">{kyc.userType}</td>
                    <td data-label="Email" className="email">{kyc.email}</td>
                    <td data-label="Document" className="document">{kyc.document}</td>
                    <td data-label="Date" className="date">{kyc.date}</td>
                    <td data-label="Status">
                      <span className={`status-badge ${getStatusClass(kyc.status)}`}>
                        {kyc.status}
                      </span>
                    </td>
                    <td data-label="Actions" className="kyc-actions">
                      <div className="kyc-action-menu">
                        <button 
                          className="kyc-action-btn"
                          onClick={() => toggleMenu(kyc.id)}
                          aria-label="More actions"
                        >
                          <MoreHorizontal size={16} />
                        </button>
                        {menuOpen === kyc.id && (
                          <div
                            className={`kyc-dropdown-menu ${index >= currentKYC.length - 2 ? 'drop-up' : ''}`}
                          >
                            <button onClick={() => handleViewDetails(kyc)}>
                              <Eye size={14} /> View Details
                            </button>
                            {kyc.status !== 'Pending' && (
                              <button onClick={() => handleStatusChange(kyc.id, 'Pending')}>
                                <CheckCircle size={14} color="#d97706" /> Pending
                              </button>
                            )}
                            {kyc.status !== 'Successful' && (
                              <button onClick={() => handleStatusChange(kyc.id, 'Successful')}>
                                <CheckCircle size={14} color="green" /> Approve
                              </button>
                            )}
                            {kyc.status !== 'Failed' && (
                              <button onClick={() => handleStatusChange(kyc.id, 'Failed')}>
                                <XCircle size={14} color="red" /> Reject
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            <div className="showing-info">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredKYC.length)} of {filteredKYC.length} entries
            </div>
            <div className="pagination">
              <button 
                className="pagination-button"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} />
              </button>
              
              <div className="pagination-numbers">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = currentPage + i - 2;
                  if (pageNum < 1 || pageNum > totalPages) return null;
                  return (
                    <button
                      key={pageNum}
                      className={`pagination-number ${pageNum === currentPage ? 'active' : ''}`}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button 
                className="pagination-button"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {isDetailsModalOpen && <DetailsModal />}
    </div>
  );
}

export default KYC;