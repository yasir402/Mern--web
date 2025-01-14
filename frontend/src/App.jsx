import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Register from "./Form";
import Login from "./Login";
import Home from './Home';
import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute

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
                    <Route path="/" element={<Register />} />
                    <Route path="/login" element={<Login />} />

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
