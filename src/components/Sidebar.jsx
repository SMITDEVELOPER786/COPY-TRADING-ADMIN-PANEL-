import React from 'react';
import '../Sidebar.css';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  User, 
  MessageSquare, 
  FileText, 
  Shield, 
  Settings, 
  LogOut,
  UsersIcon
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Investments', icon: TrendingUp, path: '/investments' },
    { name: 'Traders', icon: User, path: '/trader' },
    { name: 'Users', icon: Users, path: '/users' },
    { name: 'Team', icon: UsersIcon, path: '/team' },
    { name: 'Message', icon: MessageSquare, path: '/messages' },
    { name: 'Reports', icon: FileText, path: '/reports' },
  ];

  const bottomItems = [
    { name: 'KYC', icon: Shield, path: '/kyc' },
    { name: 'Settings', icon: Settings, path: '/settings' },
    { name: 'Logout', icon: LogOut, path: '/logout' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link 
                key={item.name} 
                to={item.path} 
                className={`sidebar-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="sidebar-divider"></div>
        
        <nav className="sidebar-bottom">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link 
                key={item.name} 
                to={item.path} 
                className={`sidebar-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
