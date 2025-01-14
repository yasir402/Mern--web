import React, {useState } from 'react';
import { Button, TextField, Typography, Container, Grid } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import CryptoJS from 'crypto-js';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const navigate = useNavigate();
    const Isvalid = () => {
        let procced = true;

        if (username == null || username === '') {
            procced = false;
            toast.error('Username is required');
        }
        if (password == null || password === '') {
            procced = false;
            toast.error('Password is required');
        }
        return procced ;
    }
    // const hashedPassword = CryptoJS.SHA256(password).toString();
    let data = {
        username: username,
        password: password
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (Isvalid()) {
            fetch(`http://localhost:5000/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.sts === "success") {
                        localStorage.setItem('token', data.token); // Save the JWT token
                        toast.success("Login Successfully");
                        navigate('/home');
                    } else {
                        toast.error(data.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    };


    return (
        <div className="form-container"
             style={{ display: 'flex',
                 justifyContent: 'center',
                 alignItems: 'center',
                 minHeight: '100vh',
                 background: 'linear-gradient(#e66465, #9198e5)',
                 color: 'antiquewhite'}}>
            <Container component="main" maxWidth="xs">
                <Typography variant="h5" align="center" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}  autoComplete={'off'}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Username"
                                variant="standard"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}

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
                                                {showPassword ? <Visibility /> : < VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                fullWidth
                                label="Password"
                                variant="standard"
                                name="password"
                                color="primary"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <br/>
                    <a href='/'>I don't have an account</a>
                    <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3 }}>
                        Login
                    </Button>
                </form>
            </Container>
        </div>
    );
};

const Login = () => {
    return <LoginForm />;
};

export default Login;
