import { useNavigate } from "react-router-dom";

function Landing() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-500 to-orange-500">
            {/* Navbar */}
            <nav className="flex justify-between items-center p-6">
                <h1 className="text-white text-2xl font-bold drop-shadow-md">📚 Smart Study Planner</h1>
                <div className="flex gap-4">
                    <button
                        className="text-white hover:text-peach-200 font-semibold drop-shadow-md"
                        onClick={() => navigate("/login")}>
                        Login
                    </button>
                    <button
                        className="bg-white text-coral-500 px-4 py-2 rounded-lg font-semibold hover:bg-orange-50 shadow-md"
                        style={{color: '#ff6b6b'}}
                        onClick={() => navigate("/signup")}>
                        Get Started
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="text-center text-white py-20 px-6">
                <h1 className="text-5xl font-bold mb-6 drop-shadow-md">
                    Study Smarter,Not Harder! 🚀
                </h1>
                <p className="text-xl mb-8 max-w-2xl mx-auto" style={{color: '#fff5f0'}}>
                    Smart Study Planner helps you organize your tasks,
                    track your progress and generate AI-powered study plans
                    to ace your exams!
                </p>
                <button
                    className="bg-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 shadow-lg"
                    style={{color: '#ff6b6b'}}
                    onClick={() => navigate("/signup")}>
                    Start For Free 🎉
                </button>
            </div>

            {/* Features Section */}
            <div className="bg-white py-20 px-6">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                    Why Smart Study Planner?
                </h2>
                <div className="grid grid-cols-3 gap-8 max-w-5xl mx-auto">

                    <div className="text-center p-6 rounded-2xl shadow-md" style={{border: '1px solid #ffcba4'}}>
                        <p className="text-5xl mb-4">📝</p>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Task Management</h3>
                        <p className="text-gray-500">Add, complete and delete tasks easily. Stay organized and never miss a deadline!</p>
                    </div>

                    <div className="text-center p-6 rounded-2xl shadow-md" style={{border: '1px solid #ffcba4'}}>
                        <p className="text-5xl mb-4">🤖</p>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">AI Study Plans</h3>
                        <p className="text-gray-500">Generate smart day-wise study plans based on your tasks and priorities!</p>
                    </div>

                    <div className="text-center p-6 rounded-2xl shadow-md" style={{border: '1px solid #ffcba4'}}>
                        <p className="text-5xl mb-4">📊</p>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Progress Analytics</h3>
                        <p className="text-gray-500">Track your progress with beautiful charts. See completed vs pending tasks!</p>
                    </div>

                </div>
            </div>

            {/* How it works */}
            <div className="py-20 px-6" style={{background: '#fff5f0'}}>
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                    How It Works?
                </h2>
                <div className="flex justify-center gap-8 max-w-4xl mx-auto">

                    <div className="text-center">
                        <div className="text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4" style={{background: '#ff6b6b'}}>1</div>
                        <h3 className="font-bold text-gray-800 mb-2">Sign Up</h3>
                        <p className="text-gray-500">Create your free account in seconds!</p>
                    </div>

                    <div className="text-center">
                        <div className="text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4" style={{background: '#ffa07a'}}>2</div>
                        <h3 className="font-bold text-gray-800 mb-2">Add Tasks</h3>
                        <p className="text-gray-500">Add your study tasks and subjects!</p>
                    </div>

                    <div className="text-center">
                        <div className="text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4" style={{background: '#ff8c69'}}>3</div>
                        <h3 className="font-bold text-gray-800 mb-2">Generate Plan</h3>
                        <p className="text-gray-500">Get AI powered study plan instantly!</p>
                    </div>

                    <div className="text-center">
                        <div className="text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4" style={{background: '#ffcba4', color: '#ff6b6b'}}>4</div>
                        <h3 className="font-bold text-gray-800 mb-2">Track Progress</h3>
                        <p className="text-gray-500">Complete tasks and track your progress!</p>
                    </div>

                </div>
            </div>

            {/* CTA Section */}
            <div className="py-20 px-6 text-center text-white" style={{background: 'linear-gradient(135deg, #ff6b6b, #ffa07a, #ffcba4)'}}>
                <h2 className="text-4xl font-bold mb-6 drop-shadow-md">Ready to Study Smarter? 🎓</h2>
                <p className="text-xl mb-8" style={{color: '#fff5f0'}}>Join thousands of students who are already studying smarter!</p>
                <button
                    className="bg-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 shadow-lg"
                    style={{color: '#ff6b6b'}}
                    onClick={() => navigate("/signup")}>
                    Get Started For Free 🚀
                </button>
            </div>

            {/* Footer */}
            <div className="bg-gray-800 text-gray-400 text-center p-6">
                <p>© 2026 Smart Study Planner. Built with ❤️ by Chaitrika</p>
            </div>

        </div>
    );
}

export default Landing;