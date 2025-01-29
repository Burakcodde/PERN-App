import React, { useContext } from "react";
import { TaskContext } from "../../context/TaskContext";

const TaskItem = ({ task }) => {
  const { updateTask, deleteTask } = useContext(TaskContext);

  const handleComplete = () => {
    updateTask({ ...task, completed: !task.completed });
  };

  return (
    <li>
      <span
        style={{ textDecoration: task.completed ? "line-through" : "none" }}
      >
        {task.name}
      </span>
      <button onClick={handleComplete}>
        {task.completed ? "Undo" : "Complete"}
      </button>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </li>
  );
};

export default TaskItem;
