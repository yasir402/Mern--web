import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './auth';

function ProtectedRoute({ children }) {
    if (!isAuthenticated()) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" replace />;
    }

    // Render the children if authenticated
    return children;
}

export default ProtectedRoute;
