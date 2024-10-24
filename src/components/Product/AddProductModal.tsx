// src/components/Product/AddProductModal.tsx
import React from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';

interface AddProductModalProps {
    open: boolean;
    onClose: () => void;
    name: string;
    setName: (value: string) => void;
    description: string;
    setDescription: (value: string) => void;
    error: string | null;
    handleAddProduct: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
    open,
    onClose,
    name,
    setName,
    description,
    setDescription,
    error,
    handleAddProduct
}) => (
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

export default AddProductModal;
