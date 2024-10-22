// src/components/Profile/ProfilePage.tsx
import React, { useState } from 'react';
import ResetPasswordForm from './ResetPasswordForm';
import { Box, Typography, Button } from '@mui/material';

const ProfilePage: React.FC = () => {
    const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);

    const handleShowResetPasswordForm = () => {
        setShowResetPasswordForm(true);
    };

    const handleCloseResetPasswordForm = () => {
        setShowResetPasswordForm(false);
    };

    return (
        <Box
            sx={{
                padding: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                maxWidth: '600px',
                margin: '0 auto',
            }}
        >
            <Typography variant="h4" sx={{ color: '#ffffff', marginBottom: 2 }}>
                User Profile
            </Typography>
            {!showResetPasswordForm ? (
                <Button
                    variant="contained"
                    onClick={handleShowResetPasswordForm}
                    sx={{ bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' } }}
                >
                    Reset Password
                </Button>
            ) : (
                <ResetPasswordForm onClose={handleCloseResetPasswordForm} />
            )}
        </Box>
    );
};

export default ProfilePage;
