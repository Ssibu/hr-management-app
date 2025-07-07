import React, { useState, useEffect } from 'react';

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
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Employee Policy</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <input
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="empId"
          value={formData.empId}
          onChange={handleInputChange}
          placeholder="Employee ID"
          required
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="number"
          value={formData.number}
          onChange={handleInputChange}
          placeholder="Phone Number"
          required
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="Address"
          required
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="experience"
          value={formData.experience}
          onChange={handleInputChange}
          placeholder="Experience (e.g. 3 years)"
          required
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="date"
          name="dateOfJoining"
          value={formData.dateOfJoining}
          onChange={handleInputChange}
          required
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleInputChange}
          placeholder="Salary"
          required
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button type="submit" className="md:col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Add Employee</button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Employee ID</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Address</th>
              <th className="py-2 px-4 border-b">Experience</th>
              <th className="py-2 px-4 border-b">Date of Joining</th>
              <th className="py-2 px-4 border-b">Salary</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{emp.id}</td>
                <td className="py-2 px-4 border-b">{emp.name}</td>
                <td className="py-2 px-4 border-b">{emp.empId}</td>
                <td className="py-2 px-4 border-b">{emp.number}</td>
                <td className="py-2 px-4 border-b">{emp.address}</td>
                <td className="py-2 px-4 border-b">{emp.experience}</td>
                <td className="py-2 px-4 border-b">{emp.dateOfJoining}</td>
                <td className="py-2 px-4 border-b">{emp.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeePolicy;
