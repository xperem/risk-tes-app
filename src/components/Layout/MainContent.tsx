// src/components/Layout/MainContent.tsx
import React from 'react';
import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';

const MainContent: React.FC = () => {
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                backgroundColor: '#1e1e2d',
                padding: 0,
                margin: 0,
                minHeight: '100vh',
            }}
        >
            <Toolbar />
            <Outlet /> {/* Assure-toi que l'Outlet est ici */}
        </Box>
    );
};

export default MainContent;
