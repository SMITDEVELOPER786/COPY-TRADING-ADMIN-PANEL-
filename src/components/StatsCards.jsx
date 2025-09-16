import React, { useState } from 'react';
import '../StatsCards.css';

const StatsCards = ({ stats, setStats }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editType, setEditType] = useState(null); 
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  const openDialog = (type, index, value) => {
    setEditType(type);
    setEditIndex(index);
    const cleanedValue = value.replace(/[\$,M%]/g, '');
    setEditValue(cleanedValue);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    const value = editValue.trim();
    if (!value || isNaN(Number(value.replace(/,/g, '')))) {
      alert('Please enter a valid number');
      return;
    }

    const updatedStats = [...stats];
    const numericValue = Number(value.replace(/,/g, ''));

    if (editType === 'value') {
      if (numericValue < 0) {
        alert('Value cannot be negative');
        return;
      }
      if (updatedStats[editIndex].title === 'Total Investments') {
        updatedStats[editIndex].value = `$${numericValue.toLocaleString()}M`;
      } else {
        updatedStats[editIndex].value = numericValue.toLocaleString();
      }
    } else if (editType === 'subtitle' && updatedStats[editIndex].title === 'Total Investments') {
      if (numericValue < 0) {
        alert('Subtitle value cannot be negative');
        return;
      }
      updatedStats[editIndex].subtitle = `${numericValue.toLocaleString()} Investments`;
    } else if (editType === 'growth') {
      updatedStats[editIndex].growth = `${numericValue >= 0 ? '+' : ''}${numericValue}%`;
    } else {
      alert('Invalid input');
      return;
    }

    setStats(updatedStats);
    setIsDialogOpen(false);
    setEditValue('');
    setEditType(null);
    setEditIndex(null);
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
          Edit {stats[editIndex]?.title} {editType}
        </h3>
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          placeholder={`Enter ${editType}`}
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

  const renderChart = (type) => {
    if (!type) return null;

    if (type === 'line-up') {
      return (
        <div className="mini-chart">
          <svg width="60" height="30" viewBox="0 0 60 30">
            <polyline
              points="0,25 15,20 30,15 45,10 60,5"
              stroke="#10b981"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
      );
    }

    if (type === 'line-down') {
      return (
        <div className="mini-chart">
          <svg width="60" height="30" viewBox="0 0 60 30">
            <polyline
              points="0,5 15,8 30,12 45,18 60,25"
              stroke="#ef4444"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="stats-cards">
      {stats.map((stat, index) => (
        <div key={index} className={`stats-card ${stat.type}`}>
          <div className="stats-card-content">
            <div className="stats-info">
              <h3 className="stats-title">{stat.title}</h3>
              <p
                className="stats-value"
                style={{ cursor: 'pointer' }}
                onClick={() => openDialog('value', index, stat.value)}
              >
                {stat.value}
              </p>
              {stat.subtitle && (
                <p
                  className="stats-subtitle"
                  style={{ cursor: 'pointer' }}
                  onClick={() => openDialog('subtitle', index, stat.subtitle)}
                >
                  {stat.subtitle}
                </p>
              )}
              {stat.growth && (
                <p
                  className="stats-growth"
                  style={{ cursor: 'pointer' }}
                  onClick={() => openDialog('growth', index, stat.growth)}
                >
                  {stat.growth}
                </p>
              )}
            </div>
            {renderChart(stat.chart)}
          </div>
        </div>
      ))}
      {isDialogOpen && <Dialog />}
    </div>
  );
};

export default StatsCards;
