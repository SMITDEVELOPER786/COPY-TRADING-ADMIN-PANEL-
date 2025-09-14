import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar
} from "recharts";

const equityData = [
  { month: "Jan", value: 4000 },
  { month: "Feb", value: 4500 },
  { month: "Mar", value: 4700 },
  { month: "Apr", value: 5200 },
  { month: "May", value: 5800 },
  { month: "Jun", value: 6100 },
];

const performanceData = [
  { month: "Jan", profit: 20 },
  { month: "Feb", profit: 35 },
  { month: "Mar", profit: 25 },
  { month: "Apr", profit: 40 },
  { month: "May", profit: 30 },
  { month: "Jun", profit: 50 },
];

const UserCharts = ({ type }) => {
  return (
    <div className="user-chart">
      {type === "equity" ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={equityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#4CAF50" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="profit" fill="#2196F3" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default UserCharts;
