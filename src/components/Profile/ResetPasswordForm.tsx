// src/components/Profile/ResetPasswordForm.tsx
import React, { useState } from 'react';
import { supabase } from '../../api/supabaseClient';
import { TextField, Button, Box, Typography } from '@mui/material';

interface ResetPasswordFormProps {
    onClose: () => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onClose }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChangePassword = async () => {
        setError(null);
        setSuccess(null);

        const { data } = await supabase.auth.getUser();
        const userEmail = data.user?.email;

        if (!userEmail) {
            setError('No user email found.');
            return;
        }

        // 1. Re-authentifier l'utilisateur avec l'ancien mot de passe
        const { error: signInError } = await supabase.auth.signInWithPassword({
            email: userEmail,
            password: oldPassword,
        });

        if (signInError) {
            setError('Old password is incorrect.');
            return;
        }

        // 2. Mettre à jour le mot de passe avec le nouveau
        const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });

        if (updateError) {
            setError(updateError.message);
        } else {
            setSuccess('Password updated successfully.');
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: '100%',
                maxWidth: '400px',
                padding: 2,
                backgroundColor: '#2a2a2a',
                borderRadius: 1,
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Typography variant="h6" sx={{ color: '#ffffff' }}>
                Reset Password
            </Typography>
            <TextField
                label="Old Password"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                fullWidth
            />
            <TextField
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                fullWidth
            />
            {error && <Typography color="error">{error}</Typography>}
            {success && <Typography color="primary">{success}</Typography>}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                <Button
                    variant="contained"
                    onClick={handleChangePassword}
                    sx={{ bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' } }}
                >
                    Update Password
                </Button>
                <Button
                    variant="outlined"
                    onClick={onClose}
                    sx={{ borderColor: '#d32f2f', color: '#d32f2f', '&:hover': { borderColor: '#b71c1c', color: '#b71c1c' } }}
                >
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};

export default ResetPasswordForm;
