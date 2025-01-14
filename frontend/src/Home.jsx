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
        <div>
            <h1>Welcome {username} to the Home Page</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Home;
