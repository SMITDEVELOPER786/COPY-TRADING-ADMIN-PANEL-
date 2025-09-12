import "@ant-design/v5-patch-for-react-19";
import {Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dasboard";
import Investments from "./pages/Investments";
import Teams from "./pages/Teams";
import Reports from "./pages/Reports";
import KYC from "./pages/KYC";
import Users from "./pages/Users";
import Traders from "./pages/Traders";
import Messages from "./pages/Messages";
import Sidebar from "./components/Sidebar";
import './App.css'

function App() {
  return (
    <>
      <Sidebar/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/investments" element={<Investments />} />
        <Route path="/team" element={<Teams />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/kyc" element={<KYC />} />
        <Route path="/users" element={<Users />} />
        <Route path="/trader" element={<Traders />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </>
  );
}

export default App;
