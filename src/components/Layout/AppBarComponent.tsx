// src/components/Layout/AppBarComponent.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../api/supabaseClient';

interface AppBarComponentProps {
    drawerWidth: number;
}

const AppBarComponent: React.FC<AppBarComponentProps> = ({ drawerWidth }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    const getPageTitle = () => {
        switch (location.pathname) {
            case '/dashboard':
                return 'Dashboard';
            case '/risk-matrix':
                return 'Risk Matrix';
                case '/products':
                    return 'Products';
            case '/profile':
                return 'Profile';
            default:
                return 'Dashboard';
        }
    };

    return (
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
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        color="inherit"
                        component={RouterLink}
                        to="/profile"
                        sx={{
                            bgcolor: '#004d40',
                            '&:hover': {
                                bgcolor: '#00332e',
                            },
                        }}
                    >
                        Profile
                    </Button>
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
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default AppBarComponent;
