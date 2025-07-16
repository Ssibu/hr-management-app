import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api/tasks';

const EmployeeTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalTask, setModalTask] = useState(null);
  const [modalType, setModalType] = useState('');
  const [form, setForm] = useState({ title: '', description: '', estimateTime: '' });
  const [formLoading, setFormLoading] = useState(false);
  const [eligible, setEligible] = useState([]);

  // Fetch all tasks
  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch tasks');
      const data = await res.json();
      setTasks(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  // Fetch open tasks
  const fetchOpenTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/open`);
      if (!res.ok) throw new Error('Failed to fetch open tasks');
      const data = await res.json();
      setTasks(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create task
  const handleCreate = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setError('');
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: form.title, description: form.description })
      });
      if (!res.ok) throw new Error('Failed to create task');
      setShowModal(false);
      setForm({ title: '', description: '', estimateTime: '' });
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
    setFormLoading(false);
  };

  // Claim task
  const handleClaim = async (taskId) => {
    setFormLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/${taskId}/claim`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estimateTime: form.estimateTime })
      });
      if (!res.ok) throw new Error('Failed to claim task');
      setShowModal(false);
      setForm({ title: '', description: '', estimateTime: '' });
      fetchOpenTasks();
    } catch (err) {
      setError(err.message);
    }
    setFormLoading(false);
  };

  // Start, Pause, Complete task
  const handleAction = async (taskId, action) => {
    setFormLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/${taskId}/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to update task');
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
    setFormLoading(false);
  };

  // Show eligible employees
  const handleEligible = async (taskId) => {
    setError('');
    try {
      const res = await fetch(`${API_URL}/eligible/${taskId}`);
      if (!res.ok) throw new Error('Failed to fetch eligible employees');
      const data = await res.json();
      setEligible(Array.isArray(data) ? data : data.data || []);
      setShowModal(true);
      setModalType('eligible');
    } catch (err) {
      setError(err.message);
    }
  };

  // UI rendering
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Employee Task Management</h2>
      <button className="bg-blue-600 text-white px-4 py-2 rounded mb-4" onClick={() => { setShowModal(true); setModalType('create'); }}>Create Task</button>
      <button className="bg-blue-600 text-white px-4 py-2 rounded mb-4 ml-2" onClick={fetchOpenTasks}>View Open Tasks</button>
      {loading && <div>Loading tasks...</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <table className="min-w-full bg-white border rounded shadow">
        <thead>
          <tr className="bg-blue-100">
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Assigned To</th>
            <th className="px-4 py-2">Estimate</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 && !loading && <tr><td colSpan="6" className="text-center py-8 text-gray-500">No tasks found.</td></tr>}
          {tasks.map(task => (
            <tr key={task._id} className="border-t">
              <td className="px-4 py-2">{task.title}</td>
              <td className="px-4 py-2">{task.description}</td>
              <td className="px-4 py-2">{task.status}</td>
              <td className="px-4 py-2">{task.assignedTo ? (task.assignedTo.name || '-') : '-'}</td>
              <td className="px-4 py-2">{task.estimateTime || '-'}</td>
              <td className="px-4 py-2">
                <button className="bg-green-500 text-white px-3 py-1 rounded mr-2" onClick={() => handleEligible(task._id)}>Eligible Employees</button>
                {task.status === 'open' && !task.assignedTo && (
                  <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => { setModalTask(task); setShowModal(true); setModalType('claim'); }}>Claim</button>
                )}
                {task.status === 'claimed' && (
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2" onClick={() => handleAction(task._id, 'start')}>Start</button>
                )}
                {task.status === 'in_progress' && (
                  <button className="bg-gray-500 text-white px-3 py-1 rounded mr-2" onClick={() => handleAction(task._id, 'pause')}>Pause</button>
                )}
                {(task.status === 'in_progress' || task.status === 'paused') && (
                  <button className="bg-green-600 text-white px-3 py-1 rounded" onClick={() => handleAction(task._id, 'complete')}>Complete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal for create/claim/eligible */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg w-full max-w-lg relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl" onClick={() => setShowModal(false)}>&times;</button>
            {modalType === 'create' && (
              <form onSubmit={handleCreate} className="space-y-4">
                <h3 className="text-xl font-bold mb-4">Create Task</h3>
                <div>
                  <label className="block mb-1">Title</label>
                  <input name="title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block mb-1">Description</label>
                  <textarea name="description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full border rounded px-3 py-2" />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={formLoading}>{formLoading ? 'Creating...' : 'Create'}</button>
              </form>
            )}
            {modalType === 'claim' && (
              <form onSubmit={e => { e.preventDefault(); handleClaim(modalTask._id); }} className="space-y-4">
                <h3 className="text-xl font-bold mb-4">Claim Task</h3>
                <div>
                  <label className="block mb-1">Estimate Time (hours)</label>
                  <input name="estimateTime" type="number" min="1" value={form.estimateTime} onChange={e => setForm({ ...form, estimateTime: e.target.value })} required className="w-full border rounded px-3 py-2" />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={formLoading}>{formLoading ? 'Claiming...' : 'Claim'}</button>
              </form>
            )}
            {modalType === 'eligible' && (
              <div>
                <h3 className="text-xl font-bold mb-4">Eligible Employees</h3>
                <ul className="list-disc ml-4">
                  {eligible.map(emp => <li key={emp._id}>{emp.name} ({emp.email})</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTask; 
