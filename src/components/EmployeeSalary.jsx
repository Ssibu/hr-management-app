import React, { useState } from 'react';
import { useEmployeeData } from '../EmployeeDataContext';

const EmployeeSalary = () => {
  const { employees } = useEmployeeData();
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = (idx) => {
    setEditIndex(idx);
    setFormData(salaries[idx]);
    setIsModalOpen(true);
  };

  const handleDelete = (idx) => {
    setSalaries(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      setSalaries(prev => prev.map((s, i) => i === editIndex ? { ...formData } : s));
      setEditIndex(null);
    } else {
      setSalaries(prev => [...prev, { ...formData, id: salaries.length + 1 }]);
    }
    setFormData({ empId: '', name: '', increment: '', effectiveDate: '', remarks: '' });
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-8 transition-all duration-200 hover:shadow-2xl">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold text-blue-900 tracking-tight drop-shadow">Employee Salary Increment</h2>
        <button
          onClick={() => { setIsModalOpen(true); setEditIndex(null); setFormData({ empId: '', name: '', increment: '', effectiveDate: '', remarks: '' }); }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-8 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl text-lg"
        >
          + Add Salary Increment
        </button>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-3xl relative border-2 border-blue-100">
            <button
              onClick={() => { setIsModalOpen(false); setEditIndex(null); }}
              className="absolute top-3 right-3 text-gray-400 hover:text-blue-600 text-3xl font-bold focus:outline-none"
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-6 text-blue-800">{editIndex !== null ? 'Edit Salary Increment' : 'Add Salary Increment'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-8 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl text-lg">{editIndex !== null ? 'Update Salary Increment' : 'Add Salary Increment'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-base">
          <thead className="bg-blue-100 sticky top-0 z-10">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Increment</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Effective Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {salaries.map((sal, idx) => (
              <tr key={sal.id} className={idx % 2 === 0 ? 'bg-blue-50 hover:bg-blue-100 transition' : 'hover:bg-blue-50 transition'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sal.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sal.empId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sal.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sal.increment}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sal.effectiveDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sal.remarks}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm flex gap-2">
                  <button onClick={() => handleEdit(idx)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded shadow">Edit</button>
                  <button onClick={() => handleDelete(idx)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeSalary;
