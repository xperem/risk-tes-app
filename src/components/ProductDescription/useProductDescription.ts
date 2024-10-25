import { useState, useEffect, useCallback } from 'react';
import { ProductDescription } from '../../types/ProductDescription';
import {
    fetchProductDescription,
    addProductDescription,
    updateProductDescription,
    deleteProductDescription
} from '../../api/productDescriptionService';

const useProductDescription = (productId: string) => {
    const [productDescription, setProductDescription] = useState<ProductDescription | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadProductDescription = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const description = await fetchProductDescription(productId);
            setProductDescription(description);
        } catch (err) {
            console.error('Error loading product description:', err);
            setError('Error loading product description');
        } finally {
            setLoading(false);
        }
    }, [productId]);

    const createProductDescription = async (data: Omit<ProductDescription, 'id' | 'product_id'>) => {
        setLoading(true);
        setError(null);
        try {
            const newDescription = await addProductDescription(productId, data);
            setProductDescription(newDescription);
        } catch (err) {
            console.error('Error creating product description:', err);
            setError('Error creating product description');
        } finally {
            setLoading(false);
        }
    };

    const updateDescription = async (data: Partial<Omit<ProductDescription, 'id' | 'product_id'>>) => {
        setLoading(true);
        setError(null);
        try {
            const updatedDescription = await updateProductDescription(productId, data);
            setProductDescription(updatedDescription);
        } catch (err) {
            console.error('Error updating product description:', err);
            setError('Error updating product description');
        } finally {
            setLoading(false);
        }
    };

    const deleteDescription = async () => {
        setLoading(true);
        setError(null);
        try {
            await deleteProductDescription(productId);
            setProductDescription(null);
        } catch (err) {
            console.error('Error deleting product description:', err);
            setError('Error deleting product description');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProductDescription();
    }, [loadProductDescription]);

    return {
        productDescription,
        loading,
        error,
        createProductDescription,
        updateDescription,
        deleteDescription,
        loadProductDescription,
    };
};

export default useProductDescription;
