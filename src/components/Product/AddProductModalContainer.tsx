import React, { useState } from 'react';
import { useProductContext } from '../../context/useProductContext';
import AddProductModal from './AddProductModal';

interface AddProductModalContainerProps {
    open: boolean;
    onClose: () => void;
}

const AddProductModalContainer: React.FC<AddProductModalContainerProps> = ({ open, onClose }) => {
    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { addNewProduct } = useProductContext(); // Utilisation du contexte

    const handleAddProduct = async () => {
        setError(null);
        if (!name) {
            setError('Product name is required.');
            return;
        }

        try {
            // Ajoute le produit via l'API et mets à jour le contexte
            await addNewProduct(name);

            // Reset les champs après ajout
            setName('');
        

            // Ferme la modal après l'ajout
            onClose();
        } catch (err) {
            if (err instanceof Error) {
                console.error('Error adding product:', err.message);
                setError('Error adding product. Please try again.');
            } else {
                setError('An unexpected error occurred.');
            }
        }
    };

    return (
        <AddProductModal
            open={open}
            onClose={onClose}
            name={name}
            setName={setName}
            error={error}
            handleAddProduct={handleAddProduct}
        />
    );
};

export default AddProductModalContainer;
