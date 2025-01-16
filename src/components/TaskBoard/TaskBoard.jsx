import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "../TaskCard/TaskCard";

const TaskBoard = ({ tasks, handleUpdateTask }) => {
  const [taskState, setTaskState] = useState({});

  // Sync taskState with tasks prop
  useEffect(() => {
    setTaskState(tasks);
  }, [tasks]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceCategory = source.droppableId;
    const destCategory = destination.droppableId;

    if (sourceCategory !== destCategory) {
      const sourceTasks = Array.from(taskState[sourceCategory]);
      const destTasks = Array.from(taskState[destCategory]);
      const [removed] = sourceTasks.splice(source.index, 1);

      // Update taskStatus for the moved task
      removed.taskStatus = destCategory;

      destTasks.splice(destination.index, 0, removed);

      setTaskState({
        ...taskState,
        [sourceCategory]: sourceTasks,
        [destCategory]: destTasks,
      });
    } else {
      const taskList = Array.from(taskState[sourceCategory]);
      const [removed] = taskList.splice(source.index, 1);
      taskList.splice(destination.index, 0, removed);

      setTaskState({
        ...taskState,
        [sourceCategory]: taskList,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(taskState).map(([status, tasksList], index) => (
          <Column
            key={index}
            title={status}
            tasks={tasksList}
            handleUpdateTask={handleUpdateTask}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

const Column = ({ title, tasks, handleUpdateTask }) => (
  <Droppable droppableId={title}>
    {(provided) => (
      <div
        className={`bg-purple-100 p-4 rounded-md ${getColumnColor(title)}`}
        {...provided.droppableProps}
        ref={provided.innerRef}
      >
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {tasks?.length === 0
          ? "No tasks yet"
          : tasks.map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
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
      return "bg-red-100";
    case "InProgress":
      return "bg-green-100";
    case "Done":
      return "bg-cyan-100";
    default:
      return "bg-gray-100";
  }
};

export default TaskBoard;
