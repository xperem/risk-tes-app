import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductDescription, addProductDescription, updateProductDescription } from '../../api/productDescriptionService';
import ProductDescriptionForm from './ProductDescriptionForm';
import { ProductDescription } from '../../types/ProductDescription';

const ProductDescriptionContainer: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const [description, setDescription] = useState<ProductDescription | null>(null);

    useEffect(() => {
        const getDescription = async () => {
            if (productId) {
                const fetchedDescription = await fetchProductDescription(productId);
                setDescription(fetchedDescription);
            }
        };

        getDescription();
    }, [productId]);

    const handleSave = async (newDescription: Omit<ProductDescription, 'id' | 'product_id'>) => {
        if (productId) {
            if (description) {
                // Mise à jour de la description existante
                await updateProductDescription(productId, newDescription);
            } else {
                // Création d'une nouvelle description
                const createdDescription = await addProductDescription(productId, newDescription);
                setDescription(createdDescription);
            }
        }
    };

    return (
        <div>
            <ProductDescriptionForm
                initialData={description ? { ...description } : undefined}
                onSubmit={handleSave}
            />
        </div>
    );
};

export default ProductDescriptionContainer;
