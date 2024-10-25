// src/components/Product/ProductListContainer.tsx
import React, { useState, useEffect } from 'react';
import { fetchProducts, deleteProduct, addProduct } from '../../api/productService';
import { Product} from '../../types/Product';
import ProductList from './ProductList';
import AddProductModal from './AddProductModal';
import { useNavigate } from 'react-router-dom';

const ProductListContainer: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProductsList();
    }, []);

    const fetchProductsList = async () => {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data || []);
        setLoading(false);
    };

    const handleDeleteProduct = async (productId: string) => {
        await deleteProduct(productId);
        fetchProductsList();
    };

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setName('');
        setDescription('');
        setError(null);
    };

    const handleProductAdded = async () => {
        await fetchProductsList();
    };

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

        await handleProductAdded();
        handleCloseModal();
    };

    const handleNavigateToProduct = (productId: string) => {
        navigate(`/products/${productId}`); // Utilisation de navigate pour rediriger vers la page de détails
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
                description={description}
                setDescription={setDescription}
                error={error}
                handleAddProduct={handleAddProduct}
            />
        </>
    );
};

export default ProductListContainer;
