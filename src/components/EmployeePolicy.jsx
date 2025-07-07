import React, { useState, useEffect } from 'react';
import './EmployeePolicy.css';

const EmployeePolicy = () => {
  const [employees, setEmployees] = useState([]);
  const [stats, setStats] = useState({ totalEmployees: 0, totalSalary: 0 });
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    empId: '',
    number: '',
    address: '',
    experience: '',
    dateOfJoining: '',
    salary: ''
  });

  useEffect(() => {
    const dummyEmployees = [
      {
        _id: 'emp001',
        name: 'Alice Johnson',
        empId: 'E123',
        number: '9876543210',
        address: '123 Main St, City A',
        experience: '3 years',
        dateOfJoining: '2023-04-15',
        salary: 50000
      },
      {
        _id: 'emp002',
        name: 'Bob Smith',
        empId: 'E456',
        number: '9876543211',
        address: '456 Park Ave, City B',
        experience: '3 years',
        dateOfJoining: '2022-10-01',
        salary: 60000
      },
      {
        _id: 'emp003',
        name: 'Clara Lee',
        empId: 'E789',
        number: '9876543212',
        address: '789 Lake Rd, City C',
        experience: '5 years',
        dateOfJoining: '2021-07-22',
        salary: 55000
      },
      {
        _id: 'emp004',
        name: 'David Kim',
        empId: 'E321',
        number: '9876543213',
        address: '321 Forest Ln, City D',
        experience: '5 years',
        dateOfJoining: '2020-03-11',
        salary: 70000
      },
      {
        _id: 'emp005',
        name: 'Ella Ray',
        empId: 'E654',
        number: '9876543214',
        address: '654 Hilltop Blvd, City E',
        experience: '5 years',
        dateOfJoining: '2019-11-30',
        salary: 48000
      },
      {
        _id: 'emp006',
        name: 'Frank Zhang',
        empId: 'E987',
        number: '9876543215',
        address: '987 Sunset St, City F',
        experience: '3 years',
        dateOfJoining: '2021-01-10',
        salary: 53000
      },
      {
        _id: 'emp007',
        name: 'Grace Lin',
        empId: 'E147',
        number: '9876543216',
        address: '147 River Rd, City G',
        experience: '3 years',
        dateOfJoining: '2022-06-18',
        salary: 62000
      },
      {
        _id: 'emp008',
        name: 'Henry Ford',
        empId: 'E258',
        number: '9876543217',
        address: '258 Ocean Dr, City H',
        experience: '3 years',
        dateOfJoining: '2023-02-05',
        salary: 58000
      },
      {
        _id: 'emp009',
        name: 'Isla Monroe',
        empId: 'E369',
        number: '9876543218',
        address: '369 Maple Ave, City I',
        experience: '3 years',
        dateOfJoining: '2018-09-25',
        salary: 64000
      },
      {
        _id: 'emp010',
        name: 'Jackie Chan',
        empId: 'E741',
        number: '9876543219',
        address: '741 Desert St, City J',
        experience: '5 years',
        dateOfJoining: '2020-12-12',
        salary: 67000
      }
    ];

    setEmployees(dummyEmployees);
    const totalSalary = dummyEmployees.reduce((sum, emp) => sum + emp.salary, 0);
    setStats({ totalEmployees: dummyEmployees.length, totalSalary });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEmployee = {
      _id: 'emp' + (employees.length + 1).toString().padStart(3, '0'),
      ...formData,
      salary: parseFloat(formData.salary)
    };

    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);

    const totalSalary = updatedEmployees.reduce((sum, emp) => sum + emp.salary, 0);
    setStats({ totalEmployees: updatedEmployees.length, totalSalary });

    setFormData({
      name: '',
      empId: '',
      number: '',
      address: '',
      experience: '',
      dateOfJoining: '',
      salary: ''
    });
  };

  const handleDelete = (id) => {
    const updatedEmployees = employees.filter(emp => emp._id !== id);
    setEmployees(updatedEmployees);

    const totalSalary = updatedEmployees.reduce((sum, emp) => sum + emp.salary, 0);
    setStats({ totalEmployees: updatedEmployees.length, totalSalary });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="employee-policy">
      <h1>Employee Policy Management</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="form-section">
        <h2>Add New Employee</h2>
        <form onSubmit={handleSubmit} className="employee-form">
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Employee ID:</label>
            <input type="text" name="empId" value={formData.empId} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Phone Number:</label>
            <input type="tel" name="number" value={formData.number} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <textarea name="address" value={formData.address} onChange={handleInputChange} required rows="2" />
          </div>
          <div className="form-group">
            <label>Experience:</label>
            <input type="text" name="experience" value={formData.experience} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Date of Joining:</label>
            <input type="date" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Salary:</label>
            <input type="number" name="salary" value={formData.salary} onChange={handleInputChange} required min="0" step="0.01" />
          </div>
          <button type="submit" className="submit-btn">Add Employee</button>
        </form>
      </div>

      <div className="table-section">
        <h2>Employee List</h2>
        <div className="table-container">
          <table className="employee-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Employee ID</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Experience</th>
                <th>Date of Joining</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee._id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.empId}</td>
                  <td>{employee.number}</td>
                  <td>{employee.address}</td>
                  <td>{employee.experience}</td>
                  <td>{formatDate(employee.dateOfJoining)}</td>
                  <td>${employee.salary.toLocaleString()}</td>
                  <td>
                    <button onClick={() => handleDelete(employee._id)} className="delete-btn">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center' }}>No employees found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="summary">
          <p>Total Employees: {stats.totalEmployees}</p>
          <p>Total Salary: ${stats.totalSalary.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeePolicy;
