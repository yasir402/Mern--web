import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

function Home() {
    const navigate = useNavigate();
    const [username, setUsername] = useState(""); // State to store the username
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token
        toast.success("Logged out successfully!");
        navigate('/login'); // Redirect to the login page
    };

    useEffect(() => {
        if (!token) {
            toast.error("Access denied! Please login.");
            navigate('/login'); // Redirect to login if no token is found
            return;
        }

        // Fetch user data
        fetch('http://localhost:5000/home', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                return response.json();
            })
            .then(data => {
                if (data.sts === 200) {
                    setUsername(data.user.username); // Update the username state
                } else {
                    throw new Error(data.message || "Error fetching user data");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                toast.error("Failed to fetch user data");
                navigate('/login'); // Redirect to login on error
            });
    }, [token, navigate]);

    return (
        <div className="min-h-screen text-white bg-gradient-to-r from-slate-500 to-slate-800">
            {/* Navbar */}
            <nav className="shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <h1 className="text-xl font-bold">My Dashboard</h1>
                        <button
                            onClick={() => handleLogout()}
                            className="bg-slate-400 text-white px-4 py-2 rounded-md hover:bg-zinc-500"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 bg-slate-500 shadow-lg h-screen p-4">
                    <ul className="space-y-4">
                        <li>
                            <a
                                href="#"
                                className="block font-bold text-xl text-white"
                            >
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block font-bold text-xl text-white"
                            >
                                Profile
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block font-bold text-xl text-white"
                            >
                                Settings
                            </a>
                        </li>
                    </ul>
                </aside>

                {/* Main Content Section */}
                <main className="flex-grow p-8 text-white">
                    <h2 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h2>
                    <p className="text-lg">
                        This is where you can view your analytics, manage settings, and
                        more.
                    </p>
                </main>
            </div>

            {/* Footer */}
            <footer className=" py-4 shadow-md">
                <div className="text-center">
                    &copy; 2025 My Dashboard. All rights reserved.
                </div>
            </footer>
        </div>
    );
}

export default Home;
