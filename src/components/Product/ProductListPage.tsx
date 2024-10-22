import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { fetchProducts } from '../../api/productService';
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
        fetchProductsList(); // Rafraîchit la liste des produits
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
            <List>
                {products.map((product) => (
                    <ListItem key={product.id}>
                        <ListItemText
                            primary={product.name}
                            secondary={product.description}
                        />
                    </ListItem>
                ))}
            </List>
            <AddProductModal
                open={modalOpen}
                onClose={handleCloseModal}
                onProductAdded={handleProductAdded}
            />
        </Box>
    );
};

export default ProductListPage;
