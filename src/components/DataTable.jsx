import React, { useState } from 'react';
import '../DataTable.css';
import { MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';

const DataTable = () => {
  const [activeTab, setActiveTab] = useState('Top Traders');
  const [currentPage, setCurrentPage] = useState(1);
  
  const tableData = [
    {
      id: 1,
      name: 'Maria Khan',
      portfolio: '2.4M',
      investment: '25',
      recentInvestment: 'Tue 29 june',
      rank: '1st',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      name: 'Maria Khan',
      portfolio: '2.4M',
      investment: '25',
      recentInvestment: 'Tue 29 june',
      rank: '1st',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      name: 'Maria Khan',
      portfolio: '2.4M',
      investment: '25',
      recentInvestment: 'Tue 29 june',
      rank: '1st',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const totalPages = 3;

  return (
    <div className="data-table-container">
      <div className="table-header">
        <div className="table-tabs">
          {['Top Investors', 'Top Traders', 'Awaiting Approvals'].map((tab) => (
            <button
              key={tab}
              className={`table-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <button className="see-all-btn">See All</button>
      </div>

      <div className="table-wrapper">
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
            {tableData.map((row) => (
              <tr key={row.id}>
                <td>
                  <div className="name-cell">
                    <img src={row.avatar} alt={row.name} className="avatar" />
                    <span>{row.name}</span>
                  </div>
                </td>
                <td className="portfolio-cell">{row.portfolio}</td>
                <td>{row.investment}</td>
                <td>{row.recentInvestment}</td>
                <td>
                  <span className="rank-badge">{row.rank}</span>
                </td>
                <td>
                  <div className="actions-dropdown">
                    <button className="actions-button">
                      <MoreHorizontal size={16} />
                    </button>
                    <div className="dropdown-menu">
                      <button>View Profile</button>
                      <button>Send Email</button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <div className="entries-info">
          <span>Showing</span>
          <select className="entries-select">
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
          >
            <ChevronLeft size={16} />
          </button>
          
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={`pagination-number ${currentPage === page ? 'active' : ''}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          
          <button 
            className="pagination-btn"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;