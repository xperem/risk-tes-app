// src/components/DashboardLayout.tsx
import React from 'react';
import { Outlet, Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { Box, CssBaseline, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, AppBar, Button } from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { supabase } from '../supabaseClient';

const drawerWidth = 240;

const DashboardLayout: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    // Définir le titre en fonction de la route
    const getPageTitle = () => {
        switch (location.pathname) {
            case '/dashboard':
                return 'Dashboard';
            case '/risk-matrix':
                return 'Risk Matrix';
            default:
                return 'Dashboard';
        }
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: '#1e1e2d' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: `calc(100% - ${drawerWidth}px)`,
                    ml: `${drawerWidth}px`,
                    bgcolor: '#004d40',
                    boxShadow: 'none',
                }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" noWrap component="div">
                        {getPageTitle()}
                    </Typography>
                    <Button
                        color="inherit"
                        onClick={handleLogout}
                        sx={{
                            bgcolor: '#d32f2f',
                            '&:hover': {
                                bgcolor: '#b71c1c',
                            },
                        }}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
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
                <Outlet />
            </Box>
        </Box>
    );
};

export default DashboardLayout;
