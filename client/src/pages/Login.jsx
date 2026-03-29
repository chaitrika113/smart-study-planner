import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://13.63.7.0 :5000/login", form);
            localStorage.setItem("token", res.data.token);
            alert("Login successful!");
            navigate("/dashboard");
        } catch (err) {
            alert(err.response?.data?.message || "Login failed!");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-md w-96">
                <h2 className="text-2xl font-bold text-blue-600 mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        className="border border-gray-300 rounded p-2 w-full mb-4"
                        placeholder="Email"
                        onChange={(e)=>setForm({...form, email:e.target.value})}
                    />
                    <input
                        className="border border-gray-300 rounded p-2 w-full mb-4"
                        type="password"
                        placeholder="Password"
                        onChange={(e)=>setForm({...form, password:e.target.value})}
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
                        type="submit">
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-500">
                    Don't have an account?{" "}
                    <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => navigate("/signup")}>
                        Signup
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Login;