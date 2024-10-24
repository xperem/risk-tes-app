// src/components/Product/ProductDetails.tsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface ProductDetailsProps {
    product: { id: string; name: string; description: string } | null;
    loading: boolean;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, loading }) => {
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found.</div>;
    }

    return (
        <Box sx={{ padding: 2, backgroundColor: '#1e1e2d', borderRadius: 2, minHeight: 'calc(100vh - 64px)' }}>
            <Typography variant="h4" sx={{ color: '#ffffff', marginBottom: 2 }}>
                {product.name}
            </Typography>
            <Typography variant="body1" sx={{ color: '#cccccc', marginBottom: 4 }}>
                {product.description}
            </Typography>
            <Button
                variant="contained"
                component={RouterLink}
                to={`/products/${product.id}/risk-matrix`}
                sx={{ backgroundColor: '#1976d2' }}
            >
                View Risk Matrix
            </Button>
        </Box>
    );
};

export default ProductDetails;
