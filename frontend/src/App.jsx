import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Register from "./Form";
import Login from "./Login";
import Home from './Home';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

function App() {
    return (
        <>
            <ToastContainer
                theme="colored"
                position="top-left"
                autoClose={1000}
            />
            <BrowserRouter>
                <Routes>
                    {/* Public Routes */}
                    <Route
                        path="/"
                        element={
                            <PublicRoute>
                                <Register />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                        }
                    />

                    {/* Protected Route */}
                    <Route
                        path="/home"
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
