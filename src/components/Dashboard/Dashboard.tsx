// src/components/Dashboard.tsx
import React from 'react';
import { Typography, Box } from '@mui/material';

const Dashboard: React.FC = () => {
    return (
        <Box
            sx={{
                padding: 3,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh', // S'assure que l'élément prend toute la hauteur
                backgroundColor: '#1e1e2d',
                boxSizing: 'border-box',
            }}
        >
            <Typography variant="h4" sx={{ color: '#ffffff' }}>
                Welcome in REACT ALM TS
            </Typography>
        </Box>
    );
};

export default Dashboard;
