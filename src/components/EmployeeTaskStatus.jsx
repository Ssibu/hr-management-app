import React, { useState, useEffect } from 'react';

const EMPLOYEE_API_URL = 'http://localhost:5000/api/employees';
const TASK_API_URL = 'http://localhost:5000/api/employeetasks';

const EmployeeTaskStatus = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setError('');
    try {
      const res = await fetch(EMPLOYEE_API_URL);
      if (!res.ok) throw new Error('Failed to fetch employees');
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchTasks = async (empId) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${TASK_API_URL}/employee/${empId}`);
      if (!res.ok) throw new Error('Failed to fetch tasks');
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const updateTaskStatus = async (taskId, status) => {
    setError('');
    try {
      const res = await fetch(`${TASK_API_URL}/status/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, updatedAt: new Date() })
      });
      if (!res.ok) throw new Error('Failed to update task status');
      fetchTasks(selectedEmployee);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSelectEmployee = (e) => {
    setSelectedEmployee(e.target.value);
    fetchTasks(e.target.value);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-8 transition-all duration-200 hover:shadow-2xl">
      <h2 className="text-3xl font-extrabold text-blue-900 tracking-tight drop-shadow mb-8">My Tasks</h2>
      <div className="mb-8">
        <select
          value={selectedEmployee}
          onChange={handleSelectEmployee}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        >
          <option value="">Select Employee</option>
          {employees.map(emp => (
            <option key={emp._id} value={emp._id}>{emp.name} ({emp.empId})</option>
          ))}
        </select>
      </div>
      {loading && <p className="text-blue-700 font-semibold">Loading tasks...</p>}
      {error && <p className="text-red-600 font-semibold mb-4">{error}</p>}
      <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-base">
          <thead className="bg-blue-100 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned At</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed At</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {tasks.map((t, idx) => (
              <tr key={t._id} className={idx % 2 === 0 ? 'bg-blue-50 hover:bg-blue-100 transition' : 'hover:bg-blue-50 transition'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{t.task}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.assignedAt ? new Date(t.assignedAt).toLocaleString() : ''}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.completedAt ? new Date(t.completedAt).toLocaleString() : '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm flex gap-2">
                  {t.status !== 'completed' && t.status !== 'failed' && (
                    <>
                      <button onClick={() => updateTaskStatus(t._id, 'in progress')} className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded shadow">In Progress</button>
                      <button onClick={() => updateTaskStatus(t._id, 'completed')} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded shadow">Complete</button>
                      <button onClick={() => updateTaskStatus(t._id, 'failed')} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow">Fail</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTaskStatus; 