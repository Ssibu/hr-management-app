import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EmployeePolicy from './components/EmployeePolicy';
import HRPolicy from './components/HRPolicy';
import EmployeeSalary from './components/EmployeeSalary';

const Sidebar = () => (
  <div className="h-screen w-56 bg-gray-800 text-white flex flex-col pt-20 fixed top-0 left-0 z-20">
    <Link to="/" className="py-3 px-6 hover:bg-gray-700">Employee Policy</Link>
    <Link to="/hr-policy" className="py-3 px-6 hover:bg-gray-700">HR Policy</Link>
    <Link to="/employee-salary" className="py-3 px-6 hover:bg-gray-700">Employee Salary</Link>
  </div>
);

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full h-16 bg-blue-600 text-white flex items-center px-8 z-30 shadow">
    <h1 className="text-2xl font-bold">HR Management App</h1>
  </nav>
);

const App = () => (
  <Router>
    <Navbar />
    <Sidebar />
    <div className="ml-56 pt-20 px-8 min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<EmployeePolicy />} />
        <Route path="/hr-policy" element={<HRPolicy />} />
        <Route path="/employee-salary" element={<EmployeeSalary />} />
      </Routes>
    </div>
  </Router>
);

export default App;
