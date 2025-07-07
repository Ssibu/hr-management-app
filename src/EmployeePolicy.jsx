import React, { useState } from 'react';

const EmployeePolicy = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'John Doe',
      empId: 'EMP001',
      number: '+1-555-0123',
      address: '123 Main St, New York, NY 10001',
      experience: '3 years',
      dateOfJoining: '2023-01-15',
      salary: 75000
    },
    {
      id: 2,
      name: 'Jane Smith',
      empId: 'EMP002',
      number: '+1-555-0124',
      address: '456 Oak Ave, Los Angeles, CA 90210',
      experience: '5 years',
      dateOfJoining: '2022-08-20',
      salary: 82000
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    empId: '',
    number: '',
    address: '',
    experience: '',
    dateOfJoining: '',
    salary: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmployees(prev => [
      ...prev,
      {
        id: prev.length + 1,
        ...formData
      }
    ]);
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

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <h2>Employee Policy</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <input
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
        />{' '}
        <input
          name="empId"
          value={formData.empId}
          onChange={handleInputChange}
          placeholder="Employee ID"
          required
        />{' '}
        <input
          name="number"
          value={formData.number}
          onChange={handleInputChange}
          placeholder="Phone Number"
          required
        />{' '}
        <input
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="Address"
          required
        />{' '}
        <input
          name="experience"
          value={formData.experience}
          onChange={handleInputChange}
          placeholder="Experience (e.g. 3 years)"
          required
        />{' '}
        <input
          type="date"
          name="dateOfJoining"
          value={formData.dateOfJoining}
          onChange={handleInputChange}
          required
        />{' '}
        <input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleInputChange}
          placeholder="Salary"
          required
        />{' '}
        <button type="submit">Add Employee</button>
      </form>
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Experience</th>
            <th>Date of Joining</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.empId}</td>
              <td>{emp.number}</td>
              <td>{emp.address}</td>
              <td>{emp.experience}</td>
              <td>{emp.dateOfJoining}</td>
              <td>{emp.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeePolicy; 