const express = require("express");
const routes = express.Router();
const {
  createTask,
  getTasks,
  getSingleTask,
  updateTask,
  deleteTask,
} = require("../controllers/controller");
routes.get("/", getTasks);

routes.get("/:id", getSingleTask);

routes.post("/", createTask);

routes.patch("/:id", updateTask);

routes.delete("/:id", deleteTask);
module.exports = routes;
