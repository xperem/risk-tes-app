import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { fetchProducts } from '../../api/productService';

interface ProductDetails {
    id: string;
    name: string;
    description: string;
}

const ProductDetailsPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<ProductDetails | null>(null);

    useEffect(() => {
        const getProduct = async () => {
            const products = await fetchProducts();
            if (products) {
                // Filtrer pour trouver le produit spécifique par ID
                const fetchedProduct = products.find((p) => p.id === productId);
                setProduct(fetchedProduct || null);
            }
        };

        if (productId) {
            getProduct();
        }
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
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

export default ProductDetailsPage;
