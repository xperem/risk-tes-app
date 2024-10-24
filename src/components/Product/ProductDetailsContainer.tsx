// src/components/Product/ProductDetailsContainer.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '../../api/productService';
import ProductDetails from './ProductDetails';

interface ProductDetails {
    id: string;
    name: string;
    description: string;
}

const ProductDetailsContainer: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<ProductDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            const products = await fetchProducts();
            if (products) {
                // Filtrer pour trouver le produit spécifique par ID
                const fetchedProduct = products.find((p) => p.id === productId);
                setProduct(fetchedProduct || null);
            }
            setLoading(false);
        };

        if (productId) {
            getProduct();
        }
    }, [productId]);

    return (
        <ProductDetails
            product={product}
            loading={loading}
        />
    );
};

export default ProductDetailsContainer;
