import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", value: 1200 },
  { month: "Feb", value: 2100 },
  { month: "Mar", value: 800 },
  { month: "Apr", value: 1600 },
  { month: "May", value: 900 },
  { month: "Jun", value: 1700 },
  { month: "Jul", value: 2500 },
  { month: "Aug", value: 1800 },
  { month: "Sep", value: 2200 },
  { month: "Oct", value: 3000 },
  { month: "Nov", value: 2700 },
  { month: "Dec", value: 3200 },
];

const PerformanceChart = () => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;