import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import CryptoJS from 'crypto-js';

const Register = () => {
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const isValid = () => {
        let proceed = true;

        if (!name) {
            proceed = false;
            toast.error('Username is required');
        }
        if (!fullname) {
            proceed = false;
            toast.error('Full name is required');
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            proceed = false;
            toast.error('Email is required');
        } else if (!emailRegex.test(email)) {
            proceed = false;
            toast.error('Invalid Email format');
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!pass) {
            proceed = false;
            toast.error('Password is required');
        } else if (!passwordRegex.test(pass)) {
            proceed = false;
            toast.error('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit');
        }
        return proceed;
    }

    const handleForm = (e) => {
        e.preventDefault();
        if (isValid()) {
            try {
                // Hash the password using SHA-256
                // const hashedPassword = CryptoJS.SHA256(pass).toString();
                const data = {
                    username: name,
                    fullname: fullname,
                    email: email,
                    password: pass // Update the password in the data object with the hashed value
                };

                fetch(`http://localhost:5000/register`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data),
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Failed to register');
                    }
                })
                .then(responseData => {
                    if (responseData.sts === "success") {
                        toast.success("Registered Successfully");
                        navigate('/login');
                    } else {
                        toast.error(responseData.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    toast.error('An error occurred. Please try again later.');
                });
            } catch (error) {
                console.error('Error:', error);
                toast.error('An error occurred. Please try again later.');
            }
        }
    }

    return (
        <div className="form-container"
             style={{
                 display: 'flex',
                 justifyContent: 'center',
                 alignItems: 'center',
                 minHeight: '100vh',
                 background: 'linear-gradient(#e66465, #9198e5)',
                 color: 'antiquewhite'
             }}>
            <Container component="main" maxWidth="xs">
                <Typography variant="h5" align="center" gutterBottom>
                    Register
                </Typography>
                <form onSubmit={handleForm}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Username"
                                variant="standard"
                                name="username"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Full Name"
                                name="fullName"
                                variant="standard"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                variant="standard"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="standard-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <Visibility/> : < VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                fullWidth
                                label="Password"
                                variant="standard"
                                name="password"
                                color="primary"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                            />

                        </Grid>
                    </Grid>
                    <a href={"/login"}>Already registered?</a>
                    <br/>
                    <Button type="submit" fullWidth variant="contained" color="primary" sx={{mt: 3}}>
                        Register
                    </Button>
                </form>
            </Container>
        </div>
    );
};

export default Register;
