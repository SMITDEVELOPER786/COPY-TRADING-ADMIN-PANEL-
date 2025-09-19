import React, { useState, useEffect } from 'react';
import { Search, MoreHorizontal, ChevronLeft, ChevronRight, ChevronDown, Calendar, CheckCircle, XCircle, Eye } from 'lucide-react';
import '../Investments.css';

const initialInvestmentsData = [
  {
    id: 1,
    investor: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    trader: { name: 'John Doe', avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    amount: '$2000',
    roi: '4.5%',
    dateInvested: 'Tue 29 June 2025',
    status: 'Active'
  },
  {
    id: 2,
    investor: { name: 'Jane Smith', avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    trader: { name: 'Alex Johnson', avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    amount: '$1500',
    roi: '3.2%',
    dateInvested: 'Mon 28 June 2025',
    status: 'Pending'
  },
  {
    id: 3,
    investor: { name: 'Emily Davis', avatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    trader: { name: 'Michael Brown', avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    amount: '$3000',
    roi: '5.8%',
    dateInvested: 'Sun 27 June 2025',
    status: 'Pending'
  },
  {
    id: 4,
    investor: { name: 'Sarah Wilson', avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    trader: { name: 'David Garcia', avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    amount: '$1000',
    roi: '2.1%',
    dateInvested: 'Sat 26 June 2025',
    status: 'Withdraw'
  },
  {
    id: 5,
    investor: { name: 'Lisa Martinez', avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    trader: { name: 'Robert Anderson', avatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    amount: '$2500',
    roi: '6.0%',
    dateInvested: 'Fri 25 June 2025',
    status: 'Active'
  },
  {
    id: 6,
    investor: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    trader: { name: 'John Doe', avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    amount: '$1800',
    roi: '4.0%',
    dateInvested: 'Thu 24 June 2025',
    status: 'Successful'
  },
  {
    id: 7,
    investor: { name: 'Jane Smith', avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    trader: { name: 'Alex Johnson', avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    amount: '$2200',
    roi: '5.2%',
    dateInvested: 'Wed 23 June 2025',
    status: 'Pending'
  },
  {
    id: 8,
    investor: { name: 'Emily Davis', avatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    trader: { name: 'Michael Brown', avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    amount: '$1200',
    roi: '3.8%',
    dateInvested: 'Tue 22 June 2025',
    status: 'Active'
  },
  {
    id: 9,
    investor: { name: 'Sarah Wilson', avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    trader: { name: 'David Garcia', avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    amount: '$2800',
    roi: '7.1%',
    dateInvested: 'Mon 21 June 2025',
    status: 'Successful'
  },
  {
    id: 10,
    investor: { name: 'Lisa Martinez', avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    trader: { name: 'Robert Anderson', avatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    amount: '$900',
    roi: '1.9%',
    dateInvested: 'Sun 20 June 2025',
    status: 'Withdraw'
  }
];

function Investments() {
  const [investmentsData, setInvestmentsData] = useState(() => {
    const savedData = localStorage.getItem('investmentsData');
    try {
      const parsedData = savedData ? JSON.parse(savedData) : null;
      if (parsedData && Array.isArray(parsedData)) {
        return parsedData;
      }
      return initialInvestmentsData;
    } catch (e) {
      console.error('Error parsing localStorage data:', e);
      return initialInvestmentsData;
    }
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(null);
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    localStorage.setItem('investmentsData', JSON.stringify(investmentsData));
  }, [investmentsData]);

  const handleStatusChange = (id, newStatus) => {
    setInvestmentsData(prev => prev.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ));
    setMenuOpen(null);
  };

  const handleViewDetails = (investment) => {
    setSelectedInvestment(investment);
    setIsDetailsModalOpen(true);
    setMenuOpen(null);
  };

  const filteredInvestments = investmentsData.filter(investment =>
    (investment.investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     investment.trader.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedStatus === '' || investment.status === selectedStatus) &&
    (selectedDate === '' || investment.dateInvested.toLowerCase().includes(selectedDate.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredInvestments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInvestments = filteredInvestments.slice(startIndex, endIndex);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Active':
        return 'status-active';
      case 'Pending':
        return 'status-pending';
      case 'Withdraw':
        return 'status-withdraw';
      case 'Successful':
        return 'status-successful';
      default:
        return 'status-active';
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
          width: '450px',
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
          Investment Details
        </h3>
        {selectedInvestment && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '14px', fontWeight: 500, color: '#6b7280' }}>Investor:</label>
              <p style={{ fontSize: '14px', color: '#1f2937' }}>{selectedInvestment.investor.name}</p>
            </div>
            <div>
              <label style={{ fontSize: '14px', fontWeight: 500, color: '#6b7280' }}>Trader:</label>
              <p style={{ fontSize: '14px', color: '#1f2937' }}>{selectedInvestment.trader.name}</p>
            </div>
            <div>
              <label style={{ fontSize: '14px', fontWeight: 500, color: '#6b7280' }}>Amount:</label>
              <p style={{ fontSize: '14px', color: '#1f2937' }}>{selectedInvestment.amount}</p>
            </div>
            <div>
              <label style={{ fontSize: '14px', fontWeight: 500, color: '#6b7280' }}>ROI:</label>
              <p style={{ fontSize: '14px', color: '#1f2937' }}>{selectedInvestment.roi}</p>
            </div>
            <div>
              <label style={{ fontSize: '14px', fontWeight: 500, color: '#6b7280' }}>Date Invested:</label>
              <p style={{ fontSize: '14px', color: '#1f2937' }}>{selectedInvestment.dateInvested}</p>
            </div>
            <div>
              <label style={{ fontSize: '14px', fontWeight: 500, color: '#6b7280' }}>Status:</label>
              <span className={`status-badge ${getStatusClass(selectedInvestment.status)}`}>
                {selectedInvestment.status}
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
        <div className="investments-page">
          <div className="page-header">
            <h2 className="page-tittless">
              Dashboard <span className="sub-tittless">› Investments</span>
            </h2>
          </div>
          
          <div className="filters-container">
            <div className="search-container">
              <div className="search-input-wrapper">
                <Search className="search-icon" size={20} />
                <input
                  type="text"
                  placeholder="Search Investor or Trader Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>
            
            <div className="filter-controls">
              <div className="status-filter">
                <select 
                  value={selectedStatus} 
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="status-select"
                >
                  <option value="">Status</option>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Withdraw">Withdraw</option>
                  <option value="Successful">Successful</option>
                </select>
                <ChevronDown className="select-icon" size={16} />
              </div>
              
              <div className="date-filter">
                <input
                  type="text"
                  placeholder="Select Date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="date-input"
                />
                <Calendar className="date-icon" size={16} />
              </div>
            </div>
          </div>

          <div className="table-containers">
            <table className="investments-table">
              <thead>
                <tr>
                  <th>Investor</th>
                  <th>Trader</th>
                  <th>Amount</th>
                  <th>ROI</th>
                  <th>Date Invested</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentInvestments.map((investment, index) => (
                  <tr key={investment.id}>
                    <td data-label="Investor">
                      <div className="user-cell">
                        <img 
                          src={investment.investor.avatar} 
                          alt={investment.investor.name}
                          className="user-avatar"
                        />
                        <span className="user-name">{investment.investor.name}</span>
                      </div>
                    </td>
                    <td data-label="Trader">
                      <div className="user-cell">
                        <img 
                          src={investment.trader.avatar} 
                          alt={investment.trader.name}
                          className="user-avatar"
                        />
                        <span className="user-name">{investment.trader.name}</span>
                      </div>
                    </td>
                    <td data-label="Amount" className="amount">{investment.amount}</td>
                    <td data-label="ROI" className="roi">{investment.roi}</td>
                    <td data-label="Date Invested" className="date">{investment.dateInvested}</td>
                    <td data-label="Status">
                      <span className={`status-badge ${getStatusClass(investment.status)}`}>
                        {investment.status}
                      </span>
                    </td>
                    <td data-label="Actions" className="investments-actions">
                      <div className="investments-action-menu">
                        <button 
                          className="investments-action-btn"
                          onClick={() => setMenuOpen(menuOpen === investment.id ? null : investment.id)}
                          aria-label="More actions"
                        >
                          <MoreHorizontal size={16} />
                        </button>
                        {menuOpen === investment.id && (
                          <div
                            className={`investments-dropdown-menu ${index >= currentInvestments.length - 2 ? 'drop-up' : ''}`}
                          >
                            {[
                              { status: 'Active', icon: <CheckCircle size={16} color="#166534" /> },
                              { status: 'Pending', icon: <CheckCircle size={16} color="#92400e" /> },
                              { status: 'Withdraw', icon: <XCircle size={16} color="red" /> },
                              { status: 'Successful', icon: <CheckCircle size={16} color="green" /> }
                            ].filter(({ status }) => status !== investment.status).map(({ status, icon }) => (
                              <button 
                                key={status}
                                onClick={() => handleStatusChange(investment.id, status)}
                              >
                                {icon}
                                Set to {status}
                              </button>
                            ))}
                            <button onClick={() => handleViewDetails(investment)}>
                              <Eye size={16} />
                              View Details
                            </button>
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
              Showing {startIndex + 1} to {Math.min(endIndex, filteredInvestments.length)} of {filteredInvestments.length} entries
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

export default Investments;