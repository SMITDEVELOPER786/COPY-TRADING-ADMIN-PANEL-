import React from 'react';
import '../Header.css';
import { UserPlus } from 'lucide-react';

const Header = () => {
  return (
    <div className="header">
      <div className="header-content">
        <div className="greeting">
          <h1>
            Hi <span className="highlight">Maria Khan</span>, How is your Day going
          </h1>
          <p className="subtitle">
            Here is the Summary of what is presently happening on turtle trades
          </p>
        </div>
        <button className="invite-button">
          <UserPlus size={16} />
          Invite New Team
        </button>
      </div>
    </div>
  );
};

export default Header;