import React, { useState } from 'react';

const EmployeeSalary = () => {
  const [salaries, setSalaries] = useState([
    {
      id: 1,
      empId: 'EMP001',
      name: 'John Doe',
      increment: 5000,
      effectiveDate: '2024-01-01',
      remarks: 'Annual increment'
    },
    {
      id: 2,
      empId: 'EMP002',
      name: 'Jane Smith',
      increment: 7000,
      effectiveDate: '2024-02-01',
      remarks: 'Promotion'
    }
  ]);

  const [formData, setFormData] = useState({
    empId: '',
    name: '',
    increment: '',
    effectiveDate: '',
    remarks: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSalaries(prev => [
      ...prev,
      {
        id: prev.length + 1,
        ...formData
      }
    ]);
    setFormData({
      empId: '',
      name: '',
      increment: '',
      effectiveDate: '',
      remarks: ''
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Employee Salary Increment</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <input
          name="empId"
          value={formData.empId}
          onChange={handleInputChange}
          placeholder="Employee ID"
          required
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          name="increment"
          value={formData.increment}
          onChange={handleInputChange}
          placeholder="Increment Amount"
          required
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="date"
          name="effectiveDate"
          value={formData.effectiveDate}
          onChange={handleInputChange}
          required
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="remarks"
          value={formData.remarks}
          onChange={handleInputChange}
          placeholder="Remarks"
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button type="submit" className="md:col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Add Salary Increment</button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Employee ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Increment</th>
              <th className="py-2 px-4 border-b">Effective Date</th>
              <th className="py-2 px-4 border-b">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {salaries.map(sal => (
              <tr key={sal.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{sal.id}</td>
                <td className="py-2 px-4 border-b">{sal.empId}</td>
                <td className="py-2 px-4 border-b">{sal.name}</td>
                <td className="py-2 px-4 border-b">{sal.increment}</td>
                <td className="py-2 px-4 border-b">{sal.effectiveDate}</td>
                <td className="py-2 px-4 border-b">{sal.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeSalary;
