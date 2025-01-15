import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token'); // Check if the user is authenticated
    const location = useLocation();

    if (!token) {
        // Redirect to login if the user is not authenticated
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
}

export default ProtectedRoute;
