import React, { useState, useEffect, useCallback } from 'react';
import { useProductContext } from '../../context/useProductContext';// Utilise le contexte des produits
import ProductList from './ProductList';
import AddProductModal from './AddProductModal';
import { useNavigate } from 'react-router-dom';

const ProductListContainer: React.FC = () => {
    const { products, refreshProducts, addNewProduct, deleteProduct } = useProductContext(); // Récupère les fonctions du contexte
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // Mémorisation de la fonction pour éviter de la recréer à chaque rendu
    const fetchProductsList = useCallback(async () => {
        setLoading(true);
        await refreshProducts(); // Utilise la méthode du contexte pour actualiser les produits
        setLoading(false);
    }, [refreshProducts]);

    useEffect(() => {
        fetchProductsList();
    }, [fetchProductsList]); // Ajout de fetchProductsList comme dépendance

    const handleDeleteProduct = async (productId: string) => {
        await deleteProduct(productId);
        await refreshProducts(); // Rafraîchit les produits via le contexte
    };

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setName('');
        setError(null);
    };

    const handleAddProduct = async () => {
        setError(null);
        if (!name) {
            setError('Product name is required.');
            return;
        }

        await addNewProduct(name); // Utilise la méthode du contexte
        await fetchProductsList(); // Rafraîchit les produits via le contexte
        handleCloseModal();
    };

    const handleNavigateToProduct = (productId: string) => {
        navigate(`/products/${productId}`);
    };

    return (
        <>
            <ProductList
                products={products}
                loading={loading}
                onDeleteProduct={handleDeleteProduct}
                onOpenModal={handleOpenModal}
                onViewDetails={handleNavigateToProduct}
            />
            <AddProductModal
                open={modalOpen}
                onClose={handleCloseModal}
                name={name}
                setName={setName}
                error={error}
                handleAddProduct={handleAddProduct}
            />
        </>
    );
};

export default ProductListContainer;
