import React, { useState } from 'react';

const API_URL = 'http://localhost:5000/api/employeetasks';

const EmployeeTask = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Assign a new task
  const handleAssign = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${API_URL}/assign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeId, task })
      });
      if (!res.ok) throw new Error('Failed to assign task');
      setTask('');
      setEmployeeId('');
      if (selectedEmployee === employeeId) fetchTasks(employeeId);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch tasks for an employee
  const fetchTasks = async (empId) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/employee/${empId}`);
      if (!res.ok) throw new Error('Failed to fetch tasks');
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

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
    <div style={{ padding: 20 }}>
      <h2>Employee Task Management</h2>
      <form onSubmit={handleAssign} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Employee ID"
          value={employeeId}
          onChange={e => setEmployeeId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Task Description"
          value={task}
          onChange={e => setTask(e.target.value)}
          required
        />
        <button type="submit">Assign Task</button>
      </form>
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Enter Employee ID to view tasks"
          value={selectedEmployee}
          onChange={handleSelectEmployee}
        />
      </div>
      {loading && <p>Loading tasks...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table border="1" cellPadding="8" style={{ width: '100%', marginTop: 10 }}>
        <thead>
          <tr>
            <th>Task</th>
            <th>Status</th>
            <th>Assigned At</th>
            <th>Completed At</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(t => (
            <tr key={t._id}>
              <td>{t.task}</td>
              <td>{t.status}</td>
              <td>{t.assignedAt ? new Date(t.assignedAt).toLocaleString() : ''}</td>
              <td>{t.completedAt ? new Date(t.completedAt).toLocaleString() : ''}</td>
              <td>{t.rating || '-'}</td>
              <td>
                {t.status === 'assigned' && (
                  <>
                    <button onClick={() => completeTask(t._id)}>Complete</button>
                    <button onClick={() => failTask(t._id)} style={{ marginLeft: 8 }}>Fail</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTask; 