const models = require("../models/datamodels");
const mongoose = require("mongoose");
//Get all tasks
const getTasks = async (req, res) => {
  const tasks = await models.find({}).sort({ important: -1, createdAt: -1 });
  res.status(200).json(tasks);
};
//Get single tasks
const getSingleTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout" });
  }
  const singleTask = await models.findById(id);
  if (!singleTask) {
    return res.status(400).json({ error: "no such workout" });
  }
  res.status(200).json(singleTask);
};
//Create a task
const createTask = async (req, res) => {
  const { title, description, completed, important, dueDate } = req.body;
  try {
    const tasks = await models.create({
      title,
      description,
      completed,
      important,
      dueDate,
    });
    res.status(200).json(tasks);
  } catch (err) {
    console.log(err);
    res.status(400).json(error.message);
  }
};
//Update a task
const updateTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout" });
  }

  const task = await models.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!task) {
    return res.status(400).json({ error: "no such workout" });
  }
  res.status(200).json({ task });
};
//Delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout" });
  }

  const taskDelete = await models.findByIdAndDelete(id);
  if (!taskDelete) {
    return res.status(400).json({ error: "no such workout" });
  }
  res.status(200).json({ taskDelete });
};
module.exports = {
  getTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
};
