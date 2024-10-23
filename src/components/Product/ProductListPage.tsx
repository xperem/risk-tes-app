// src/components/Product/ProductListPage.tsx

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, deleteProduct } from '../../api/productService';
import AddProductModal from './AddProductModal';
import ProductUnitView from './ProductUnitView'; // Importer le nouveau composant

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
                        <ProductUnitView
                            id={product.id}
                            name={product.name}
                            description={product.description}
                            onDelete={handleDeleteProduct}
                            onViewDetails={handleNavigateToProduct}
                        />
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
