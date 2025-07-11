import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api/employeetasks';

const EmployeeTask = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [assignedAt, setAssignedAt] = useState('');
  const [employees, setEmployees] = useState([]);

  // Assign a new task
  const handleAssign = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const body = { employeeId, task };
      if (assignedAt) body.assignedAt = new Date(assignedAt);
      const res = await fetch(`${API_URL}/assign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error('Failed to assign task');
      setTask('');
      setEmployeeId('');
      setAssignedAt('');
      if (selectedEmployee === employeeId) fetchTasks(employeeId);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch tasks for an employee or all if empId is empty
  const fetchTasks = async (empId) => {
    setLoading(true);
    setError('');
    try {
      let res;
      if (!empId) {
        res = await fetch(`${API_URL}/all`);
      } else {
        res = await fetch(`${API_URL}/employee/${empId}`);
      }
      if (!res.ok) throw new Error('Failed to fetch tasks');
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  // Fetch all tasks on initial load
  useEffect(() => {
    fetchTasks('');
  }, []);

  // Fetch all employees for the select field
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/employees');
        if (!res.ok) throw new Error('Failed to fetch employees');
        const data = await res.json();
        setEmployees(data);
      } catch (err) {
        // Optionally handle error
      }
    };
    fetchEmployees();
  }, []);

  // Mark task as completed
  const completeTask = async (taskId) => {
    setError('');
    try {
      const res = await fetch(`${API_URL}/complete/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completedAt: new Date() })
      });
      if (!res.ok) throw new Error('Failed to complete task');
      fetchTasks(selectedEmployee);
    } catch (err) {
      setError(err.message);
    }
  };

  // Mark task as failed
  const failTask = async (taskId) => {
    setError('');
    try {
      const res = await fetch(`${API_URL}/fail/${taskId}`, {
        method: 'PUT' });
      if (!res.ok) throw new Error('Failed to mark task as failed');
      fetchTasks(selectedEmployee);
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle employee selection
  const handleSelectEmployee = (e) => {
    setSelectedEmployee(e.target.value);
    fetchTasks(e.target.value);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-8 transition-all duration-200 hover:shadow-2xl">
      <h2 className="text-3xl font-extrabold text-blue-900 tracking-tight drop-shadow mb-8">Employee Task Management</h2>
      <form onSubmit={handleAssign} className="flex flex-col md:flex-row gap-4 mb-8 items-end">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Employee ID"
            value={employeeId}
            onChange={e => setEmployeeId(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
        <div className="flex-1">
          <input
            type="text"
            placeholder="Task Description"
            value={task}
            onChange={e => setTask(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
        <div className="flex-1">
          <input
            type="datetime-local"
            placeholder="Assigned At (optional)"
            value={assignedAt}
            onChange={e => setAssignedAt(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-8 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl text-lg">Assign Task</button>
      </form>
      <div className="mb-8">
        <select
          value={selectedEmployee}
          onChange={handleSelectEmployee}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        >
          <option value="">All Employees</option>
          {employees.map(emp => (
            <option key={emp._id} value={emp._id}>{emp.name}</option>
          ))}
        </select>
      </div>
      {selectedEmployee
        ? <p className="mb-2 text-blue-700">Showing tasks for Employee: <b>{selectedEmployee}</b></p>
        : <p className="mb-2 text-blue-700">Showing <b>all tasks</b></p>
      }
      {loading && <p className="text-blue-700 font-semibold">Loading tasks...</p>}
      {error && <p className="text-red-600 font-semibold mb-4">{error}</p>}
      <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-base">
          <thead className="bg-blue-100 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emp ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned At</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed At</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {tasks.map((t, idx) => (
              <tr key={t._id} className={idx % 2 === 0 ? 'bg-blue-50 hover:bg-blue-100 transition' : 'hover:bg-blue-50 transition'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{t.employeeId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{t.task}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.assignedAt ? new Date(t.assignedAt).toLocaleString() : ''}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.completedAt ? new Date(t.completedAt).toLocaleString() : ''}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.rating || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm flex gap-2">
                  {t.status === 'assigned' && (
                    <>
                      <button onClick={() => completeTask(t._id)} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded shadow">Complete</button>
                      <button onClick={() => failTask(t._id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow ml-2">Fail</button>
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

export default EmployeeTask; 