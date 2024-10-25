// src/components/Product/ProductList.tsx
import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import ProductUnitView from './ProductUnitView';

interface Product {
    id: string;
    name: string;
}

interface ProductListProps {
    products: Product[];
    loading: boolean;
    onDeleteProduct: (id: string) => void;
    onOpenModal: () => void;
    onViewDetails: (id: string) => void; 
}

const ProductList: React.FC<ProductListProps> = ({ products, loading, onDeleteProduct, onOpenModal, onViewDetails }) => { // Ajoute onViewDetails ici
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" sx={{ marginBottom: 3 }}>Products</Typography>
            <Button
                variant="contained"
                onClick={onOpenModal}
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
                            onDelete={onDeleteProduct}
                            onViewDetails={() => onViewDetails(product.id)} // Utilisation correcte de la fonction
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ProductList;
