// src/components/Product/AddProductModalContainer.tsx
import React, { useState } from 'react';
import { addProduct, addRiskMatrixForProduct } from '../../api/productService';
import AddProductModal from './AddProductModal';


interface AddProductModalContainerProps {
    open: boolean;
    onClose: () => void;
}

const AddProductModalContainer: React.FC<AddProductModalContainerProps> = ({ open, onClose }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState<string | null>(null);
  

    const handleAddProduct = async () => {
        setError(null);
        if (!name) {
            setError('Product name is required.');
            return;
        }

        try {
            // Ajoute le produit via l'API
            const product = await addProduct(name, description);
            if (!product) {
                setError('Error adding product.');
                return;
            }

            // Ajoute une matrice de risque associée au produit
            await addRiskMatrixForProduct(product.id);

            // Ajoute le produit au contexte sans faire un nouvel appel API
            

            // Appelle la fonction de fermeture de la modal
            onClose();
        } catch (error) {
            setError('Error adding product.');
        }
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
