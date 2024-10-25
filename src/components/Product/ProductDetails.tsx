import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface ProductDetailsProps {
    product: { id: string; name: string; } | null;
    loading: boolean;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, loading }) => {
    if (loading) {
        return <Typography variant="h6" sx={{ color: '#ffffff' }}>Loading...</Typography>;
    }

    if (!product) {
        return <Typography variant="h6" sx={{ color: '#ffffff' }}>Product not found.</Typography>;
    }

    return (
        <Box
            sx={{
                padding: 3,
                backgroundColor: '#1e1e2d',
                borderRadius: 2,
                minHeight: 'calc(100vh - 64px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start', // Aligne les éléments à gauche
                gap: 2 // Espacement entre les éléments
            }}
        >
            <Typography variant="h4" sx={{ color: '#ffffff', marginBottom: 2 }}>
                {product.name}
            </Typography>
            <Stack direction="row" spacing={2}>
                <Button
                    variant="contained"
                    component={RouterLink}
                    to={`/products/${product.id}/description`}
                    sx={{ backgroundColor: '#1976d2', textTransform: 'none' }}
                >
                    Product Description
                </Button>
                <Button
                    variant="contained"
                    component={RouterLink}
                    to={`/products/${product.id}/risk-matrix`}
                    sx={{ backgroundColor: '#1976d2', textTransform: 'none' }}
                >
                    View Risk Matrix
                </Button>
            </Stack>
        </Box>
    );
};

export default ProductDetails;
