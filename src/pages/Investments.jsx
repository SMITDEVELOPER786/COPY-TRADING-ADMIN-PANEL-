import React, { useState } from 'react';
import { Search, MoreHorizontal, ChevronLeft, ChevronRight, ChevronDown, Calendar } from 'lucide-react';
import '../Investments.css';


const investmentsData = [
  {
    id: 1,
    investor: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    trader: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    amount: '$2000',
    roi: '4.5%',
    dateInvested: 'Tue 29 June',
    status: 'Active'
  },
  {
    id: 2,
    investor: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    trader: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    amount: '$2000',
    roi: '4.5%',
    dateInvested: 'Tue 29 June',
    status: 'Active'
  },
  {
    id: 3,
    investor: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    trader: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    amount: '$2000',
    roi: '4.5%',
    dateInvested: 'Tue 29 June',
    status: 'Pending'
  },
  {
    id: 4,
    investor: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    trader: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    amount: '$2000',
    roi: '4.5%',
    dateInvested: 'Tue 29 June',
    status: 'Withdraw'
  },
  {
    id: 5,
    investor: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    trader: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    amount: '$2000',
    roi: '4.5%',
    dateInvested: 'Tue 29 June',
    status: 'Active'
  },
  {
    id: 6,
    investor: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    trader: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    amount: '$2000',
    roi: '4.5%',
    dateInvested: 'Tue 29 June',
    status: 'Active'
  },
  {
    id: 7,
    investor: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    trader: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    amount: '$2000',
    roi: '4.5%',
    dateInvested: 'Tue 29 June',
    status: 'Successful'
  },
  {
    id: 8,
    investor: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    trader: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    amount: '$2000',
    roi: '4.5%',
    dateInvested: 'Tue 29 June',
    status: 'Active'
  },
  {
    id: 9,
    investor: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    trader: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    amount: '$2000',
    roi: '4.5%',
    dateInvested: 'Tue 29 June',
    status: 'Active'
  },
  {
    id: 10,
    investor: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    trader: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    amount: '$2000',
    roi: '4.5%',
    dateInvested: 'Tue 29 June',
    status: 'Active'
  }
];

function Investments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredInvestments = investmentsData.filter(investment =>
    (investment.investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     investment.trader.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedStatus === '' || investment.status === selectedStatus)
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

  return (
    <div className="dashboard-container">
      <div className="main-content">

        <div className="investments-page">
          <div className="page-header">
            <h1>Investments</h1>
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

          <div className="table-container">
            <table className="investments-table">
              <thead>
                <tr>
                  <th>Investor</th>
                  <th>Trader</th>
                  <th>Amount</th>
                  <th>ROI</th>
                  <th>Date Invested</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
  {currentInvestments.map((investment) => (
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
      <td data-label="Actions">
        <button className="more-button">
          <MoreHorizontal size={16} />
        </button>
      </td>
    </tr>
  ))}
</tbody>

            </table>
          </div>

          <div className="table-footer">
            <div className="showing-info">
              Showing: {Math.min(filteredInvestments.length, itemsPerPage)} Entries
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
                {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                  const pageNum = currentPage + i - 1;
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
    </div>
  );
}

export default Investments;