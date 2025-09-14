import React, { useState } from 'react';
import { Search, MoreHorizontal, ChevronLeft, ChevronRight, ChevronDown, Calendar } from 'lucide-react';
import '../KYC.css';



const kycData = [
  {
    id: 1,
    user: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    userType: 'Participant',
    email: 'abc@gmail.com',
    document: 'CNIC',
    date: 'Tue 29 June',
    status: 'Successful'
  },
  {
    id: 2,
    user: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    userType: 'Participant',
    email: 'abc@gmail.com',
    document: 'Face ID',
    date: 'Tue 29 June',
    status: 'Failed'
  },
  {
    id: 3,
    user: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    userType: 'Participant',
    email: 'abc@gmail.com',
    document: 'CNIC',
    date: 'Tue 29 June',
    status: 'Pending'
  },
  {
    id: 4,
    user: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    userType: 'Participant',
    email: 'abc@gmail.com',
    document: 'CNIC',
    date: 'Tue 29 June',
    status: 'Successful'
  },
  {
    id: 5,
    user: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    userType: 'Participant',
    email: 'abc@gmail.com',
    document: 'CNIC',
    date: 'Tue 29 June',
    status: 'Failed'
  },
  {
    id: 6,
    user: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    userType: 'Participant',
    email: 'abc@gmail.com',
    document: 'CNIC',
    date: 'Tue 29 June',
    status: 'Pending'
  },
  {
    id: 7,
    user: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    userType: 'Participant',
    email: 'abc@gmail.com',
    document: 'CNIC',
    date: 'Tue 29 June',
    status: 'Successful'
  },
  {
    id: 8,
    user: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    userType: 'Participant',
    email: 'abc@gmail.com',
    document: 'CNIC',
    date: 'Tue 29 June',
    status: 'Failed'
  },
  {
    id: 9,
    user: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    userType: 'Participant',
    email: 'abc@gmail.com',
    document: 'CNIC',
    date: 'Tue 29 June',
    status: 'Pending'
  },
  {
    id: 10,
    user: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    userType: 'Participant',
    email: 'abc@gmail.com',
    document: 'CNIC',
    date: 'Tue 29 June',
    status: 'Successful'
  }
];

function KYC() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedReportTitle, setSelectedReportTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredKYC = kycData.filter(kyc =>
    (kyc.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     kyc.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedStatus === '' || kyc.status === selectedStatus)
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
        return 'status-successful';
    }
  };

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <div className="kyc-page">
          <div className="page-header">
          <h2 className="page-titlees">
          Dashboard <span className="sub-titlees">› KYC</span>
          </h2>         
           </div>
          
          <div className="filters-container">
            <div className="search-container">
              <div className="search-input-wrapper">
                <Search className="search-icon" size={20} />
                <input
                  type="text"
                  placeholder="Search User"
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
                  <option value="Successful">Successful</option>
                  <option value="Failed">Failed</option>
                  <option value="Pending">Pending</option>
                </select>
                <ChevronDown className="select-icon" size={16} />
              </div>

              <div className="report-filter">
                <select 
                  value={selectedReportTitle} 
                  onChange={(e) => setSelectedReportTitle(e.target.value)}
                  className="report-select"
                >
                  <option value="">Report Title</option>
                  <option value="CNIC">CNIC</option>
                  <option value="Face ID">Face ID</option>
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
            <table className="kyc-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>User Type</th>
                  <th>Email</th>
                  <th>Document</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
  {currentKYC.map((kyc) => (
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
              Showing: {Math.min(filteredKYC.length, itemsPerPage)} Entries
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

export default KYC;