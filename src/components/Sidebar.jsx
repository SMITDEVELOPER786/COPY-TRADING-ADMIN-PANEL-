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
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    
    localStorage.removeItem('userData');
    localStorage.removeItem('userRole');
    
    if (window.innerWidth <= 1024) {
      setIsOpen(false);
    }
    
    navigate('/login');
  };

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
    { name: 'Logout', icon: LogOut, path: '/logout', isLogout: true },
  ];

  const handleItemClick = (item) => {
    if (item.isLogout) {
      handleLogout();
    } else {
      if (window.innerWidth <= 1024) {
        setIsOpen(false);
      }
    }
  };

  return (
    <>
      <button 
         className="mobile-toggle"
         onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

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
                  onClick={() => handleItemClick(item)}
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
              const isActive = location.pathname === item.path && !item.isLogout;

              if (item.isLogout) {
                return (
                  <button
                     key={item.name}
                     onClick={() => handleItemClick(item)}
                     className="sidebar-item logout-button"
                  >
                    <Icon size={20} />
                    <span>{item.name}</span>
                  </button>
                );
              }

              return (
                <Link
                   key={item.name}
                   to={item.path}
                   className={`sidebar-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleItemClick(item)}
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