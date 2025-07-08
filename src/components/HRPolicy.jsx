import React, { useState } from 'react';
import { useEmployeeData } from '../EmployeeDataContext';

function getIncrementPercent(experienceYears) {
  if (experienceYears >= 4 && experienceYears <= 5) return 15;
  if (experienceYears === 3) return 10;
  if (experienceYears === 2) return 8;
  if (experienceYears === 1) return 5;
  return 0;
}

function getYearsFromExperience(expStr) {
  const match = expStr.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

function daysBetween(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return Math.floor((d2 - d1) / (1000 * 60 * 60 * 24));
}

const HRPolicy = () => {
  const { employees } = useEmployeeData();
  const [eligibleEmployees, setEligibleEmployees] = useState([]);
  const [policies, setPolicies] = useState([
    // Example initial data
    { policyName: 'Leave Policy', eligibility: 'All Employees', eligibilityDays: 30, description: 'Employees are eligible for 30 days of leave per year.' },
    { policyName: 'Work From Home', eligibility: 'Full-time Employees', eligibilityDays: 10, description: 'Full-time employees can work from home up to 10 days a year.' }
  ]);
  const [formData, setFormData] = useState({ policyName: '', eligibility: '', eligibilityDays: '', description: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = (idx) => {
    setEditIndex(idx);
    setFormData(policies[idx]);
    setIsModalOpen(true);
  };

  const handleDelete = (idx) => {
    setPolicies(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      setPolicies(prev => prev.map((p, i) => i === editIndex ? { ...formData } : p));
      setEditIndex(null);
    } else {
      setPolicies(prev => [...prev, { ...formData }]);
    }
    setFormData({ policyName: '', eligibility: '', eligibilityDays: '', description: '' });
    setIsModalOpen(false);
  };

  const handleCheckEligibility = () => {
    const today = new Date();
    const eligible = employees.filter(emp => {
      const days = daysBetween(emp.dateOfJoining, today);
      return days >= 180;
    }).map(emp => {
      const years = getYearsFromExperience(emp.experience);
      const percent = getIncrementPercent(years);
      const increment = Math.round(emp.salary * (percent / 100));
      return {
        ...emp,
        experienceYears: years,
        incrementPercent: percent,
        incrementAmount: increment,
        newSalary: emp.salary + increment
      };
    }).filter(emp => emp.incrementPercent > 0);
    setEligibleEmployees(eligible);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-8 transition-all duration-200 hover:shadow-2xl">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold text-blue-900 tracking-tight drop-shadow">HR Policy</h2>
        <button
          onClick={() => { setIsModalOpen(true); setEditIndex(null); setFormData({ policyName: '', eligibility: '', eligibilityDays: '', description: '' }); }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-8 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl text-lg"
        >
          + Add Policy
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
            <h3 className="text-2xl font-bold mb-6 text-blue-800">{editIndex !== null ? 'Edit Policy' : 'Add Policy'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <input
                  name="policyName"
                  value={formData.policyName}
                  onChange={handleInputChange}
                  placeholder="Policy Name"
                  required
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  name="eligibility"
                  value={formData.eligibility}
                  onChange={handleInputChange}
                  placeholder="Eligibility"
                  required
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="number"
                  name="eligibilityDays"
                  value={formData.eligibilityDays}
                  onChange={handleInputChange}
                  placeholder="Eligibility in Days"
                  required
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                  required
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-8 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl text-lg">{editIndex !== null ? 'Update Policy' : 'Add Policy'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Eligibility Check */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Check Increment Eligibility</h2>
        <button
          onClick={handleCheckEligibility}
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 shadow hover:shadow-md"
        >
          Check Increment Eligibility
        </button>
      </div>
      {eligibleEmployees.length > 0 && (
        <div className="overflow-x-auto mb-8 rounded-2xl border border-gray-200 shadow-lg bg-white">
          <table className="min-w-full divide-y divide-gray-200 text-base">
            <thead className="bg-blue-100 sticky top-0 z-10">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience (years)</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Salary</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Increment %</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Increment Amount</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">New Salary</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {eligibleEmployees.map((emp, idx) => (
                <tr key={emp.id} className={idx % 2 === 0 ? 'bg-blue-50 hover:bg-blue-100 transition' : 'hover:bg-blue-50 transition'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{emp.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emp.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emp.empId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emp.experienceYears}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${emp.salary.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emp.incrementPercent}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${emp.incrementAmount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${emp.newSalary.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* HR Policies Table */}
      <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-base">
          <thead className="bg-blue-100 sticky top-0 z-10">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policy Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Eligibility</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Eligibility Days</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {policies.map((policy, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-blue-50 hover:bg-blue-100 transition' : 'hover:bg-blue-50 transition'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{policy.policyName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{policy.eligibility}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{policy.eligibilityDays}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{policy.description}</td>
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

export default HRPolicy;
