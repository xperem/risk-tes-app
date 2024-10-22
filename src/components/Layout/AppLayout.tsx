// src/components/DashboardLayout.tsx
import React from 'react';
import { CssBaseline, Box } from '@mui/material';
import AppBarComponent from './AppBarComponent';
import DrawerComponent from './DrawerComponent';
import MainContent from './MainContent';

const drawerWidth = 240;

const AppLayout: React.FC = () => {
    return (
        <Box sx={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: '#1e1e2d' }}>
            <CssBaseline />
            <AppBarComponent drawerWidth={drawerWidth} />
            <DrawerComponent drawerWidth={drawerWidth} />
            <MainContent />
        </Box>
    );
};

export default AppLayout;
