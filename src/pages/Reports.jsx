import React, { useState, useEffect, useRef } from "react";
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

const initialReports = [
  {
    id: 1,
    reportedBy: {
      name: "Maria Khan",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    },
    reportedUser: {
      name: "Maria Khan",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    },
    reportedTitle: "Scamming",
    reportedOn: "2025-06-29",
    status: "Resolved",
  },
  {
    id: 2,
    reportedBy: {
      name: "Maria Khan",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    },
    reportedUser: {
      name: "Maria Khan",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    },
    reportedTitle: "Scamming",
    reportedOn: "2025-06-29",
    status: "Pending",
  },
  {
    id: 3,
    reportedBy: {
      name: "Maria Khan",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    },
    reportedUser: {
      name: "Maria Khan",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    },
    reportedTitle: "Scamming",
    reportedOn: "2025-06-29",
    status: "Resolved",
  },
  {
    id: 4,
    reportedBy: {
      name: "Maria Khan",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    },
    reportedUser: {
      name: "Maria Khan",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    },
    reportedTitle: "Impersonation",
    reportedOn: "2025-06-29",
    status: "Pending",
  },
  {
    id: 5,
    reportedBy: {
      name: "Maria Khan",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    },
    reportedUser: {
      name: "Maria Khan",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    },
    reportedTitle: "Impersonation",
    reportedOn: "2025-06-29",
    status: "Resolved",
  },
  {
    id: 6,
    reportedBy: {
      name: "Maria Khan",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    },
    reportedUser: {
      name: "Maria Khan",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    },
    reportedTitle: "Scamming",
    reportedOn: "2025-06-29",
    status: "Pending",
  },
  {
    id: 7,
    reportedBy: {
      name: "Maria Khan",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    },
    reportedUser: {
      name: "Maria Khan",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    },
    reportedTitle: "Scamming",
    reportedOn: "2025-06-29",
    status: "Resolved",
  },
  {
    id: 8,
    reportedBy: {
      name: "Maria Khan",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    },
    reportedUser: {
      name: "Maria Khan",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    },
    reportedTitle: "Scamming",
    reportedOn: "2025-06-29",
    status: "Pending",
  },
  {
    id: 9,
    reportedBy: {
      name: "Maria Khan",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    },
    reportedUser: {
      name: "Maria Khan",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    },
    reportedTitle: "Scamming",
    reportedOn: "2025-06-29",
    status: "Resolved",
  },
  {
    id: 10,
    reportedBy: {
      name: "Maria Khan",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    },
    reportedUser: {
      name: "Maria Khan",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    },
    reportedTitle: "Scamming",
    reportedOn: "2025-06-29",
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
  const [openDropdown, setOpenDropdown] = useState(null); // Track open dropdown
  const dropdownRefs = useRef({}); // Store refs for each dropdown button
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
    setOpenDropdown(null); // Close dropdown after selection
  };

  // Toggle dropdown and position it
  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
    if (openDropdown !== id) {
      // Position dropdown when opening
      const button = dropdownRefs.current[id];
      if (button) {
        const rect = button.getBoundingClientRect();
        const dropdownMenu = button.querySelector(".action-dropdown-menu");
        if (dropdownMenu) {
          const viewportHeight = window.innerHeight;
          const spaceBelow = viewportHeight - rect.bottom;
          const dropdownHeight = dropdownMenu.offsetHeight || 100; // Approximate height if not rendered yet

          // Flip dropdown above if there's not enough space below
          if (spaceBelow < dropdownHeight) {
            dropdownMenu.style.top = "auto";
            dropdownMenu.style.bottom = "100%";
            dropdownMenu.style.marginTop = "0";
            dropdownMenu.style.marginBottom = "8px";
          } else {
            // Default: below the button
            dropdownMenu.style.top = "100%";
            dropdownMenu.style.bottom = "auto";
            dropdownMenu.style.marginTop = "8px";
            dropdownMenu.style.marginBottom = "0";
          }

          // Ensure dropdown doesn't overflow horizontally
          const viewportWidth = window.innerWidth;
          const spaceRight = viewportWidth - rect.right;
          if (spaceRight < 120) { // 120px is min-width of dropdown
            dropdownMenu.style.right = "auto";
            dropdownMenu.style.left = "0";
          } else {
            dropdownMenu.style.right = "0";
            dropdownMenu.style.left = "auto";
          }
        }
      }
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".action-dropdown")) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.reportedBy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reportedUser.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reportedTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.id.toString().includes(searchTerm);

    const matchesStatus = selectedStatus === "" || report.status === selectedStatus;

    const matchesTitle =
      selectedReportTitle === "" || report.reportedTitle === selectedReportTitle;

    const matchesDate = selectedDate === "" || report.reportedOn === selectedDate;

    return matchesSearch && matchesStatus && matchesTitle && matchesDate;
  });

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentReports = filteredReports.slice(startIndex, startIndex + itemsPerPage);

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
          <div className="page-header">
            <h2 className="page-titlees">
              Dashboard <span className="sub-titlees">› Reports</span>
            </h2>
          </div>
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
                  <option value="">Title</option>
                  <option value="Scamming">Scamming</option>
                  <option value="Impersonation">Impersonation</option>
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
                    <td data-label="Reported Title">{report.reportedTitle}</td>
                    <td data-label="Reported on">
                      {new Date(report.reportedOn).toDateString()}
                    </td>
                    <td data-label="Status">
                      <span className={`status-badge ${getStatusClass(report.status)}`}>
                        {report.status}
                      </span>
                    </td>
                    <td data-label="Action" className="action-dropdown">
                      <div
                        className="action-wrapper"
                        ref={(el) => (dropdownRefs.current[report.id] = el)}
                      >
                        <button
                          onClick={() => toggleDropdown(report.id)}
                          className="action-button"
                        >
                          <MoreHorizontal size={16} />
                        </button>
                        {openDropdown === report.id && (
                          <div className="action-dropdown-menu">
                            <button
                              onClick={() => handleStatusChange(report.id, "Resolved")}
                              className="action-dropdown-item"
                            >
                              <CheckCircle size={16} color="#166534" />
                              Resolve
                            </button>
                            <button
                              onClick={() => handleStatusChange(report.id, "Pending")}
                              className="action-dropdown-item"
                            >
                              <XCircle size={16} color="#92400e" />
                              Pending
                            </button>
                          </div>
                        )}
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