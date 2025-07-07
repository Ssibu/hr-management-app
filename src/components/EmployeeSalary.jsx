import React, { useState, useEffect } from 'react';
import './EmployeeSalary.css';

const EmployeeSalary = () => {
  const [employees, setEmployees] = useState([]);
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalCurrentSalary: 0,
    totalIncreasedSalary: 0,
    averageIncrease: 0
  });

  const [formData, setFormData] = useState({
    name: '',
    experience: '',
    salary: '',
    increasedSalary: ''
  });

  useEffect(() => {
    const dummyEmployees = [
      {
        _id: 'sal001',
        name: 'Alice Johnson',
        experience: '3 years',
        salary: 50000,
        increasedSalary: 55000
      },
      {
        _id: 'sal002',
        name: 'Bob Smith',
        experience: '5 years',
        salary: 60000,
        increasedSalary: 66000
      },
      {
        _id: 'sal003',
        name: 'Clara Lee',
        experience: '2 years',
        salary: 48000,
        increasedSalary: 52800
      },
      {
        _id: 'sal004',
        name: 'David Kim',
        experience: '7 years',
        salary: 75000,
        increasedSalary: 82500
      },
      {
        _id: 'sal005',
        name: 'Ella Ray',
        experience: '1 year',
        salary: 40000,
        increasedSalary: 44000
      },
      {
        _id: 'sal006',
        name: 'Frank Zhang',
        experience: '6 years',
        salary: 68000,
        increasedSalary: 74800
      },
      {
        _id: 'sal007',
        name: 'Grace Lin',
        experience: '4 years',
        salary: 53000,
        increasedSalary: 58300
      },
      {
        _id: 'sal008',
        name: 'Henry Ford',
        experience: '10 years',
        salary: 90000,
        increasedSalary: 99000
      },
      {
        _id: 'sal009',
        name: 'Isla Monroe',
        experience: '8 years',
        salary: 72000,
        increasedSalary: 79200
      },
      {
        _id: 'sal010',
        name: 'Jackie Chan',
        experience: '9 years',
        salary: 85000,
        increasedSalary: 93500
      }
    ];

    setEmployees(dummyEmployees);
    calculateStats(dummyEmployees);
  }, []);

  const calculateStats = (data) => {
    const totalEmployees = data.length;
    const totalCurrentSalary = data.reduce((sum, emp) => sum + emp.salary, 0);
    const totalIncreasedSalary = data.reduce((sum, emp) => sum + emp.increasedSalary, 0);
    const averageIncrease = totalEmployees > 0
      ? (totalIncreasedSalary - totalCurrentSalary) / totalEmployees
      : 0;

    setStats({
      totalEmployees,
      totalCurrentSalary,
      totalIncreasedSalary,
      averageIncrease
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateIncreasedSalary = (salary) => {
    const current = parseFloat(salary);
    return (current + current * 0.1).toFixed(2);
  };

  const handleSalaryChange = (e) => {
    const salary = e.target.value;
    const increasedSalary = calculateIncreasedSalary(salary);
    setFormData(prev => ({
      ...prev,
      salary,
      increasedSalary
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEmployee = {
      _id: 'sal' + (employees.length + 1).toString().padStart(3, '0'),
      name: formData.name,
      experience: formData.experience,
      salary: parseFloat(formData.salary),
      increasedSalary: parseFloat(formData.increasedSalary)
    };

    const updated = [...employees, newEmployee];
    setEmployees(updated);
    calculateStats(updated);

    setFormData({
      name: '',
      experience: '',
      salary: '',
      increasedSalary: ''
    });
  };

  const handleDelete = (id) => {
    const updated = employees.filter(emp => emp._id !== id);
    setEmployees(updated);
    calculateStats(updated);
  };

  return (
    <div className="employee-salary">
      <h1>Employee Salary Management</h1>

      <div className="form-section">
        <h2>Add New Employee Salary</h2>
        <form onSubmit={handleSubmit} className="salary-form">
          <div className="form-group">
            <label>Employee Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Experience:</label>
            <input type="text" name="experience" value={formData.experience} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Current Salary:</label>
            <input type="number" name="salary" value={formData.salary} onChange={handleSalaryChange} required min="0" step="0.01" />
          </div>
          <div className="form-group">
            <label>Increased Salary:</label>
            <input type="number" name="increasedSalary" value={formData.increasedSalary} readOnly required />
          </div>
          <button type="submit" className="submit-btn">Add Employee</button>
        </form>
      </div>

      <div className="table-section">
        <h2>Employee Salary List</h2>
        <div className="table-container">
          <table className="salary-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Employee Name</th>
                <th>Experience</th>
                <th>Current Salary</th>
                <th>Increased Salary</th>
                <th>Increase Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => {
                const increase = employee.increasedSalary - employee.salary;
                return (
                  <tr key={employee._id}>
                    <td>{employee._id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.experience}</td>
                    <td>${employee.salary.toLocaleString()}</td>
                    <td>${employee.increasedSalary.toLocaleString()}</td>
                    <td className="increase-amount">+${increase.toLocaleString()}</td>
                    <td>
                      <button onClick={() => handleDelete(employee._id)} className="delete-btn">Delete</button>
                    </td>
                  </tr>
                );
              })}
              {employees.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center' }}>No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="summary">
          <p>Total Employees: {stats.totalEmployees}</p>
          <p>Total Current Salary: ${stats.totalCurrentSalary.toLocaleString()}</p>
          <p>Total Increased Salary: ${stats.totalIncreasedSalary.toLocaleString()}</p>
          <p>Average Increase: ${stats.averageIncrease.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSalary;
