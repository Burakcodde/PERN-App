import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const TaskDetailsPage = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/tasks/${id}`
        );
        setTask(response.data);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [id]);

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>Task Details</h2>
      <p>
        <strong>Name:</strong> {task.name}
      </p>
      <p>
        <strong>Completed:</strong> {task.completed ? "Yes" : "No"}
      </p>
      <button onClick={() => navigate(`/edit-task/${task.id}`)}>
        Edit Task
      </button>
      <button onClick={() => navigate("/home")}>Back to Home</button>
    </div>
  );
};

export default TaskDetailsPage;
