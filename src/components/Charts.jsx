import React, { useState, useEffect } from 'react';
import '../Charts.css';

const Charts = ({ activeTimeFilter, statsData, setStatsData }) => {
  const [activeTab, setActiveTab] = useState('Users');
  const [chartData, setChartData] = useState({
    '12 Months': {
      Investments: {
        barData: [
          { month: 'Jan', value: 20 },
          { month: 'Feb', value: 25 },
          { month: 'Mar', value: 22 },
          { month: 'Apr', value: 30 },
          { month: 'May', value: 18 },
          { month: 'Jun', value: 25 },
          { month: 'Jul', value: 28 },
          { month: 'Aug', value: 20 },
          { month: 'Sep', value: 15 },
          { month: 'Oct', value: 22 },
          { month: 'Nov', value: 27 },
          { month: 'Dec', value: 30 },
        ],
        revenue: parseFloat(statsData['12 Months'][0]?.value.replace(/[\$,M]/g, '')) * 1_000_000 || 23_600_000,
        growth: statsData['12 Months'][0]?.growth ? parseFloat(statsData['12 Months'][0].growth.replace('%', '')) : 0,
        investmentCount: parseInt(statsData['12 Months'][0]?.subtitle.replace(' Investments', '').replace(',', '')) || 145,
        pieData: [
          { label: 'Investor', value: 50, color: '#3b82f6', dasharray: '157.08 314.16', offset: '0' },
          { label: 'Trader', value: 30, color: '#10b981', dasharray: '94.25 314.16', offset: '-157.08' },
          { label: 'Company', value: 20, color: '#f59e0b', dasharray: '62.83 314.16', offset: '-251.33' },
        ],
      },
      Users: {
        barData: [
          { month: 'Jan', value: 1000 },
          { month: 'Feb', value: 1200 },
          { month: 'Mar', value: 1100 },
          { month: 'Apr', value: 1300 },
          { month: 'May', value: 1050 },
          { month: 'Jun', value: 1250 },
          { month: 'Jul', value: 1150 },
          { month: 'Aug', value: 1000 },
          { month: 'Sep', value: 950 },
          { month: 'Oct', value: 1100 },
          { month: 'Nov', value: 1200 },
          { month: 'Dec', value: 1250 },
        ],
        revenue: parseInt(statsData['12 Months'][1]?.value.replace(/,/g, '')) || 12_500,
        growth: parseFloat(statsData['12 Months'][1]?.growth.replace('%', '')) || 12,
        pieData: [
          { label: 'Investor', value: parseInt(statsData['12 Months'][2]?.value.replace(/,/g, '')) || 5_000, color: '#3b82f6', dasharray: '125.66 314.16', offset: '0' },
          { label: 'Trader', value: parseInt(statsData['12 Months'][3]?.value.replace(/,/g, '')) || 6_500, color: '#10b981', dasharray: '94.25 314.16', offset: '-125.66' },
          { label: 'Company', value: 1000, color: '#f59e0b', dasharray: '62.83 314.16', offset: '-219.91' },
        ],
      },
      Revenue: {
        barData: [
          { month: 'Jan', value: 58 },
          { month: 'Feb', value: 85 },
          { month: 'Mar', value: 72 },
          { month: 'Apr', value: 92 },
          { month: 'May', value: 68 },
          { month: 'Jun', value: 85 },
          { month: 'Jul', value: 78 },
          { month: 'Aug', value: 65 },
          { month: 'Sep', value: 58 },
          { month: 'Oct', value: 85 },
          { month: 'Nov', value: 75 },
          { month: 'Dec', value: 82 },
        ],
        revenue: 8_500_100,
        growth: 40,
        pieData: [
          { label: 'Investor', value: 40, color: '#3b82f6', dasharray: '125.66 314.16', offset: '0' },
          { label: 'Trader', value: 30, color: '#10b981', dasharray: '94.25 314.16', offset: '-125.66' },
          { label: 'Company', value: 20, color: '#f59e0b', dasharray: '62.83 314.16', offset: '-219.91' },
        ],
      },
    },
    '30 Days': {
      Investments: {
        barData: [
          { month: 'Day 1-5', value: 15 },
          { month: 'Day 6-10', value: 20 },
          { month: 'Day 11-15', value: 18 },
          { month: 'Day 16-20', value: 25 },
          { month: 'Day 21-25', value: 12 },
          { month: 'Day 26-30', value: 20 },
        ],
        revenue: parseFloat(statsData['30 Days'][0]?.value.replace(/[\$,M]/g, '')) * 1_000_000 || 2_100_000,
        growth: statsData['30 Days'][0]?.growth ? parseFloat(statsData['30 Days'][0].growth.replace('%', '')) : 0,
        investmentCount: parseInt(statsData['30 Days'][0]?.subtitle.replace(' Investments', '').replace(',', '')) || 12,
        pieData: [
          { label: 'Equity', value: 45, color: '#3b82f6', dasharray: '141.37 314.16', offset: '0' },
          { label: 'Debt', value: 35, color: '#10b981', dasharray: '109.96 314.16', offset: '-141.37' },
          { label: 'Other', value: 20, color: '#f59e0b', dasharray: '62.83 314.16', offset: '-251.33' },
        ],
      },
      Users: {
        barData: [
          { month: 'Day 1-5', value: 200 },
          { month: 'Day 6-10', value: 250 },
          { month: 'Day 11-15', value: 220 },
          { month: 'Day 16-20', value: 300 },
          { month: 'Day 21-25', value: 180 },
          { month: 'Day 26-30', value: 250 },
        ],
        revenue: parseInt(statsData['30 Days'][1]?.value.replace(/,/g, '')) || 1_200,
        growth: parseFloat(statsData['30 Days'][1]?.growth.replace('%', '')) || 8,
        pieData: [
          { label: 'Investor', value: parseInt(statsData['30 Days'][2]?.value.replace(/,/g, '')) || 450, color: '#3b82f6', dasharray: '109.96 314.16', offset: '0' },
          { label: 'Trader', value: parseInt(statsData['30 Days'][3]?.value.replace(/,/g, '')) || 600, color: '#10b981', dasharray: '78.54 314.16', offset: '-109.96' },
          { label: 'Other', value: 150, color: '#f59e0b', dasharray: '47.12 314.16', offset: '-188.50' },
        ],
      },
      Revenue: {
        barData: [
          { month: 'Day 1-5', value: 20 },
          { month: 'Day 6-10', value: 25 },
          { month: 'Day 11-15', value: 22 },
          { month: 'Day 16-20', value: 30 },
          { month: 'Day 21-25', value: 18 },
          { month: 'Day 26-30', value: 25 },
        ],
        revenue: 750_000,
        growth: 10,
        pieData: [
          { label: 'Investor', value: 35, color: '#3b82f6', dasharray: '109.96 314.16', offset: '0' },
          { label: 'Trader', value: 25, color: '#10b981', dasharray: '78.54 314.16', offset: '-109.96' },
          { label: 'Company', value: 15, color: '#f59e0b', dasharray: '47.12 314.16', offset: '-188.50' },
        ],
      },
    },
    '7 Days': {
      Investments: {
        barData: [
          { month: 'Day 1', value: 8 },
          { month: 'Day 2', value: 10 },
          { month: 'Day 3', value: 7 },
          { month: 'Day 4', value: 12 },
          { month: 'Day 5', value: 6 },
          { month: 'Day 6', value: 9 },
          { month: 'Day 7', value: 11 },
        ],
        revenue: parseFloat(statsData['7 Days'][0]?.value.replace(/[\$,M]/g, '')) * 1_000_000 || 500_000,
        growth: statsData['7 Days'][0]?.growth ? parseFloat(statsData['7 Days'][0].growth.replace('%', '')) : 0,
        investmentCount: parseInt(statsData['7 Days'][0]?.subtitle.replace(' Investments', '').replace(',', '')) || 3,
        pieData: [
          { label: 'Equity', value: 40, color: '#3b82f6', dasharray: '125.66 314.16', offset: '0' },
          { label: 'Debt', value: 30, color: '#10b981', dasharray: '94.25 314.16', offset: '-125.66' },
          { label: 'Other', value: 15, color: '#f59e0b', dasharray: '47.12 314.16', offset: '-219.91' },
        ],
      },
      Users: {
        barData: [
          { month: 'Day 1', value: 50 },
          { month: 'Day 2', value: 60 },
          { month: 'Day 3', value: 45 },
          { month: 'Day 4', value: 70 },
          { month: 'Day 5', value: 40 },
          { month: 'Day 6', value: 55 },
          { month: 'Day 7', value: 65 },
        ],
        revenue: parseInt(statsData['7 Days'][1]?.value.replace(/,/g, '')) || 300,
        growth: parseFloat(statsData['7 Days'][1]?.growth.replace('%', '')) || 5,
        pieData: [
          { label: 'Investor', value: parseInt(statsData['7 Days'][2]?.value.replace(/,/g, '')) || 100, color: '#3b82f6', dasharray: '94.25 314.16', offset: '0' },
          { label: 'Trader', value: parseInt(statsData['7 Days'][3]?.value.replace(/,/g, '')) || 150, color: '#10b981', dasharray: '62.83 314.16', offset: '-94.25' },
          { label: 'Other', value: 50, color: '#f59e0b', dasharray: '31.42 314.16', offset: '-157.08' },
        ],
      },
      Revenue: {
        barData: [
          { month: 'Day 1', value: 10 },
          { month: 'Day 2', value: 12 },
          { month: 'Day 3', value: 8 },
          { month: 'Day 4', value: 15 },
          { month: 'Day 5', value: 9 },
          { month: 'Day 6', value: 11 },
          { month: 'Day 7', value: 13 },
        ],
        revenue: 150_000,
        growth: 5,
        pieData: [
          { label: 'Investor', value: 30, color: '#3b82f6', dasharray: '94.25 314.16', offset: '0' },
          { label: 'Trader', value: 20, color: '#10b981', dasharray: '62.83 314.16', offset: '-94.25' },
          { label: 'Company', value: 10, color: '#f59e0b', dasharray: '31.42 314.16', offset: '-157.08' },
        ],
      },
    },
    '24 Hour': {
      Investments: {
        barData: [
          { month: 'Hour 1-4', value: 3 },
          { month: 'Hour 5-8', value: 5 },
          { month: 'Hour 9-12', value: 2 },
          { month: 'Hour 13-16', value: 4 },
          { month: 'Hour 17-20', value: 1 },
          { month: 'Hour 21-24', value: 3 },
        ],
        revenue: parseFloat(statsData['24 Hour'][0]?.value.replace(/[\$,M]/g, '')) * 1_000_000 || 50_000,
        growth: statsData['24 Hour'][0]?.growth ? parseFloat(statsData['24 Hour'][0].growth.replace('%', '')) : 0,
        investmentCount: parseInt(statsData['24 Hour'][0]?.subtitle.replace(' Investments', '').replace(',', '')) || 1,
        pieData: [
          { label: 'Equity', value: 35, color: '#3b82f6', dasharray: '109.96 314.16', offset: '0' },
          { label: 'Debt', value: 25, color: '#10b981', dasharray: '78.54 314.16', offset: '-109.96' },
          { label: 'Other', value: 10, color: '#f59e0b', dasharray: '31.42 314.16', offset: '-188.50' },
        ],
      },
      Users: {
        barData: [
          { month: 'Hour 1-4', value: 10 },
          { month: 'Hour 5-8', value: 15 },
          { month: 'Hour 9-12', value: 8 },
          { month: 'Hour 13-16', value: 12 },
          { month: 'Hour 17-20', value: 6 },
          { month: 'Hour 21-24', value: 10 },
        ],
        revenue: parseInt(statsData['24 Hour'][1]?.value.replace(/,/g, '')) || 50,
        growth: parseFloat(statsData['24 Hour'][1]?.growth.replace('%', '')) || 2,
        pieData: [
          { label: 'Investor', value: parseInt(statsData['24 Hour'][2]?.value.replace(/,/g, '')) || 20, color: '#3b82f6', dasharray: '78.54 314.16', offset: '0' },
          { label: 'Trader', value: parseInt(statsData['24 Hour'][3]?.value.replace(/,/g, '')) || 25, color: '#10b981', dasharray: '47.12 314.16', offset: '-78.54' },
          { label: 'Other', value: 5, color: '#f59e0b', dasharray: '15.71 314.16', offset: '-125.66' },
        ],
      },
      Revenue: {
        barData: [
          { month: 'Hour 1-4', value: 5 },
          { month: 'Hour 5-8', value: 7 },
          { month: 'Hour 9-12', value: 4 },
          { month: 'Hour 13-16', value: 6 },
          { month: 'Hour 17-20', value: 3 },
          { month: 'Hour 21-24', value: 5 },
        ],
        revenue: 20_000,
        growth: 2,
        pieData: [
          { label: 'Investor', value: 25, color: '#3b82f6', dasharray: '78.54 314.16', offset: '0' },
          { label: 'Trader', value: 15, color: '#10b981', dasharray: '47.12 314.16', offset: '-78.54' },
          { label: 'Company', value: 5, color: '#f59e0b', dasharray: '15.71 314.16', offset: '-125.66' },
        ],
      },
    },
  });

  useEffect(() => {
    setChartData((prevChartData) => ({
      ...prevChartData,
      '12 Months': {
        ...prevChartData['12 Months'],
        Investments: {
          ...prevChartData['12 Months'].Investments,
          revenue: parseFloat(statsData['12 Months'][0]?.value.replace(/[\$,M]/g, '')) * 1_000_000 || 23_600_000,
          growth: statsData['12 Months'][0]?.growth ? parseFloat(statsData['12 Months'][0].growth.replace('%', '')) : 0,
          investmentCount: parseInt(statsData['12 Months'][0]?.subtitle.replace(' Investments', '').replace(',', '')) || 145,
        },
        Users: {
          ...prevChartData['12 Months'].Users,
          revenue: parseInt(statsData['12 Months'][1]?.value.replace(/,/g, '')) || 12_500,
          growth: parseFloat(statsData['12 Months'][1]?.growth.replace('%', '')) || 12,
          pieData: [
            { ...prevChartData['12 Months'].Users.pieData[0], value: parseInt(statsData['12 Months'][2]?.value.replace(/,/g, '')) || 5_000 },
            { ...prevChartData['12 Months'].Users.pieData[1], value: parseInt(statsData['12 Months'][3]?.value.replace(/,/g, '')) || 6_500 },
            { ...prevChartData['12 Months'].Users.pieData[2], value: 1000 },
          ],
        },
      },
      '30 Days': {
        ...prevChartData['30 Days'],
        Investments: {
          ...prevChartData['30 Days'].Investments,
          revenue: parseFloat(statsData['30 Days'][0]?.value.replace(/[\$,M]/g, '')) * 1_000_000 || 2_100_000,
          growth: statsData['30 Days'][0]?.growth ? parseFloat(statsData['30 Days'][0].growth.replace('%', '')) : 0,
          investmentCount: parseInt(statsData['30 Days'][0]?.subtitle.replace(' Investments', '').replace(',', '')) || 12,
        },
        Users: {
          ...prevChartData['30 Days'].Users,
          revenue: parseInt(statsData['30 Days'][1]?.value.replace(/,/g, '')) || 1_200,
          growth: parseFloat(statsData['30 Days'][1]?.growth.replace('%', '')) || 8,
          pieData: [
            { ...prevChartData['30 Days'].Users.pieData[0], value: parseInt(statsData['30 Days'][2]?.value.replace(/,/g, '')) || 450 },
            { ...prevChartData['30 Days'].Users.pieData[1], value: parseInt(statsData['30 Days'][3]?.value.replace(/,/g, '')) || 600 },
            { ...prevChartData['30 Days'].Users.pieData[2], value: 150 },
          ],
        },
      },
      '7 Days': {
        ...prevChartData['7 Days'],
        Investments: {
          ...prevChartData['7 Days'].Investments,
          revenue: parseFloat(statsData['7 Days'][0]?.value.replace(/[\$,M]/g, '')) * 1_000_000 || 500_000,
          growth: statsData['7 Days'][0]?.growth ? parseFloat(statsData['7 Days'][0].growth.replace('%', '')) : 0,
          investmentCount: parseInt(statsData['7 Days'][0]?.subtitle.replace(' Investments', '').replace(',', '')) || 3,
        },
        Users: {
          ...prevChartData['7 Days'].Users,
          revenue: parseInt(statsData['7 Days'][1]?.value.replace(/,/g, '')) || 300,
          growth: parseFloat(statsData['7 Days'][1]?.growth.replace('%', '')) || 5,
          pieData: [
            { ...prevChartData['7 Days'].Users.pieData[0], value: parseInt(statsData['7 Days'][2]?.value.replace(/,/g, '')) || 100 },
            { ...prevChartData['7 Days'].Users.pieData[1], value: parseInt(statsData['7 Days'][3]?.value.replace(/,/g, '')) || 150 },
            { ...prevChartData['7 Days'].Users.pieData[2], value: 50 },
          ],
        },
      },
      '24 Hour': {
        ...prevChartData['24 Hour'],
        Investments: {
          ...prevChartData['24 Hour'].Investments,
          revenue: parseFloat(statsData['24 Hour'][0]?.value.replace(/[\$,M]/g, '')) * 1_000_000 || 50_000,
          growth: statsData['24 Hour'][0]?.growth ? parseFloat(statsData['24 Hour'][0].growth.replace('%', '')) : 0,
          investmentCount: parseInt(statsData['24 Hour'][0]?.subtitle.replace(' Investments', '').replace(',', '')) || 1,
        },
        Users: {
          ...prevChartData['24 Hour'].Users,
          revenue: parseInt(statsData['24 Hour'][1]?.value.replace(/,/g, '')) || 50,
          growth: parseFloat(statsData['24 Hour'][1]?.growth.replace('%', '')) || 2,
          pieData: [
            { ...prevChartData['24 Hour'].Users.pieData[0], value: parseInt(statsData['24 Hour'][2]?.value.replace(/,/g, '')) || 20 },
            { ...prevChartData['24 Hour'].Users.pieData[1], value: parseInt(statsData['24 Hour'][3]?.value.replace(/,/g, '')) || 25 },
            { ...prevChartData['24 Hour'].Users.pieData[2], value: 5 },
          ],
        },
      },
    }));
  }, [statsData, activeTimeFilter]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editType, setEditType] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  const currentData = chartData[activeTimeFilter][activeTab];
  const maxValue = Math.max(...currentData.barData.map((d) => d.value));

  const openDialog = (type, index = null, value = '') => {
    setEditType(type);
    setEditIndex(index);
    setEditValue(value);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    const value = Number(editValue);
    if (isNaN(value)) {
      alert('Please enter a valid number');
      return;
    }

    const updatedChartData = { ...chartData };
    const updatedStatsData = { ...statsData };

    if (editType === 'bar' && value >= 0) {
      updatedChartData[activeTimeFilter][activeTab].barData[editIndex].value = value;
    } else if (editType === 'revenue' && value >= 0) {
      updatedChartData[activeTimeFilter][activeTab].revenue = value;
      if (activeTab === 'Investments') {
        updatedStatsData[activeTimeFilter][0].value = `$${Math.round(value / 1_000_000)}M`;
      } else if (activeTab === 'Users') {
        updatedStatsData[activeTimeFilter][1].value = Math.round(value).toLocaleString();
      }
    } else if (editType === 'growth' && value >= -100) {
      updatedChartData[activeTimeFilter][activeTab].growth = value;
      if (activeTab === 'Investments') {
        updatedStatsData[activeTimeFilter][0].growth = `${value >= 0 ? '+' : ''}${value}%`;
      } else if (activeTab === 'Users') {
        updatedStatsData[activeTimeFilter][1].growth = `${value >= 0 ? '+' : ''}${value}%`;
      }
    } else if (editType === 'pie' && value >= 0) {
      updatedChartData[activeTimeFilter][activeTab].pieData[editIndex].value = value;
      if (activeTab === 'Users') {
        if (updatedChartData[activeTimeFilter][activeTab].pieData[editIndex].label === 'Investor') {
          updatedStatsData[activeTimeFilter][2].value = Math.round(value).toLocaleString();
        } else if (updatedChartData[activeTimeFilter][activeTab].pieData[editIndex].label === 'Trader') {
          updatedStatsData[activeTimeFilter][3].value = Math.round(value).toLocaleString();
        }
      }
      const total = updatedChartData[activeTimeFilter][activeTab].pieData.reduce((sum, item) => sum + item.value, 0);
      let cumulativeOffset = 0;
      updatedChartData[activeTimeFilter][activeTab].pieData.forEach((item) => {
        const percentage = total ? (item.value / total) * 314.16 : 0;
        item.dasharray = `${percentage} 314.16`;
        item.offset = `${-cumulativeOffset}`;
        cumulativeOffset += percentage;
      });
    } else if (editType === 'investmentCount' && value >= 0 && activeTab === 'Investments') {
      updatedStatsData[activeTimeFilter][0].subtitle = `${Math.round(value).toLocaleString()} Investments`;
      updatedChartData[activeTimeFilter][activeTab].investmentCount = value;
    } else {
      alert('Invalid value');
      return;
    }

    setChartData(updatedChartData);
    setStatsData(updatedStatsData);
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
          Edit {editType === 'bar' ? `${currentData.barData[editIndex]?.month} Value` : editType === 'pie' ? `${currentData.pieData[editIndex]?.label} Value` : editType === 'revenue' ? 'Revenue' : editType === 'growth' ? 'Growth' : 'Investment Count'}
        </h3>
        <input
          type="number"
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

  return (
    <div className="charts-section">
      <div className="chart-card">
        <div className="chart-header">
          <div className="chart-tabs">
            {['Investments', 'Users', 'Revenue'].map((tab) => (
              <button
                key={tab}
                className={`chart-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="chart-stats">
          <h3
            className="chart-value"
            style={{ cursor: 'pointer' }}
            onClick={() => openDialog('revenue', null, currentData.revenue)}
          >
            {activeTab === 'Investments' ? `$${currentData.revenue.toLocaleString()}` : currentData.revenue.toLocaleString()}
          </h3>
          <span
            className="chart-growth"
            style={{ cursor: 'pointer' }}
            onClick={() => openDialog('growth', null, currentData.growth)}
          >
            {currentData.growth >= 0 ? '+' : ''}{currentData.growth}%
          </span>
          {activeTab === 'Investments' && (
            <span
              className="chart-subtitle"
              style={{ cursor: 'pointer' }}
              onClick={() => openDialog('investmentCount', null, currentData.investmentCount)}
            >
              {statsData[activeTimeFilter][0]?.subtitle || '0 Investments'}
            </span>
          )}
        </div>

        <div className="bar-chart">
          {currentData.barData.map((data, index) => (
            <div key={index} className="bar-container">
              <div
                className="bar"
                style={{ height: `${(data.value / maxValue) * 100}%` }}
                onClick={() => openDialog('bar', index, data.value)}
              ></div>
              <span className="bar-label">{data.month}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="revenue-section">
        <div className="revenue-card">
          <h2
            className="revenue-value"
            style={{ cursor: 'pointer' }}
            onClick={() => openDialog('revenue', null, currentData.revenue)}
          >
            {activeTab === 'Investments' ? `$${currentData.revenue.toLocaleString()}` : currentData.revenue.toLocaleString()}
          </h2>
          <p className="revenue-label">{activeTab} Total</p>
          <div className="revenue-growth">
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => openDialog('growth', null, currentData.growth)}
            >
              {currentData.growth >= 0 ? '↗' : '↘'} {Math.abs(currentData.growth)}% vs Last {activeTimeFilter}
            </span>
          </div>
        </div>

        <div className="pie-chart-card">
          <div className="pie-chart">
            <svg width="120" height="120" viewBox="0 0 120 120">
              {currentData.pieData.map((item, index) => (
                <circle
                  key={index}
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke={item.color}
                  strokeWidth="20"
                  strokeDasharray={item.dasharray}
                  strokeDashoffset={item.offset}
                  transform="rotate(-90 60 60)"
                  style={{ cursor: 'pointer' }}
                  onClick={() => openDialog('pie', index, item.value)}
                />
              ))}
            </svg>
          </div>
          <div className="pie-legend">
            {currentData.pieData.map((item, index) => (
              <div
                key={index}
                className="legend-item"
                style={{ cursor: 'pointer' }}
                onClick={() => openDialog('pie', index, item.value)}
              >
                <div className={`legend-color ${item.label.toLowerCase()}`}></div>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isDialogOpen && <Dialog />}
    </div>
  );
};

export default Charts;