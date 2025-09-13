import React, { useState } from 'react';
import { Search, MoreHorizontal, ChevronLeft, ChevronRight, ChevronDown, Calendar } from 'lucide-react';
import '../team.css';

const teamData = [
  {
    id: 1,
    name: "Maria Khan",
    email: "abc@gmail.com",
    phone: "+92333******",
    role: "Super Admin",
    dateJoined: "2023-06-29",
    status: "Active",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
  },
  {
    id: 2,
    name: "Maria Khan",
    email: "abc@gmail.com",
    phone: "+92333******",
    role: "Super Admin",
    dateJoined: "2023-06-29",
    status: "Active",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
  },
  {
    id: 3,
    name: "Maria Khan",
    email: "abc@gmail.com",
    phone: "+92333******",
    role: "Super Admin",
    dateJoined: "2023-06-29",
    status: "Active",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
  },
  {
    id: 4,
    name: "Maria Khan",
    email: "abc@gmail.com",
    phone: "+92333******",
    role: "Super Admin",
    dateJoined: "2023-06-29",
    status: "Active",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
  },
  {
    id: 5,
    name: "Maria Khan",
    email: "abc@gmail.com",
    phone: "+92333******",
    role: "Super Admin",
    dateJoined: "2023-06-29",
    status: "Active",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
  },
  {
    id: 6,
    name: "Maria Khan",
    email: "abc@gmail.com",
    phone: "+92333******",
    role: "Super Admin",
    dateJoined: "2023-06-29",
    status: "Active",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
  },
  {
    id: 7,
    name: "Maria Khan",
    email: "abc@gmail.com",
    phone: "+92333******",
    role: "Super Admin",
    dateJoined: "2023-06-29",
    status: "Active",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
  },
  {
    id: 8,
    name: "Maria Khan",
    email: "abc@gmail.com",
    phone: "+92333******",
    role: "Super Admin",
    dateJoined: "2023-06-29",
    status: "Active",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
  },
  {
    id: 9,
    name: "Maria Khan",
    email: "abc@gmail.com",
    phone: "+92333******",
    role: "Super Admin",
    dateJoined: "2023-06-29",
    status: "Active",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
  },
  {
    id: 10,
    name: "Maria Khan",
    email: "abc@gmail.com",
    phone: "+92333******",
    role: "Super Admin",
    dateJoined: "2023-06-29",
    status: "Active",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
  }
];

function Team() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredTeam = teamData.filter(member =>
    (member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedStatus === '' || member.status === selectedStatus) &&
    (selectedDate === '' || member.dateJoined === selectedDate)
  );

  const totalPages = Math.ceil(filteredTeam.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTeam = filteredTeam.slice(startIndex, endIndex);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Active':
        return 'status-active';
      case 'Deactivate':
        return 'status-pending';
      case 'Delete':
        return 'status-withdraw';
      default:
        return 'status-active';
    }
  };

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <div className="team-page">
          <div className="page-header">
            <h1>Team</h1>
          </div>

          <div className="filters-container">
            <div className="search-container">
              <div className="search-input-wrapper">
                <Search className="search-icon" size={20} />
                <input
                  type="text"
                  placeholder="Search by Name or Email"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            <div className="filter-controls">
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

              <div className="status-filter">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="status-select"
                >
                  <option value="">Status</option>
                  <option value="Active">Active</option>
                  <option value="Deactivate">Deactivate</option>
                  <option value="Delete">Delete</option>
                </select>
                <ChevronDown className="select-icon" size={16} />
              </div>
            </div>
          </div>

          <div className="table-container">
            <table className="team-table">
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Date Joined</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentTeam.map((member) => (
                  <tr key={member.id}>
                    <td data-label="Member">
                      <div className="user-cell">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="user-avatar"
                        />
                        <span className="user-name">{member.name}</span>
                      </div>
                    </td>
                    <td data-label="Email">{member.email}</td>
                    <td data-label="Phone">{member.phone}</td>
                    <td data-label="Role">{member.role}</td>
                    <td data-label="Date Joined">{member.dateJoined}</td>
                    <td data-label="Status">
                      <span className={`status-badge ${getStatusClass(member.status)}`}>
                        {member.status}
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
              Showing: {Math.min(filteredTeam.length, itemsPerPage)} Entries
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

export default Team;