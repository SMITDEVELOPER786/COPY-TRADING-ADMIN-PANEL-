import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../DataTable.css';
import { MoreHorizontal, ChevronLeft, ChevronRight, UserPlus } from 'lucide-react';

const DataTable = () => {
  const [activeTab, setActiveTab] = useState('Top Traders');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [tableData, setTableData] = useState(() => {
    const savedData = localStorage.getItem('tableData');
    try {
      const parsedData = savedData ? JSON.parse(savedData) : null;
      if (
        parsedData &&
        typeof parsedData === 'object' &&
        ['Top Investors', 'Top Traders', 'Awaiting Approvals'].every(
          (tab) => Array.isArray(parsedData[tab])
        )
      ) {
        return parsedData;
      }
      return {
        'Top Investors': [
          {
            id: 1,
            name: 'Maria Khan',
            portfolio: '2.4M',
            investment: '25',
            recentInvestment: 'Tue 29 Jun 2025',
            rank: '1st',
            avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400',
          },
          {
            id: 2,
            name: 'John Doe',
            portfolio: '1.8M',
            investment: '20',
            recentInvestment: 'Mon 28 Jun 2025',
            rank: '2nd',
            avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
          },
        ],
        'Top Traders': [
          {
            id: 1,
            name: 'Jane Smith',
            portfolio: '1.5M',
            investment: '15',
            recentInvestment: 'Sun 27 Jun 2025',
            rank: '1st',
            avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
          },
          {
            id: 2,
            name: 'Alex Johnson',
            portfolio: '1.2M',
            investment: '10',
            recentInvestment: 'Sat 26 Jun 2025',
            rank: '2nd',
            avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
          },
        ],
        'Awaiting Approvals': [
          {
            id: 1,
            name: 'Emily Davis',
            portfolio: '0.5M',
            investment: '5',
            recentInvestment: 'Fri 25 Jun 2025',
            rank: 'N/A',
            avatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=400',
          },
        ],
      };
    } catch (e) {
      console.error('Error parsing localStorage data:', e);
      return {
        'Top Investors': [],
        'Top Traders': [],
        'Awaiting Approvals': [],
      };
    }
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    portfolio: '',
    investment: '',
    recentInvestment: '',
    rank: activeTab === 'Awaiting Approvals' ? 'N/A' : '',
    avatar: '',
  });
  const [isMoveDialogOpen, setIsMoveDialogOpen] = useState(false);
  const [moveRowId, setMoveRowId] = useState(null);
  const [moveToTab, setMoveToTab] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth <= 768);
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleViewProfile = (userId) => {
    navigate(`/trader/${userId}`);
  };
  

  const handleSendEmail = (userName) => {
    alert(`Sending email to ${userName}`);
  };

  useEffect(() => {
    localStorage.setItem('tableData', JSON.stringify(tableData));
  }, [tableData]);

  const openAddDialog = () => {
    setNewUser({
      name: '',
      portfolio: '',
      investment: '',
      recentInvestment: '',
      rank: activeTab === 'Awaiting Approvals' ? 'N/A' : '',
      avatar: '',
    });
    setIsAddDialogOpen(true);
  };

  const handleAddSave = () => {
    const { name, portfolio, investment, recentInvestment, rank, avatar } = newUser;

    if (!name.trim()) {
      alert('Please enter a valid name');
      return;
    }
    const portfolioValue = Number(portfolio.replace(/,/g, ''));
    if (isNaN(portfolioValue) || portfolioValue < 0) {
      alert('Portfolio must be a valid non-negative number');
      return;
    }
    const investmentValue = Number(investment);
    if (isNaN(investmentValue) || investmentValue < 0) {
      alert('Investment must be a valid non-negative number');
      return;
    }
    if (!recentInvestment.match(/^\w{3} \d{1,2} \w+ \d{4}$/)) {
      alert('Recent Investment must be in format like "Tue 29 Jun 2025"');
      return;
    }
    if (activeTab !== 'Awaiting Approvals' && !rank.match(/^\d+(st|nd|rd|th)$/)) {
      alert('Rank must be in format like "1st", "2nd", "3rd", "4th"');
      return;
    }
    if (activeTab === 'Awaiting Approvals' && rank !== 'N/A') {
      alert('Rank for Awaiting Approvals must be "N/A"');
      return;
    }
    if (avatar && !avatar.match(/^https?:\/\/.*\.(?:png|jpg|jpeg|gif)$/)) {
      alert('Avatar must be a valid image URL (png, jpg, jpeg, gif)');
      return;
    }

    const newId = Math.max(0, ...tableData[activeTab].map((row) => row.id)) + 1;
    const updatedData = { ...tableData };
    updatedData[activeTab].push({
      id: newId,
      name: name.trim(),
      portfolio: `$${portfolioValue.toLocaleString()}M`,
      investment: investmentValue.toString(),
      recentInvestment: recentInvestment.trim(),
      rank: rank.trim(),
      avatar: avatar || 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400',
    });

    setTableData(updatedData);
    setIsAddDialogOpen(false);
    setNewUser({
      name: '',
      portfolio: '',
      investment: '',
      recentInvestment: '',
      rank: activeTab === 'Awaiting Approvals' ? 'N/A' : '',
      avatar: '',
    });
    setCurrentPage(1);
  };

  const openMoveDialog = (rowId) => {
    setMoveRowId(rowId);
    setMoveToTab('');
    setIsMoveDialogOpen(true);
  };

  const handleMoveSave = () => {
    if (!moveToTab || moveToTab === activeTab) {
      alert('Please select a different tab to move the user to');
      return;
    }

    const updatedData = { ...tableData };
    const rowIndex = updatedData[activeTab].findIndex((row) => row.id === moveRowId);
    if (rowIndex === -1) {
      alert('User not found');
      return;
    }

    const user = { ...updatedData[activeTab][rowIndex] };
    if (moveToTab === 'Awaiting Approvals') {
      user.rank = 'N/A';
    } else {
      const maxRank = Math.max(
        0,
        ...updatedData[moveToTab].map((row) => {
          const match = row.rank.match(/^(\d+)/);
          return match ? parseInt(match[1]) : 0;
        })
      );
      user.rank = `${maxRank + 1}${maxRank + 1 === 1 ? 'st' : maxRank + 1 === 2 ? 'nd' : maxRank + 1 === 3 ? 'rd' : 'th'}`;
    }

    updatedData[activeTab].splice(rowIndex, 1);
    updatedData[moveToTab].push(user);

    setTableData(updatedData);
    setIsMoveDialogOpen(false);
    setMoveRowId(null);
    setMoveToTab('');
    setCurrentPage(1);
  };

  const AddDialog = () => (
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
          width: '350px',
          textAlign: 'left',
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
          Add New User
        </h3>
        {['name', 'portfolio', 'investment', 'recentInvestment', 'rank', 'avatar'].map((field) => (
          <div key={field} style={{ marginBottom: '12px' }}>
            <label
              style={{
                fontSize: '14px',
                fontWeight: 500,
                color: '#1f2937',
                marginBottom: '4px',
                display: 'block',
              }}
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === 'portfolio' || field === 'investment' ? 'number' : 'text'}
              value={newUser[field]}
              onChange={(e) => setNewUser({ ...newUser, [field]: e.target.value })}
              placeholder={`Enter ${field}`}
              disabled={field === 'rank' && activeTab === 'Awaiting Approvals'}
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '14px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                outline: 'none',
                transition: 'border-color 0.2s ease',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#2d6b2d')}
              onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
            />
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <button
            onClick={handleAddSave}
            style={{
              padding: '8px 20px',
              background: '#2d6b2d',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}
            onMouseOver={(e) => (e.target.style.background = '#4ade80')}
            onMouseOut={(e) => (e.target.style.background = '#2d6b2d')}
          >
            Add User
          </button>
          <button
            onClick={() => setIsAddDialogOpen(false)}
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
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const MoveDialog = () => (
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
          width: '300px',
          textAlign: 'center',
          fontFamily: 'inherit',
        }}
      >
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#1f2937',
            marginBottom: '16px',
          }}
        >
          Move User
        </h3>
        <select
          value={moveToTab}
          onChange={(e) => setMoveToTab(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '14px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            marginBottom: '16px',
            outline: 'none',
            transition: 'border-color 0.2s ease',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#2d6b2d')}
          onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
        >
          <option value="" disabled>
            Select Tab
          </option>
          {['Top Investors', 'Top Traders', 'Awaiting Approvals']
            .filter((tab) => tab !== activeTab)
            .map((tab) => (
              <option key={tab} value={tab}>
                {tab}
              </option>
            ))}
        </select>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <button
            onClick={handleMoveSave}
            style={{
              padding: '8px 20px',
              background: '#2d6b2d',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}
            onMouseOver={(e) => (e.target.style.background = '#4ade80')}
            onMouseOut={(e) => (e.target.style.background = '#2d6b2d')}
          >
            Move
          </button>
          <button
            onClick={() => {
              setIsMoveDialogOpen(false);
              setMoveRowId(null);
              setMoveToTab('');
            }}
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
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const entriesPerPage = 10;
  const currentTableData = tableData[activeTab] || [];
  const totalPages = Math.max(1, Math.ceil(currentTableData.length / entriesPerPage));
  const paginatedData = currentTableData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  return (
    <div className="data-table-container">
      <div className="table-header">
        <div className="table-tabs">
          {['Top Investors', 'Top Traders', 'Awaiting Approvals'].map((tab) => (
            <button
              key={tab}
              className={`table-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="table-actions">
        {!isMobile && (
          <button
            className="add-user-btn"
            onClick={openAddDialog}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              background: '#2d6b2d',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}
            onMouseOver={(e) => (e.target.style.background = '#4ade80')}
            onMouseOut={(e) => (e.target.style.background = '#2d6b2d')}
          >
            <UserPlus size={16} />
            Add User
          </button>
        )}
        </div>
      </div>

      <div className="table-wrapper">
        {paginatedData.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '20px', color: '#6b7280' }}>
            No data available for {activeTab}.
          </p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Portfolio</th>
                <th>Investment</th>
                <th>Recent Investment</th>
                <th>Rank</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row) => (
                <tr key={row.id}>
                  <td data-label="Name">
                    <div className="name-cell">
                      <img src={row.avatar} alt={row.name} className="avatar" />
                      <span>{row.name}</span>
                    </div>
                  </td>
                  <td data-label="Portfolio" className="portfolio-cell">
                    {row.portfolio}
                  </td>
                  <td data-label="Investment">{row.investment}</td>
                  <td data-label="Recent Investment">{row.recentInvestment}</td>
                  <td data-label="Rank">
                    <span className="rank-badge">{row.rank}</span>
                  </td>
                  <td data-label="Actions">
                    <div className="actions-dropdown">
                      <button className="actions-button" aria-label="More actions">
                        <MoreHorizontal size={16} />
                      </button>
                      <div className="dropdown-menu">
                        <button onClick={() => handleViewProfile(row.id)}>View Profile</button>                        <button onClick={() => openMoveDialog(row.id)}>Move User</button>
                        <button onClick={() => handleSendEmail(row.name)}>Send Email</button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="table-footer">
        <div className="entries-info">
          <span>Showing</span>
          <select
            className="entries-select"
            onChange={(e) => {
              setCurrentPage(1);
            }}
          >
            <option>10 Entries</option>
            <option>25 Entries</option>
            <option>50 Entries</option>
          </select>
        </div>

        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`pagination-number ${currentPage === page ? 'active' : ''}`}
              onClick={() => setCurrentPage(page)}
              aria-label={`Page ${page}`}
            >
              {page}
            </button>
          ))}

          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {isAddDialogOpen && <AddDialog />}
      {isMoveDialogOpen && <MoveDialog />}
    </div>
  );
};

export default DataTable;
