import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Card, CardActions, CardContent, CardMedia, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, deleteProduct } from '../../api/productService';
import AddProductModal from './AddProductModal';

interface Product {
    id: string;
    name: string;
    description: string;
}

const ProductListPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProductsList();
    }, []);

    const fetchProductsList = async () => {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data || []);
        setLoading(false);
    };

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleProductAdded = () => {
        fetchProductsList();
    };

    const handleDeleteProduct = async (productId: string) => {
        await deleteProduct(productId);
        fetchProductsList();
    };

    const handleNavigateToProduct = (productId: string) => {
        navigate(`/products/${productId}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" sx={{ marginBottom: 3 }}>Products</Typography>
            <Button
                variant="contained"
                onClick={handleOpenModal}
                sx={{ marginBottom: 3 }}
            >
                Add Product
            </Button>
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4}>
                        <Card sx={{ maxWidth: 345, backgroundColor: '#2a2a2a', color: '#ffffff' }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://via.placeholder.com/345x140" // Placeholder image, replace with real image if available
                                alt={product.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => handleNavigateToProduct(product.id)}>View Details</Button>
                                <IconButton
                                    aria-label="delete"
                                    onClick={() => handleDeleteProduct(product.id)}
                                    sx={{ color: '#d32f2f' }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <AddProductModal
                open={modalOpen}
                onClose={handleCloseModal}
                onProductAdded={handleProductAdded}
            />
        </Box>
    );
};

export default ProductListPage;
