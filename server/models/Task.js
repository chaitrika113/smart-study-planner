const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    userId: String,
    title: String,
    deadline: Date,
    priority: String,
    completed: Boolean
});

module.exports = mongoose.model("Task", taskSchema);