import React, { useState, useEffect } from 'react';

const HRPolicy = () => {
  const [policies, setPolicies] = useState([
    {
      id: 1,
      policyName: 'Leave Policy',
      eligibility: 'All Employees',
      eligibilityDays: 30,
      description: 'Employees are eligible for 30 days of leave per year.'
    },
    {
      id: 2,
      policyName: 'Work From Home',
      eligibility: 'Full-time Employees',
      eligibilityDays: 10,
      description: 'Full-time employees can work from home up to 10 days a year.'
    }
  ]);

  const [formData, setFormData] = useState({
    policyName: '',
    eligibility: '',
    eligibilityDays: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPolicies(prev => [
      ...prev,
      {
        id: prev.length + 1,
        ...formData
      }
    ]);
    setFormData({
      policyName: '',
      eligibility: '',
      eligibilityDays: '',
      description: ''
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">HR Policy</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
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
        <button type="submit" className="md:col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Add Policy</button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Policy Name</th>
              <th className="py-2 px-4 border-b">Eligibility</th>
              <th className="py-2 px-4 border-b">Eligibility Days</th>
              <th className="py-2 px-4 border-b">Description</th>
            </tr>
          </thead>
          <tbody>
            {policies.map(policy => (
              <tr key={policy.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{policy.id}</td>
                <td className="py-2 px-4 border-b">{policy.policyName}</td>
                <td className="py-2 px-4 border-b">{policy.eligibility}</td>
                <td className="py-2 px-4 border-b">{policy.eligibilityDays}</td>
                <td className="py-2 px-4 border-b">{policy.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HRPolicy;
