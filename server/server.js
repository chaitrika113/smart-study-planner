const jwt = require("jsonwebtoken");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected!"))
    .catch((err) => console.log("Connection failed:", err));

// ✅ Auth middleware added here
const auth = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "No token" });
    try {
        const decoded = jwt.verify(token, "secretkey");
        req.userId = decoded.id;
        next();
    } catch {
        res.status(401).json({ message: "Invalid token" });
    }
};

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.post("/signup", async (req, res) => {
    const User = require("./models/User");
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    await user.save();
    res.json({ message: "User created" });
});

app.post("/login", async (req, res) => {
    const User = require("./models/User");
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Wrong password" });
    }
    const token = jwt.sign(
        { id: user._id },
        "secretkey",
        { expiresIn: "1d" }
    );
    res.json({ token });
});

// ✅ Protected routes with auth middleware
app.post("/add-task", auth, async (req, res) => {
    const Task = require("./models/Task");
    const task = new Task({
        ...req.body,
        userId: req.userId
    });
    await task.save();
    res.json({ message: "Task saved" });
});

app.get("/tasks", auth, async (req, res) => {
    const Task = require("./models/Task");
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
});

app.delete("/delete-task/:id", auth, async (req, res) => {
    const Task = require("./models/Task");
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

app.post("/generate-plan", auth, async (req, res) => {
    try {
        const tasks = req.body.tasks;

        // Mock AI response for demo
        const plan = `
 Smart Study Plan
Generated for ${tasks.length} tasks

Day 1:
${tasks.slice(0, 2).map(t => `• Study: ${t.title} (2 hours)`).join("\n")}

Day 2:
${tasks.slice(2, 4).map(t => `• Study: ${t.title} (2 hours)`).join("\n")}

Day 3:
- Review all topics (1 hour each)
- Practice problems (2 hours)

Tips:
Take 10 min breaks every hour
 Review notes before sleeping
 Stay consistent every day!
        `;

        res.json({ plan });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to generate plan" });
    }
});
app.put("/complete-task/:id", auth, async (req, res) => {
    const Task = require("./models/Task");
    await Task.findByIdAndUpdate(req.params.id, { completed: true });
    res.json({ message: "Task completed" });
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});