// src/App.js
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Investments from "./pages/Investments";
import Teams from "./pages/Teams";
import Reports from "./pages/Reports";
import KYC from "./pages/KYC";
import Users from "./pages/Users";
import Traders from "./pages/Traders";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import TraderProfile from "./pages/TraderProfile"; 
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
                <Route path="/investments" element={<Investments />} />
                <Route path="/team" element={<Teams />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/kyc" element={<KYC />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<Users />} /> 
                <Route path="/trader" element={<Traders />} />
                <Route path="/trader/:id" element={<TraderProfile />} />
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
