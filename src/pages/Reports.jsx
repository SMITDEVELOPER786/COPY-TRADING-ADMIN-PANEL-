import React, { useState, useEffect } from "react";
import {
  Search,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Calendar,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import "../Reports.css";

// initial data
const initialReports = [
  {
    id: 1,
    reportedBy: { name: "Maria Khan", avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1" },
    reportedUser: { name: "Maria Khan", avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1" },
    reportedTitle: "Scamming and Impersonation",
    reportedOn: "Tue 29 June",
    status: "Resolved",
  },
  {
    id: 2,
    reportedBy: { name: "Maria Khan", avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1" },
    reportedUser: { name: "Maria Khan", avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1" },
    reportedTitle: "Scamming and Impersonation",
    reportedOn: "Tue 29 June",
    status: "Pending",
  },
  {
    id: 3,
    reportedBy: { name: "Maria Khan", avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1" },
    reportedUser: { name: "Maria Khan", avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1" },
    reportedTitle: "Scamming and Impersonation",
    reportedOn: "Tue 29 June",
    status: "Resolved",
  },
  {
    id: 4,
    reportedBy: { name: "Maria Khan", avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1" },
    reportedUser: { name: "Maria Khan", avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1" },
    reportedTitle: "Scamming and Impersonation",
    reportedOn: "Tue 29 June",
    status: "Pending",
  },
  {
    id: 5,
    reportedBy: { name: "Maria Khan", avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1" },
    reportedUser: { name: "Maria Khan", avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1" },
    reportedTitle: "Scamming and Impersonation",
    reportedOn: "Tue 29 June",
    status: "Resolved",
  },
  {
    id: 6,
    reportedBy: { name: "Maria Khan", avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1" },
    reportedUser: { name: "Maria Khan", avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1" },
    reportedTitle: "Scamming and Impersonation",
    reportedOn: "Tue 29 June",
    status: "Pending",
  },
  {
    id: 7,
    reportedBy: { name: "Maria Khan", avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1" },
    reportedUser: { name: "Maria Khan", avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1" },
    reportedTitle: "Scamming and Impersonation",
    reportedOn: "Tue 29 June",
    status: "Resolved",
  },
  {
    id: 8,
    reportedBy: { name: "Maria Khan", avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1" },
    reportedUser: { name: "Maria Khan", avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1" },
    reportedTitle: "Scamming and Impersonation",
    reportedOn: "Tue 29 June",
    status: "Pending",
  },
  {
    id: 9,
    reportedBy: { name: "Maria Khan", avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1" },
    reportedUser: { name: "Maria Khan", avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1" },
    reportedTitle: "Scamming and Impersonation",
    reportedOn: "Tue 29 June",
    status: "Resolved",
  },
  {
    id: 10,
    reportedBy: { name: "Maria Khan", avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1" },
    reportedUser: { name: "Maria Khan", avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1" },
    reportedTitle: "Scamming and Impersonation",
    reportedOn: "Tue 29 June",
    status: "Resolved",
  },
];

function Reports() {
  const [reports, setReports] = useState(() => {
    const savedData = localStorage.getItem("reports");
    try {
      const parsedData = savedData ? JSON.parse(savedData) : null;
      if (parsedData && Array.isArray(parsedData)) {
        return parsedData;
      }
      return initialReports;
    } catch (e) {
      console.error("Error parsing localStorage data:", e);
      return initialReports;
    }
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedReportTitle, setSelectedReportTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    localStorage.setItem("reports", JSON.stringify(reports));
  }, [reports]);

  // Handle status change
  const handleStatusChange = (id, newStatus) => {
    setReports((prev) =>
      prev.map((report) =>
        report.id === id ? { ...report, status: newStatus } : report
      )
    );
  };

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.reportedBy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reportedUser.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      report.reportedTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.id.toString().includes(searchTerm);

    const matchesStatus =
      selectedStatus === "" || report.status === selectedStatus;

    const matchesTitle =
      selectedReportTitle === "" || report.reportedTitle === selectedReportTitle;

    const matchesDate =
      selectedDate === "" ||
      new Date(report.reportedOn).toISOString().slice(0, 10) === selectedDate;

    return matchesSearch && matchesStatus && matchesTitle && matchesDate;
  });

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentReports = filteredReports.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getStatusClass = (status) => {
    switch (status) {
      case "Resolved":
        return "status-resolved";
      case "Pending":
        return "status-pending";
      default:
        return "status-resolved";
    }
  };

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <div className="reports-page">
          {/* Stats */}
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-content">
                <div className="stat-number">{reports.length}</div>
                <div className="stat-label">Total Reports</div>
              </div>
              <div className="stat-icon total">
                <FileText size={24} />
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-content">
                <div className="stat-number">
                  {reports.filter((r) => r.status === "Pending").length}
                </div>
                <div className="stat-label">Pending Reports</div>
              </div>
              <div className="stat-icon pending">
                <Clock size={24} />
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-content">
                <div className="stat-number">
                  {reports.filter((r) => r.status === "Resolved").length}
                </div>
                <div className="stat-label">Resolved Reports</div>
              </div>
              <div className="stat-icon resolved">
                <CheckCircle size={24} />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="reports-filter-container">
            <div className="reports-search-container">
              <div className="reports-search-input-wrapper">
                <Search className="reports-search-icon" size={20} />
                <input
                  type="text"
                  placeholder="Search Name or Report ID"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="reports-search-input"
                />
              </div>
            </div>

            <div className="reports-filter-controls">
              <div className="reports-status-filter">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="reports-status-select"
                >
                  <option value="">Status</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Pending">Pending</option>
                </select>
                <ChevronDown className="reports-select-icon" size={16} />
              </div>

              <div className="reports-report-filter">
                <select
                  value={selectedReportTitle}
                  onChange={(e) => setSelectedReportTitle(e.target.value)}
                  className="reports-report-select"
                >
                  <option value="">Report Title</option>
                  <option value="Scamming and Impersonation">
                    Scamming and Impersonation
                  </option>
                  <option value="Fraud">Fraud</option>
                  <option value="Harassment">Harassment</option>
                </select>
                <ChevronDown className="reports-select-icon" size={16} />
              </div>

              <div className="reports-date-filter">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="reports-date-input"
                />
                <Calendar className="reports-date-icon" size={16} />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="reports-table-container">
            <table className="reports-table">
              <thead>
                <tr>
                  <th>Reported by</th>
                  <th>Reported User</th>
                  <th>Reported Title</th>
                  <th>Reported on</th>
                  <th>Status</th>
                  <th>Action</th>
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
                        <span className="user-name">
                          {report.reportedBy.name}
                        </span>
                      </div>
                    </td>
                    <td data-label="Reported User">
                      <div className="user-cell">
                        <img
                          src={report.reportedUser.avatar}
                          alt={report.reportedUser.name}
                          className="user-avatar"
                        />
                        <span className="user-name">
                          {report.reportedUser.name}
                        </span>
                      </div>
                    </td>
                    <td data-label="Reported Title">{report.reportedTitle}</td>
                    <td data-label="Reported on">{new Date(report.reportedOn).toDateString()}</td>
                    <td data-label="Status">
                      <span
                        className={`status-badge ${getStatusClass(
                          report.status
                        )}`}
                      >
                        {report.status}
                      </span>
                    </td>
                    <td data-label="Action">
                      <div className="action-buttons">
                        <button
                          onClick={() => handleStatusChange(report.id, "Resolved")}
                          className={`status-button ${report.status === "Resolved" ? "active" : ""}`}
                        >
                          <CheckCircle size={16} color="green" /> Resolve
                        </button>
                        <button
                          onClick={() => handleStatusChange(report.id, "Pending")}
                          className={`status-button ${report.status === "Pending" ? "active" : ""}`}
                        >
                          <XCircle size={16} color="red" /> Pending
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {currentReports.length === 0 && (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      No Reports Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="reports-table-footer">
            <div className="showing-info">
              Showing {currentReports.length} of {filteredReports.length} entries
            </div>
            <div className="pagination">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="pagination-button"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`pagination-number ${currentPage === page ? "active" : ""}`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="pagination-button"
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