import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function PublicRoute({ children }) {
    const token = localStorage.getItem('token'); // Check if the user is authenticated
    const location = useLocation();

    if (token) {
        // Redirect to the last accessed route (or home) if the user is logged in
        const from = location.state?.from?.pathname || '/home';
        return <Navigate to={from} />;
    }

    return children;
}

export default PublicRoute;
