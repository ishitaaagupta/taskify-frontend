import React, { useState } from 'react';

const TaskForm = ({ onClose, onSave }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ taskName, taskDescription, dueDate, tags, assignedTo });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-20 bg-purple-800 bg-opacity-70 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-semibold text-purple-700 mb-6">Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-sm font-medium text-purple-700">Task Name</label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="mt-2 block w-full border-purple-300 rounded-md shadow-sm p-3 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-medium text-purple-700">Task Description</label>
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="mt-2 block w-full border-purple-300 rounded-md shadow-sm p-3 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-medium text-purple-700">Assigned To</label>
            <input
              type="text"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="mt-2 block w-full border-purple-300 rounded-md shadow-sm p-3 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-medium text-purple-700">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="mt-2 block w-full border-purple-300 rounded-md shadow-sm p-3 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-medium text-purple-700">Tags</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mt-2 block w-full border-purple-300 rounded-md shadow-sm p-3 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-3 px-4 py-2 border border-purple-300 rounded-md shadow-sm text-sm font-medium text-purple-700 bg-white hover:bg-purple-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
