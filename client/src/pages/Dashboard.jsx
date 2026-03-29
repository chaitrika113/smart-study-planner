import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function Dashboard() {
    const navigate = useNavigate();
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const [plan, setPlan] = useState("");
    const [darkMode, setDarkMode] = useState(false);
    const token = localStorage.getItem("token");

    const fetchTasks = async () => {
        try {
            const res = await axios.get("http://13.63.7.0 :5000/tasks", {
                headers: { authorization: token }
            });
            setTasks(res.data);
        } catch (err) {
            alert("Session expired! Please login again.");
            navigate("/");
        }
    };

    const addTask = async () => {
        try {
            await axios.post("http://13.63.7.0 :5000/add-task", {
                title: task,
                completed: false
            }, {
                headers: { authorization: token }
            });
            fetchTasks();
        } catch (err) {
            alert("Failed to add task!");
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://13.63.7.0 :5000/delete-task/${id}`, {
                headers: { authorization: token }
            });
            fetchTasks();
        } catch (err) {
            alert("Failed to delete task!");
        }
    };

    const completeTask = async (id) => {
        try {
            await axios.put(`http://13.63.7.0 :5000/complete-task/${id}`, {}, {
                headers: { authorization: token }
            });
            fetchTasks();
        } catch (err) {
            alert("Failed to complete task!");
        }
    };

    const generatePlan = async () => {
        try {
            const res = await axios.post(
                "http://13.63.7.0 :5000/generate-plan",
                { tasks },
                { headers: { authorization: token } }
            );
            setPlan(res.data.plan);
        } catch (err) {
            alert("Failed to generate plan!");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    useEffect(() => {
        if (!token) {
            navigate("/");
        } else {
            fetchTasks();
        }
    }, []);

    const data = [
        { name: "Completed", value: tasks.filter(t => t.completed).length },
        { name: "Pending", value: tasks.filter(t => !t.completed).length }
    ];
    const COLORS = ["#22c55e", "#3b82f6"];

    return (
        <div className={darkMode ? "dark" : ""}>
            <div className={`min-h-screen p-8 ${darkMode ? "bg-gray-900" : "bg-gradient-to-br from-blue-50 to-purple-50"}`}>
                <div className="max-w-6xl mx-auto">

                    {/* Header - Full Width */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-6 mb-6 text-white">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-3xl font-bold">📚 Smart Study Planner</h2>
                                <p className="text-blue-100 mt-1">Stay organized, study smarter!</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    className="bg-white text-blue-600 px-3 py-2 rounded-lg font-semibold hover:bg-blue-50"
                                    onClick={() => setDarkMode(!darkMode)}>
                                    {darkMode ? "☀️" : "🌙"}
                                </button>
                                <button
                                    className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50"
                                    onClick={logout}>
                                    Logout
                                </button>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-4 mt-4">
                            <div className="bg-white bg-opacity-20 rounded-lg p-3 flex-1 text-center">
                                <p className="text-2xl font-bold">{tasks.length}</p>
                                <p className="text-blue-100 text-sm">Total Tasks</p>
                            </div>
                            <div className="bg-white bg-opacity-20 rounded-lg p-3 flex-1 text-center">
                                <p className="text-2xl font-bold">{tasks.filter(t => t.completed).length}</p>
                                <p className="text-blue-100 text-sm">Completed</p>
                            </div>
                            <div className="bg-white bg-opacity-20 rounded-lg p-3 flex-1 text-center">
                                <p className="text-2xl font-bold">{tasks.filter(t => !t.completed).length}</p>
                                <p className="text-blue-100 text-sm">Pending</p>
                            </div>
                        </div>
                    </div>

                    {/* 2 Column Layout */}
                    <div className="grid grid-cols-2 gap-6">

                        {/* Left Column */}
                        <div>
                            {/* Add Task */}
                            <div className={`rounded-2xl shadow-md p-6 mb-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>➕ Add New Task</h3>
                                <div className="flex flex-col gap-2">
                                    <input
                                        className={`border rounded-lg p-3 w-full focus:outline-none focus:border-blue-500 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300"}`}
                                        placeholder="Enter task..."
                                        onChange={(e) => setTask(e.target.value)}
                                    />
                                    <button
                                        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 font-semibold w-full"
                                        onClick={addTask}>
                                        Add Task
                                    </button>
                                </div>
                            </div>

                            {/* Task List */}
                            <div className={`rounded-2xl shadow-md p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>📝 Your Tasks</h3>
                                {tasks.length === 0 ? (
                                    <div className="text-center py-8">
                                        <p className="text-4xl mb-2">📭</p>
                                        <p className="text-gray-400">No tasks yet! Add some above.</p>
                                    </div>
                                ) : (
                                    <ul className="space-y-2 max-h-96 overflow-y-auto">
                                        {tasks.map((t, i) => (
                                            <li key={i} className={`flex justify-between items-center p-3 rounded-lg border ${t.completed ? "bg-green-50 border-green-200" : darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}>
                                            <span className={t.completed ? "line-through text-gray-400" : darkMode ? "text-gray-200 font-medium" : "text-gray-700 font-medium"}>
                                                {t.completed ? "✅ " : "⏳ "}{t.title}
                                            </span>
                                                <div className="flex gap-2">
                                                    {!t.completed && (
                                                        <button
                                                            className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 text-sm"
                                                            onClick={() => completeTask(t._id)}>
                                                            Done
                                                        </button>
                                                    )}
                                                    <button
                                                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 text-sm"
                                                        onClick={() => deleteTask(t._id)}>
                                                        Delete
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        {/* Right Column */}
                        <div>
                            {/* Analytics Chart */}
                            <div className={`rounded-2xl shadow-md p-6 mb-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>📊 Task Analytics</h3>
                                <div className="flex justify-center">
                                    <PieChart width={300} height={250}>
                                        <Pie data={data} dataKey="value" outerRadius={100} label>
                                            {data.map((entry, index) => (
                                                <Cell key={index} fill={COLORS[index]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </div>
                            </div>

                            {/* Generate Plan */}
                            <div className={`rounded-2xl shadow-md p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                                <button
                                    className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-3 rounded-lg hover:opacity-90 w-full font-semibold text-lg mb-4"
                                    onClick={generatePlan}>
                                    🤖 Generate AI Study Plan
                                </button>

                                {plan && (
                                    <div className={`border rounded-lg p-4 ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gradient-to-br from-green-50 to-teal-50 border-green-200"}`}>
                                        <h3 className={`font-semibold mb-2 ${darkMode ? "text-green-400" : "text-green-700"}`}>📋 Your Study Plan:</h3>
                                        <pre className={`whitespace-pre-wrap text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{plan}</pre>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
