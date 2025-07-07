import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import NavLink from './components/NavLink'
import EmployeePolicy from './components/EmployeePolicy'
import HRPolicy from './components/HRPolicy'
import EmployeeSalary from './components/EmployeeSalary'
import './App.css'

function App() {
  return (
    <div className="App">
      <div className="nav-tabs">
        <NavLink to="/employee">
          Employee Policy
        </NavLink>
        <NavLink to="/hr">
          HR Policy
        </NavLink>
        <NavLink to="/salary">
          Employee Salary
        </NavLink>
      </div>
      
      <div className="content">
        <Routes>
          <Route path="/" element={<Navigate to="/employee" replace />} />
          <Route path="/employee" element={<EmployeePolicy />} />
          <Route path="/hr" element={<HRPolicy />} />
          <Route path="/salary" element={<EmployeeSalary />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
