import React from "react";

const TaskModal = ({ task, onClose }) => {
  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">{task.taskName}</h2>
        <p className="mb-2">
          <strong>Description:</strong> {task.taskDescription}
        </p>
        <p className="mb-2">
          <strong>Assigned To:</strong> {task.assignedTo || "Not assigned"}
        </p>
        <p className="mb-2">
          <strong>Due Date:</strong>{" "}
          {new Date(task.dueDate).toLocaleDateString() || "No due date"}
        </p>
        {task.project?.projectName && (
          <p className="mb-2">
            <strong>Project:</strong> {task.project.projectName}
          </p>
        )}
        <p className="mb-2">
          <strong>Status:</strong> {task.taskStatus}
        </p>
        <p className="mb-4">
          <strong>Tags:</strong> {task.tags.join(", ") || "No tags"}
        </p>
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TaskModal;
