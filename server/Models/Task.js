const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  taskName: {
    type: "String",
    required: true,
  },
  taskDate: {
    type: "String",
    required: true,
  },
  taskTime: {
    type: "String",
    required: true,
  },
  taskReminder: {
    type: "Boolean",
  },
  taskDone: {
    type: "Boolean",
  },
  user: {
    type: "String",
    required: true,
  },
  alreadyNotified: {
    type: "Boolean",
  },
});

const Task = mongoose.model("tasks", TaskSchema);
module.exports = Task;
