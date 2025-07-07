import React, { useState, useEffect } from 'react';
import './HRPolicy.css';

const HRPolicy = () => {
  const [policies, setPolicies] = useState([]);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalPolicies: 0,
    eligiblePolicies: 0,
    averageIncrement: 0,
    averageEligibilityDays: 0
  });

  const [formData, setFormData] = useState({
    category: '',
    experience: '',
    increment: '',
    eligible: 'Yes',
    eligibilityDays: ''
  });

  // Load dummy data on mount
  useEffect(() => {
    const dummyPolicies = [
      { _id: 'pol001', category: 'Software Developer', experience: '2-5 years', increment: '15%', eligible: 'Yes', eligibilityDays: 180 },
      { _id: 'pol002', category: 'UI/UX Designer', experience: '1-3 years', increment: '10%', eligible: 'Yes', eligibilityDays: 90 },
      { _id: 'pol003', category: 'Backend Developer', experience: '3-6 years', increment: '12%', eligible: 'No', eligibilityDays: 0 },
      { _id: 'pol004', category: 'QA Engineer', experience: '1-2 years', increment: '8%', eligible: 'Yes', eligibilityDays: 60 },
      { _id: 'pol005', category: 'Project Manager', experience: '5-10 years', increment: '20%', eligible: 'Yes', eligibilityDays: 365 },
      { _id: 'pol006', category: 'HR Executive', experience: '2-4 years', increment: '10%', eligible: 'No', eligibilityDays: 0 },
      { _id: 'pol007', category: 'Data Analyst', experience: '2-3 years', increment: '14%', eligible: 'Yes', eligibilityDays: 120 },
      { _id: 'pol008', category: 'DevOps Engineer', experience: '4-6 years', increment: '18%', eligible: 'Yes', eligibilityDays: 150 },
      { _id: 'pol009', category: 'Support Engineer', experience: '1-2 years', increment: '7%', eligible: 'No', eligibilityDays: 0 },
      { _id: 'pol010', category: 'System Admin', experience: '3-5 years', increment: '11%', eligible: 'Yes', eligibilityDays: 200 }
    ];

    setPolicies(dummyPolicies);
    updateStats(dummyPolicies);
  }, []);

  const updateStats = (data) => {
    const total = data.length;
    const eligibleCount = data.filter(p => p.eligible === 'Yes').length;
    const increments = data.map(p => parseFloat(p.increment.replace('%', '')));
    const avgIncrement = increments.reduce((a, b) => a + b, 0) / increments.length;

    const eligibleDays = data
      .filter(p => p.eligible === 'Yes')
      .map(p => p.eligibilityDays);
    const avgDays = eligibleDays.length > 0
      ? eligibleDays.reduce((a, b) => a + b, 0) / eligibleDays.length
      : 0;

    setStats({
      totalPolicies: total,
      eligiblePolicies: eligibleCount,
      averageIncrement: avgIncrement,
      averageEligibilityDays: Math.round(avgDays)
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPolicy = {
      _id: 'pol' + (policies.length + 1).toString().padStart(3, '0'),
      ...formData,
      eligibilityDays: parseInt(formData.eligibilityDays)
    };

    const updated = [...policies, newPolicy];
    setPolicies(updated);
    updateStats(updated);

    setFormData({
      category: '',
      experience: '',
      increment: '',
      eligible: 'Yes',
      eligibilityDays: ''
    });
  };

  const handleDelete = (id) => {
    const updated = policies.filter(policy => policy._id !== id);
    setPolicies(updated);
    updateStats(updated);
  };

  return (
    <div className="hr-policy">
      <h1>HR Policy Management</h1>

      {error && (
        <div className="error-message">{error}</div>
      )}

      {/* HR Policy Form */}
      <div className="form-section">
        <h2>Add New HR Policy</h2>
        <form onSubmit={handleSubmit} className="policy-form">
          <div className="form-group">
            <label>Job Category:</label>
            <input type="text" name="category" value={formData.category} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Experience Range:</label>
            <input type="text" name="experience" value={formData.experience} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Increment Percentage:</label>
            <input type="text" name="increment" value={formData.increment} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Eligible for Promotion:</label>
            <select name="eligible" value={formData.eligible} onChange={handleInputChange} required>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="form-group">
            <label>Eligibility in Days:</label>
            <input type="number" name="eligibilityDays" value={formData.eligibilityDays} onChange={handleInputChange} required min="0" />
          </div>
          <button type="submit" className="submit-btn">Add Policy</button>
        </form>
      </div>

      {/* HR Policy Table */}
      <div className="table-section">
        <h2>HR Policy List</h2>
        <div className="table-container">
          <table className="policy-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Job Category</th>
                <th>Experience</th>
                <th>Increment</th>
                <th>Eligible</th>
                <th>Eligibility Days</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {policies.map(policy => (
                <tr key={policy._id}>
                  <td>{policy._id}</td>
                  <td>{policy.category}</td>
                  <td>{policy.experience}</td>
                  <td>{policy.increment}</td>
                  <td>
                    <span className={`eligible-badge ${policy.eligible === 'Yes' ? 'eligible' : 'not-eligible'}`}>
                      {policy.eligible}
                    </span>
                  </td>
                  <td>{policy.eligibilityDays} days</td>
                  <td>
                    <button onClick={() => handleDelete(policy._id)} className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
              {policies.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center' }}>No policies found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="summary">
          <p>Total Policies: {stats.totalPolicies}</p>
          <p>Eligible Categories: {stats.eligiblePolicies}</p>
          <p>Average Increment: {stats.averageIncrement.toFixed(1)}%</p>
          <p>Avg Eligibility Days: {stats.averageEligibilityDays} days</p>
        </div>
      </div>
    </div>
  );
};

export default HRPolicy;
