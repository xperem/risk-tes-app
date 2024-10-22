// src/components/Layout/DrawerComponent.tsx
import React from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Box } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';

interface DrawerComponentProps {
    drawerWidth: number;
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({ drawerWidth }) => {
    const location = useLocation();

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: '#333333',
                    color: '#ffffff',
                },
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    <ListItemButton
                        component={RouterLink}
                        to="/dashboard"
                        selected={location.pathname === '/dashboard'}
                        sx={{
                            '&.Mui-selected': {
                                backgroundColor: '#1e1e2d',
                            },
                            '&:hover': {
                                backgroundColor: '#1e1e2d',
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: '#ffffff' }}>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                    <ListItemButton
                        component={RouterLink}
                        to="/risk-matrix"
                        selected={location.pathname === '/risk-matrix'}
                        sx={{
                            '&.Mui-selected': {
                                backgroundColor: '#1e1e2d',
                            },
                            '&:hover': {
                                backgroundColor: '#1e1e2d',
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: '#ffffff' }}>
                            <AssessmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Risk Matrix" />
                    </ListItemButton>
                </List>
            </Box>
        </Drawer>
    );
};

export default DrawerComponent;
