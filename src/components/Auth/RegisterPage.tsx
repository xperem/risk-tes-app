// src/components/RegisterPage.tsx
import React, { useState } from 'react';
import { supabase } from '../../api/supabaseClient';
import { TextField, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import '../../styles/authStyles.css';

const RegisterPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async () => {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
            setError(error.message);
        } else {
            // Rediriger vers la page de connexion après inscription
            window.location.href = '/login';
        }
    };

    return (
        <Container maxWidth="sm" className="auth-container">
            <Typography variant="h4" gutterBottom>Register</Typography>
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
            <Button variant="contained" className="auth-button" onClick={handleRegister}>Register</Button>
            <Typography variant="body2" style={{ marginTop: '20px' }}>
                Already have an account? <Link to="/login" className="auth-link">Login</Link>
            </Typography>
        </Container>
    );
};

export default RegisterPage;
