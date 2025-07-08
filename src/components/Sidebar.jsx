import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <aside className="h-screen w-56 bg-gray-900 text-white flex flex-col pt-20 fixed top-0 left-0 z-20 shadow-lg">
    <div className="mb-8 px-6">
      <h2 className="text-lg font-semibold tracking-wide text-gray-300 mb-2">Navigation</h2>
      <div className="border-b border-gray-700 mb-2"></div>
    </div>
    <Link to="/" className="py-3 px-6 flex items-center gap-2 hover:bg-gray-800 transition rounded-r-lg font-medium">
      <span className="material-icons text-blue-400">badge</span> Employee Policy
    </Link>
    <Link to="/hr-policy" className="py-3 px-6 flex items-center gap-2 hover:bg-gray-800 transition rounded-r-lg font-medium">
      <span className="material-icons text-green-400">policy</span> HR Policy
    </Link>
    <Link to="/employee-salary" className="py-3 px-6 flex items-center gap-2 hover:bg-gray-800 transition rounded-r-lg font-medium">
      <span className="material-icons text-yellow-400">attach_money</span> Employee Salary
    </Link>
  </aside>
);

export default Sidebar; 