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
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">HR Policy</h2>
        <button
          onClick={handleCheckEligibility}
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 shadow hover:shadow-md"
        >
          Check Increment Eligibility
        </button>
      </div>

      {eligibleEmployees.length > 0 && (
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full bg-white border rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Employee ID</th>
                <th className="py-2 px-4 border-b">Experience (years)</th>
                <th className="py-2 px-4 border-b">Current Salary</th>
                <th className="py-2 px-4 border-b">Increment %</th>
                <th className="py-2 px-4 border-b">Increment Amount</th>
                <th className="py-2 px-4 border-b">New Salary</th>
              </tr>
            </thead>
            <tbody>
              {eligibleEmployees.map(emp => (
                <tr key={emp.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{emp.id}</td>
                  <td className="py-2 px-4 border-b">{emp.name}</td>
                  <td className="py-2 px-4 border-b">{emp.empId}</td>
                  <td className="py-2 px-4 border-b">{emp.experienceYears}</td>
                  <td className="py-2 px-4 border-b">${emp.salary.toLocaleString()}</td>
                  <td className="py-2 px-4 border-b">{emp.incrementPercent}%</td>
                  <td className="py-2 px-4 border-b">${emp.incrementAmount.toLocaleString()}</td>
                  <td className="py-2 px-4 border-b">${emp.newSalary.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* You can keep or remove the old policy table below as needed */}
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
            {/* ... existing code ... */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HRPolicy;
