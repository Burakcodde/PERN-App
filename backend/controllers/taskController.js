const Task = require('../models/taskModel');

const createTask = async (req, res, next) => {
  const { name, completed, dueDate } = req.body;
  try {
    const task = await Task.create({
      name,
      completed,
      dueDate,
      user_id: req.user.id,
    });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

const getTasks = async (req, res, next) => {
  const { filter, sort } = req.query;
  try {
    let where = { user_id: req.user.id };
    if (filter === "completed") where.completed = true;
    if (filter === "incomplete") where.completed = false;

    let order = [["dueDate", "DESC"]];
    if (sort === "name") order = [["name", "ASC"]];

    const tasks = await Task.findAll({ where, order });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

const getTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id);
    if (!task || task.user_id !== req.user.id) {
      const error = new Error('Task not found');
      error.status = 404;
      throw error;
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const { name, completed, dueDate } = req.body;
  try {
    const task = await Task.findByPk(id);
    if (task && task.user_id === req.user.id) {
      task.name = name;
      task.completed = completed;
      task.dueDate = dueDate;
      await task.save();
      res.json(task);
    } else {
      const error = new Error('Task not found');
      error.status = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id);
    if (task && task.user_id === req.user.id) {
      await task.destroy();
      res.json({ message: 'Task deleted successfully' });
    } else {
      const error = new Error('Task not found');
      error.status = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { createTask, getTasks, getTask, updateTask, deleteTask };