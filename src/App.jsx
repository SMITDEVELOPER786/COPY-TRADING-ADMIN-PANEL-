import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Investments from "./pages/Investments";
import Teams from "./pages/Teams";
import Reports from "./pages/Reports";
import KYC from "./pages/KYC";
import Users from "./pages/Users";
import Investors from "./pages/Investors";
import Traders from "./pages/Traders";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import InvestorProfile from './pages/InvestorProfile';
import TraderProfile from './pages/TraderProfile';
import "./App.css";

function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return isLoggedIn ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Sidebar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/investments" element={<Investors />} />
                <Route path="/investment/:investmentId/investor/:investorId" element={<InvestorProfile />} />
                <Route path="/trader/:traderId" element={<TraderProfile />} />
                <Route path="/team" element={<Teams />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/kyc" element={<KYC />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<Users />} />
                <Route path="/investors" element={<Investors />} />
                <Route path="/trader" element={<Traders />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;