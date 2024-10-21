// src/components/LoginPage.tsx
import React, { useState } from 'react';
import { supabase } from '../../api/supabaseClient';
import { TextField, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import '../../styles/authStyles.css';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            setError(error.message);
        } else {
            // Rediriger vers la page principale après connexion
            window.location.href = '/';
        }
    };

    return (
        <Container maxWidth="sm" className="auth-container">
            <Typography variant="h4" gutterBottom>Login</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <TextField
                fullWidth
                label="Email"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-text-field"
            />
            <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-text-field"
            />
            <Button variant="contained" className="auth-button" onClick={handleLogin}>Login</Button>
            <Typography variant="body2" style={{ marginTop: '20px' }}>
                Don't have an account? <Link to="/register" className="auth-link">Sign up</Link>
            </Typography>
        </Container>
    );
};

export default LoginPage;
