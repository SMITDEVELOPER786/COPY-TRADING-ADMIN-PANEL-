import React, { useState } from 'react';
import '../Dashboard.css';
import Header from '../components/Header';
import StatsCards from '../components/StatsCards';
import Charts from '../components/Charts';
import DataTable from '../components/DataTable';

export default function Home() {
  const [activeTimeFilter, setActiveTimeFilter] = useState('12 Months');

  return (
    <div className="app">
      <main className="main-content">
        <Header/>
        <div className="time-filters">
          {['12 Months', '30 Days', '7 Days', '24 Hour'].map((filter) => (
            <button
              key={filter}
              className={`time-filter ${activeTimeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveTimeFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <StatsCards />
        <Charts />
        <DataTable />
      </main>
    </div>
  );
}

