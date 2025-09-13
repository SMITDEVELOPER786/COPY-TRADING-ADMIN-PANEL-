import React, { useState } from 'react';
import { Search, MoreHorizontal, ChevronLeft, ChevronRight, ChevronDown, Calendar, FileText, Clock, CheckCircle } from 'lucide-react';
import '../Reports.css';

const reportsData = [
  {
    id: 1,
    reportedBy: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    reportedUser: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    reportedTitle: 'Scamming and Impersonation',
    reportedOn: 'Tue 29 June',
    status: 'Resolved'
  },
  {
    id: 2,
    reportedBy: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    reportedUser: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    reportedTitle: 'Scamming and Impersonation',
    reportedOn: 'Tue 29 June',
    status: 'Pending'
  },
  {
    id: 3,
    reportedBy: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    reportedUser: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    reportedTitle: 'Scamming and Impersonation',
    reportedOn: 'Tue 29 June',
    status: 'Resolved'
  },
  {
    id: 4,
    reportedBy: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    reportedUser: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    reportedTitle: 'Scamming and Impersonation',
    reportedOn: 'Tue 29 June',
    status: 'Pending'
  },
  {
    id: 5,
    reportedBy: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    reportedUser: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    reportedTitle: 'Scamming and Impersonation',
    reportedOn: 'Tue 29 June',
    status: 'Resolved'
  },
  {
    id: 6,
    reportedBy: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    reportedUser: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    reportedTitle: 'Scamming and Impersonation',
    reportedOn: 'Tue 29 June',
    status: 'Pending'
  },
  {
    id: 7,
    reportedBy: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    reportedUser: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    reportedTitle: 'Scamming and Impersonation',
    reportedOn: 'Tue 29 June',
    status: 'Resolved'
  },
  {
    id: 8,
    reportedBy: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    reportedUser: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    reportedTitle: 'Scamming and Impersonation',
    reportedOn: 'Tue 29 June',
    status: 'Pending'
  },
  {
    id: 9,
    reportedBy: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    reportedUser: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    reportedTitle: 'Scamming and Impersonation',
    reportedOn: 'Tue 29 June',
    status: 'Resolved'
  },
  {
    id: 10,
    reportedBy: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    reportedUser: { name: 'Maria Khan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    reportedTitle: 'Scamming and Impersonation',
    reportedOn: 'Tue 29 June',
    status: 'Resolved'
  }
];

function Reports() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedReportTitle, setSelectedReportTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredReports = reportsData.filter(report =>
    (report.reportedBy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     report.reportedUser.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     report.reportedTitle.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedStatus === '' || report.status === selectedStatus)
  );

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReports = filteredReports.slice(startIndex, endIndex);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Resolved':
        return 'status-resolved';
      case 'Pending':
        return 'status-pending';
      default:
        return 'status-resolved';
    }
  };

  const totalReports = 2430;
  const pendingReports = 1250;
  const resolvedReports = 987;

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <div className="reports-page">
          <div className="page-header">
            <h1>Reports</h1>
          </div>
          
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-content">
                <div className="stat-number">{totalReports.toLocaleString()}</div>
                <div className="stat-label">Total Reports</div>
              </div>
              <div className="stat-icon total">
                <FileText size={24} />
              </div>
            </div>
            
            <div className="stat-card">
              
              <div className="stat-content">
                <div className="stat-number">{pendingReports.toLocaleString()}</div>
                <div className="stat-label">Pending Reports</div>
              </div>
              <div className="stat-icon pending">
                <Clock size={24} />
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-content">
                <div className="stat-number">{resolvedReports}</div>
                <div className="stat-label">Resolved Reports</div>
              </div>
              <div className="stat-icon resolved">
                <CheckCircle size={24} />
              </div>
            </div>
          </div>
          
          <div className="filters-container">
            <div className="search-container">
              <div className="search-input-wrapper">
                <Search className="search-icon" size={20} />
                <input
                  type="text"
                  placeholder="Search Name or Report ID"
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
                  <option value="Resolved">Resolved</option>
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
                  <option value="Scamming and Impersonation">Scamming and Impersonation</option>
                  <option value="Fraud">Fraud</option>
                  <option value="Harassment">Harassment</option>
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
            <table className="reports-table">
              <thead>
                <tr>
                  <th>Reported by</th>
                  <th>Reported User</th>
                  <th>Reported Title</th>
                  <th>Reported on</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
  {currentReports.map((report) => (
    <tr key={report.id}>
      <td data-label="Reported by">
        <div className="user-cell">
          <img 
            src={report.reportedBy.avatar} 
            alt={report.reportedBy.name}
            className="user-avatar"
          />
          <span className="user-name">{report.reportedBy.name}</span>
        </div>
      </td>
      <td data-label="Reported User">
        <div className="user-cell">
          <img 
            src={report.reportedUser.avatar} 
            alt={report.reportedUser.name}
            className="user-avatar"
          />
          <span className="user-name">{report.reportedUser.name}</span>
        </div>
      </td>
      <td data-label="Reported Title" className="report-title">{report.reportedTitle}</td>
      <td data-label="Reported on" className="date">{report.reportedOn}</td>
      <td data-label="Status">
        <span className={`status-badge ${getStatusClass(report.status)}`}>
          {report.status}
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
              Showing: {Math.min(filteredReports.length, itemsPerPage)} Entries
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

export default Reports;