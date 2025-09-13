import React, { useState, useEffect } from 'react';
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
  UsersIcon,
  Menu,
  X      
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true); // default open on desktop

  // ✅ Detect screen size (desktop vs mobile)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setIsOpen(false); // mobile: closed by default
      } else {
        setIsOpen(true); // desktop: always open
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    <>
      {/* 📱 Mobile Hamburger Button */}
      <button 
        className="mobile-toggle" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
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
                  onClick={() => {
                    if (window.innerWidth <= 1024) setIsOpen(false); // close on mobile click
                  }}
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
                  onClick={() => {
                    if (window.innerWidth <= 1024) setIsOpen(false);
                  }}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
