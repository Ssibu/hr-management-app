import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <div className="h-screen w-56 bg-gray-800 text-white flex flex-col pt-20 fixed top-0 left-0 z-20">
    <Link to="/" className="py-3 px-6 hover:bg-gray-700">Employee Policy</Link>
    <Link to="/hr-policy" className="py-3 px-6 hover:bg-gray-700">HR Policy</Link>
    <Link to="/employee-salary" className="py-3 px-6 hover:bg-gray-700">Employee Salary</Link>
  </div>
);

export default Sidebar; 