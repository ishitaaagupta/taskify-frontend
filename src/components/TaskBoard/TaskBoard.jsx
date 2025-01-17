import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "../TaskCard/TaskCard";
import TaskModal from "../TaskCard/TaskModal";

const TaskBoard = ({ tasks = [], handleUpdateTask }) => {
  const [taskState, setTaskState] = useState({
    Backlog: [],
    InDiscussion: [],
    InProgress: [],
    Done: [],
  });
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Group tasks by status whenever the tasks prop changes
  useEffect(() => {

    if(Array.isArray(tasks)){
    const groupedTasks = tasks?.reduce(
      (acc, task) => {
        acc[task.taskStatus] = acc[task.taskStatus] || [];
        acc[task.taskStatus].push(task);
        return acc;
      },
      { Backlog: [], InDiscussion: [], InProgress: [], Done: [] }
    );
    setTaskState(groupedTasks);
  }
  else{
    setTaskState(tasks);
  }

  }, [tasks]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceCategory = source.droppableId;
    const destCategory = destination.droppableId;

    if (sourceCategory !== destCategory) {
      const sourceTasks = Array.from(taskState[sourceCategory]);
      const destTasks = Array.from(taskState[destCategory]);
      const [movedTask] = sourceTasks.splice(source.index, 1);

      movedTask.taskStatus = destCategory;
      destTasks.splice(destination.index, 0, movedTask);

      setTaskState({
        ...taskState,
        [sourceCategory]: sourceTasks,
        [destCategory]: destTasks,
      });

      // Call external update handler if provided
      if (handleUpdateTask) handleUpdateTask(movedTask);
    } else {
      const taskList = Array.from(taskState[sourceCategory]);
      const [movedTask] = taskList.splice(source.index, 1);
      taskList.splice(destination.index, 0, movedTask);

      setTaskState({
        ...taskState,
        [sourceCategory]: taskList,
      });
    }
  };

  const openModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(taskState).map(([status, tasksList]) => (
            <Column
              key={status}
              title={status}
              tasks={tasksList}
              handleUpdateTask={handleUpdateTask}
              openModal={openModal}
            />
          ))}
        </div>
      </DragDropContext>
      {isModalOpen && selectedTask && (
        <TaskModal task={selectedTask} onClose={closeModal} />
      )}
    </>
  );
};

const Column = ({ title, tasks, handleUpdateTask, openModal }) => (
  <Droppable droppableId={title}>
    {(provided) => (
      <div
        className={`bg-purple-100 p-4 rounded-md ${getColumnColor(title)}`}
        {...provided.droppableProps}
        ref={provided.innerRef}
      >
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {tasks.length === 0
          ? "No tasks yet"
          : tasks.map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => openModal(task)}
                  >
                    <TaskCard handleUpdateTask={handleUpdateTask} {...task} />
                  </div>
                )}
              </Draggable>
            ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

const getColumnColor = (title) => {
  switch (title) {
    case "Backlog":
      return "bg-orange-100";
    case "InDiscussion":
      return "bg-yellow-100";
    case "InProgress":
      return "bg-blue-100";
    case "Done":
      return "bg-green-100";
    default:
      return "bg-gray-100";
  }
};

export default TaskBoard;
