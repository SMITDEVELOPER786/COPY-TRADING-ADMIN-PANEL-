import React from 'react';
import '../StatsCards.css';

const StatsCards = () => {
  const stats = [
    {
      title: 'Total Investments',
      value: '$23.6M',
      subtitle: '1,45 Investments',
      type: 'primary',
      growth: null,
      chart: null
    },
    {
      title: 'Total Users',
      value: '12,500',
      growth: '+12%',
      type: 'secondary',
      chart: 'line-up'
    },
    {
      title: 'Total Investors',
      value: '5,000',
      growth: '+12%',
      type: 'secondary',
      chart: 'line-up'
    },
    {
      title: 'Total Traders',
      value: '6,500',
      growth: '+12%',
      type: 'secondary',
      chart: 'line-down'
    }
  ];

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
              <p className="stats-value">{stat.value}</p>
              {stat.subtitle && (
                <p className="stats-subtitle">{stat.subtitle}</p>
              )}
              {stat.growth && (
                <p className="stats-growth">{stat.growth}</p>
              )}
            </div>
            {renderChart(stat.chart)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;