import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`nav-tab ${isActive ? 'active' : ''}`}
    >
      {children}
    </Link>
  );
};

export default NavLink; 