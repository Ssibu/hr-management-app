import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`px-4 py-2 rounded transition font-medium ${isActive ? 'bg-blue-600 text-white shadow' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
    >
      {children}
    </Link>
  );
};

export default NavLink; 