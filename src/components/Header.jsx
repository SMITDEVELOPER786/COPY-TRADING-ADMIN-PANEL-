import React, { useState, useEffect } from 'react';
import '../Header.css';
import { UserPlus, X } from 'lucide-react';
import { inviteTeamMember } from '../services/team.service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const [name, setName] = useState(() => {
    return localStorage.getItem('userName') || 'Maria Khan';
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('INVESTOR');
  const [inviteFullName, setInviteFullName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleInviteSubmit = async () => {
    if (!inviteFullName) {
      alert('Please enter a full name');
      return;
    }

    if (!inviteEmail) {
      alert('Please enter an email address');
      return;
    }

    const emailRegex = /^[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(inviteEmail)) {
      alert('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    try {
      const inviteData = {
        email: inviteEmail,
        role: inviteRole,
        fullName: inviteFullName,
      };

      const result = await inviteTeamMember(inviteData);

      toast.success(result.message || 'Team member invited successfully!');
      setIsInviteDialogOpen(false);
      setInviteEmail('');
      setInviteFullName('');
      setInviteRole('INVESTOR');
    } catch (error) {
      console.error('Error inviting team member:', error);
      toast.error(`Failed to invite team member: ${error.message || 'An error occurred'}`);
    } finally {
      setIsSubmitting(false);
    }
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

  const InviteDialog = () => (
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
          width: '400px',
          maxWidth: '90vw',
          textAlign: 'center',
          fontFamily: 'inherit',
          position: 'relative',
        }}
      >
        <button
          onClick={() => setIsInviteDialogOpen(false)}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            color: '#6b7280',
          }}
        >
          <X size={20} />
        </button>

        <h3
          style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#1f2937',
            marginBottom: '16px',
            marginTop: '8px',
          }}
        >
          Invite New Team Member
        </h3>

        <div style={{ textAlign: 'left', marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 500, color: '#374151' }}>
            Email Address *
          </label>
          <input
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="Enter email address"
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

        <div style={{ textAlign: 'left', marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 500, color: '#374151' }}>
            Full Name *
          </label>
          <input
            type="text"
            value={inviteFullName}
            onChange={(e) => setInviteFullName(e.target.value)}
            placeholder="Enter full name"
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

        <div style={{ textAlign: 'left', marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 500, color: '#374151' }}>
            Role
          </label>
          <select
            value={inviteRole}
            onChange={(e) => setInviteRole(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '14px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              outline: 'none',
              transition: 'border-color 0.2s ease',
              backgroundColor: 'white',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#2d6b2d')}
            onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
          >
            <option value="INVESTOR">Investor</option>
            <option value="TRADER">Trader</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <button
            onClick={handleInviteSubmit}
            disabled={isSubmitting}
            style={{
              padding: '10px 20px',
              background: isSubmitting ? '#9ca3af' : '#2d6b2d',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s ease',
            }}
            onMouseOver={(e) => !isSubmitting && (e.target.style.background = '#4ade80')}
            onMouseOut={(e) => !isSubmitting && (e.target.style.background = '#2d6b2d')}
          >
            {isSubmitting ? 'Sending...' : 'Send Invitation'}
          </button>
          <button
            onClick={() => {
              setIsInviteDialogOpen(false);
              setInviteEmail('');
              setInviteFullName('');
              setInviteRole('INVESTOR');
            }}
            style={{
              padding: '10px 20px',
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
        <button className="invite-button" onClick={() => setIsInviteDialogOpen(true)}>
          <UserPlus size={16} />
          Invite New Team
        </button>
      </div>
      {isDialogOpen && <Dialog />}
      {isInviteDialogOpen && <InviteDialog />}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </div>
  );
};

export default Header;
