import React from "react";

const TaskCard = ({
  _id,
  taskName,
  taskDescription,
  dueDate,
  tags,
  taskStatus,
  handleUpdateTask,
  assignedTo,
  project,
}) => {
  console.log(`Task Status: ${taskStatus}`); // Log the taskStatus for debugging

  return (
    <div
      className={`shadow-md rounded-md p-4 mb-4 hover:scale-105 duration-200 hover:cursor-pointer ${getStatusColor(
        taskStatus
      )}`}
    >
      <h3 className="text-lg font-semibold">Task: {taskName}</h3>
      <p className="text-sm text-gray-700">Description: {taskDescription}</p>
      {project?.projectName && (
        <p className="text-sm text-gray-700">Project Name: {project?.projectName}</p>
      )}
      {assignedTo && (
        <p className="text-sm text-gray-700">Assigned To: {assignedTo.toUpperCase()}</p>
      )}
      <p className="text-sm text-gray-700">Due Date: {new Date(dueDate).toLocaleDateString()}</p>

      <span
        className={`inline-block px-2 py-1 text-xs font-semibold ${categoryColor(
          tags[0]
        )}`}
      >
        {tags.length !== 0 ? tags : "task"}
      </span>
      <div className="mt-4">
        <span
          className={`px-2 py-1 text-xs font-bold rounded ${getStatusBadgeColor(
            taskStatus
          )}`}
        >
          {`Status: ${taskStatus}`}
        </span>
      </div>
    </div>
  );
};

const getStatusColor = (status) => {
  console.log(`Checking color for status: "${status}"`); // Debugging
  switch (status.trim()) { // Ensure spaces are trimmed
    case "Backlog":
      return "bg-pink-100";
    case "InProgress":
      return "bg-green-100";
    case "InDiscussion":
      return "bg-blue-100";
    case "Done":
      return "bg-red-100";
    default:
      return "bg-gray-100";
  }
};

const getStatusBadgeColor = (status) => {
  switch (status) {
    case "Backlog":
      return "text-pink-700 bg-pink-200";
    case "InProgress":
      return "text-green-700 bg-green-200";
    case "InDiscussion":
      return "text-blue-700 bg-blue-200";
    case "Done":
      return "text-red-700 bg-red-200";
    default:
      return "text-gray-700 bg-gray-200";
  }
};

const categoryColor = (category) => {
  switch (category) {
    case "Engineering":
      return "text-blue-700 bg-blue-100";
    case "Design":
      return "text-green-700 bg-green-100";
    case "Research":
      return "text-purple-700 bg-purple-100";
    case "Data Science":
      return "text-pink-700 bg-pink-100";
    default:
      return "text-gray-700 bg-gray-100";
  }
};

export default TaskCard;
