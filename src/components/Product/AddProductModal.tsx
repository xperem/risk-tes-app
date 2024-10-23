import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { addProduct, addRiskMatrixForProduct } from '../../api/productService';
import { useNavigate } from 'react-router-dom';

interface AddProductModalProps {
    open: boolean;
    onClose: () => void;
    onProductAdded: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ open, onClose, onProductAdded }) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleAddProduct = async () => {
        setError(null);

        if (!name) {
            setError('Product name is required.');
            return;
        }

        // Ajoute le produit
        const product = await addProduct(name, description);

        if (!product) {
            setError('Error adding product.');
            return;
        }

        // Ajoute une matrice de risque associée au produit
        await addRiskMatrixForProduct(product.id);

        // Notifie le parent qu'un produit a été ajouté
        onProductAdded();

        navigate(`/products/${product.id}`);
        // Ferme le modal
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 1,
                }}
            >
                <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
                    Add New Product
                </Typography>
                {error && (
                    <Typography color="error" sx={{ marginBottom: 2 }}>
                        {error}
                    </Typography>
                )}
                <TextField
                    label="Product Name"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="Description"
                    fullWidth
                    multiline
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleAddProduct}>
                        Add Product
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddProductModal;
