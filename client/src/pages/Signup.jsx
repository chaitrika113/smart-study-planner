import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Signup() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/signup", form);
            alert("Account created successfully!");
            navigate("/");
        } catch (err) {
            alert(err.response?.data?.message || "Signup failed!");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-xl w-96">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">📚 Study Planner</h1>
                    <p className="text-gray-500 mt-2">Create your account</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="text-gray-600 text-sm font-medium">Full Name</label>
                        <input
                            className="border border-gray-300 rounded-lg p-3 w-full mt-1 focus:outline-none focus:border-blue-500"
                            placeholder="Enter your name"
                            onChange={(e)=>setForm({...form, name:e.target.value})}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="text-gray-600 text-sm font-medium">Email</label>
                        <input
                            className="border border-gray-300 rounded-lg p-3 w-full mt-1 focus:outline-none focus:border-blue-500"
                            placeholder="Enter your email"
                            onChange={(e)=>setForm({...form, email:e.target.value})}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="text-gray-600 text-sm font-medium">Password</label>
                        <input
                            className="border border-gray-300 rounded-lg p-3 w-full mt-1 focus:outline-none focus:border-blue-500"
                            type="password"
                            placeholder="Enter your password"
                            onChange={(e)=>setForm({...form, password:e.target.value})}
                        />
                    </div>

                    <button
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg w-full font-semibold hover:opacity-90"
                        type="submit">
                        Create Account
                    </button>
                </form>

                <p className="mt-4 text-center text-gray-500">
                    Already have an account?{" "}
                    <span
                        className="text-blue-500 cursor-pointer font-medium"
                        onClick={() => navigate("/")}>
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Signup;