import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const { user, logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("date");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sort === "date") return new Date(b.dueDate) - new Date(a.dueDate);
    if (sort === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Welcome, {user.username}</h2>
      <button className="btn btn-secondary mb-3" onClick={handleLogout}>Logout</button>
      <button className="btn btn-secondary mb-3 ml-2" onClick={() => navigate("/profile")}>Profile</button>
      <h3>Your Tasks</h3>
      <button className="btn btn-primary mb-3" onClick={() => navigate("/add-task")}>Add Task</button>
      <div className="mb-3">
        <br></br>
        <label className="mr-2">Filter: </label>
        <select className="form-control d-inline-block w-auto" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
        <br></br>
        <br></br>
        <label className="ml-3 mr-2">Sort: </label>
        <select className="form-control d-inline-block w-auto" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="date">Date</option>
          <option value="name">Name</option>
        </select>
      </div>
      <ul className="list-group">
        {sortedTasks.map((task) => (
          <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5>{task.name}</h5>
              <p>Due: {task.dueDate}</p>
              <p>Status: {task.completed ? "Completed" : "Incomplete"}</p>
            </div>
            <div>
              <button className="btn btn-info mr-2" onClick={() => navigate(`/task/${task.id}`)}>View Details</button>
              <button className="btn btn-warning mr-2" onClick={() => navigate(`/edit-task/${task.id}`)}>Edit</button>
              <button className="btn btn-danger" onClick={() => handleDelete(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;