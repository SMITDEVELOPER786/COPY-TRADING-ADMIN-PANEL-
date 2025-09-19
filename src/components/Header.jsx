import React, { useState, useEffect } from 'react';
import '../Header.css';
import { UserPlus } from 'lucide-react';

const Header = () => {
  const [name, setName] = useState(() => {
    return localStorage.getItem('userName') || 'Maria Khan';
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    localStorage.setItem('userName', name);
  }, [name]);

  const openDialog = () => {
    setEditValue(name);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    const value = editValue.trim();
    if (!value) {
      alert('Please enter a valid name');
      return;
    }

    setName(value);
    setIsDialogOpen(false);
    setEditValue('');
  };

  const Dialog = () => (
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
          Edit Name
        </h3>
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          placeholder="Enter name"
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
        />
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <button
            onClick={handleSave}
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
            Save
          </button>
          <button
            onClick={() => setIsDialogOpen(false)}
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

  return (
    <div className="header">
      <div className="header-content">
        <div className="greeting">
          <h1>
            Hi{' '}
            <span
              className="highlight"
              style={{ cursor: 'pointer' }}
              onClick={openDialog}
            >
              {name}
            </span>
            , How is your Day going
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
      {isDialogOpen && <Dialog />}
    </div>
  );
};

export default Header;
