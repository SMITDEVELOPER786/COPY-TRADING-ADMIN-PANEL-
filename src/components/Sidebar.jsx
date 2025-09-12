import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={{ width: "220px", background: "#0A4D3C", color: "white", minHeight: "100vh", padding: "20px" }}>
      <h2>Admin Panel</h2>
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><Link to="/" style={{ color: "white", textDecoration: "none" }}>Dashboard</Link></li>
          <li><Link to="/investments" style={{ color: "white", textDecoration: "none" }}>Investments</Link></li>
          <li><Link to="/team" style={{ color: "white", textDecoration: "none" }}>Team</Link></li>
          <li><Link to="/reports" style={{ color: "white", textDecoration: "none" }}>Reports</Link></li>
          <li><Link to="/kyc" style={{ color: "white", textDecoration: "none" }}>KYC</Link></li>
          <li><Link to="/users" style={{ color: "white", textDecoration: "none" }}>Users</Link></li>
          <li><Link to="/trader" style={{ color: "white", textDecoration: "none" }}>Traders</Link></li>
          <li><Link to="/messages" style={{ color: "white", textDecoration: "none" }}>Messages</Link></li>
        </ul>
      </nav>
    </div>
  );
}
