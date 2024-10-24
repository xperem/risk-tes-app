// src/components/Product/AddProductModalContainer.tsx
import React, { useState } from 'react';
import { addProduct, addRiskMatrixForProduct } from '../../api/productService';
import AddProductModal from './AddProductModal';

interface AddProductModalContainerProps {
    open: boolean;
    onClose: () => void;
    onProductAdded: () => void;
}

const AddProductModalContainer: React.FC<AddProductModalContainerProps> = ({ open, onClose, onProductAdded }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleAddProduct = async () => {
        setError(null);
        if (!name) {
            setError('Product name is required.');
            return;
        }

        const product = await addProduct(name, description);
        if (!product) {
            setError('Error adding product.');
            return;
        }

        await addRiskMatrixForProduct(product.id);
        onProductAdded();
        onClose();
    };

    return (
        <AddProductModal
            open={open}
            onClose={onClose}
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            error={error}
            handleAddProduct={handleAddProduct}
        />
    );
};

export default AddProductModalContainer;
