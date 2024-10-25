import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDescriptionForm from './ProductDescriptionForm';
import useProductDescription from './useProductDescription';
import { ProductDescription } from '../../types/ProductDescription';

const ProductDescriptionContainer: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();

    // Vérifie que productId est défini avant d'utiliser le hook
    const {
        productDescription,
        loading,
        error,
        createProductDescription,
        updateDescription,
    } = useProductDescription(productId || '');

    const handleSubmit = (data: Omit<ProductDescription, 'id' | 'product_id'>) => {
        if (productDescription) {
            updateDescription(data);
        } else {
            createProductDescription(data);
        }
    };

    // Gestion des cas où productId est undefined
    if (!productId) {
        return <div>Error: Product ID is missing.</div>;
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <ProductDescriptionForm
            initialData={productDescription || undefined}
            onSubmit={handleSubmit}
        />
    );
};

export default ProductDescriptionContainer;
