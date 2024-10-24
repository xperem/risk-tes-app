import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Collapse, Toolbar, AppBar, Typography, Button } from '@mui/material';
import { ExpandLess, ExpandMore, Dashboard, Category, Person } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useProductContext } from '../../context/ProductContext';
import { supabase } from '../../api/supabaseClient';

const AppLayout: React.FC = () => {
    const { products, refreshProducts } = useProductContext();
    const [openProducts, setOpenProducts] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Rafraîchir les produits uniquement au montage du composant
        refreshProducts();
    }, []); // Dépendances vides pour exécuter l'effet une seule fois

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    const toggleProducts = () => {
        setOpenProducts(!openProducts);
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: 1201, bgcolor: '#004d40' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" component="div">App</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button
                            color="inherit"
                            component={RouterLink}
                            to="/profile"
                            startIcon={<Person />}
                            sx={{ bgcolor: '#004d40', '&:hover': { bgcolor: '#00332e' } }}
                        >
                            Profile
                        </Button>
                        <Button
                            color="inherit"
                            onClick={handleLogout}
                            sx={{ bgcolor: '#d32f2f', '&:hover': { bgcolor: '#b71c1c' } }}
                        >
                            Logout
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0, '& .MuiDrawer-paper': { backgroundColor: '#2a2a2a', color: '#ffffff' } }}>
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <ListItemButton component={RouterLink} to="/dashboard">
                            <ListItemIcon sx={{ color: '#ffffff' }}><Dashboard /></ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItemButton>
                        <ListItemButton onClick={toggleProducts}>
                            <ListItemIcon sx={{ color: '#ffffff' }}><Category /></ListItemIcon>
                            <ListItemText primary="Products" />
                            {openProducts ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={openProducts} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton component={RouterLink} to="/products">
                                    <ListItemText inset primary="View All Products" />
                                </ListItemButton>
                                {products.map((product) => (
                                    <ListItemButton key={product.id} component={RouterLink} to={`/products/${product.id}`}>
                                        <ListItemText inset primary={product.name} />
                                    </ListItemButton>
                                ))}
                            </List>
                        </Collapse>
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, padding: 3, bgcolor: '#1e1e2d', color: '#ffffff' }}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
};

export default AppLayout;
