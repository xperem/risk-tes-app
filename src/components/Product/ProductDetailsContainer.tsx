import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProductContext } from '../../context/useProductContext';
import ProductDetails from './ProductDetails';

interface ProductDetailsType { // Changement du nom pour éviter le conflit
    id: string;
    name: string;
}

const ProductDetailsContainer: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const { products, refreshProducts } = useProductContext();
    const [product, setProduct] = useState<ProductDetailsType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const findProduct = async () => {
            setLoading(true);

            if (products.length === 0) {
                await refreshProducts();
            }

            const fetchedProduct = products.find((p) => p.id === productId);
            setProduct(fetchedProduct || null);
            setLoading(false);
        };

        if (productId) {
            findProduct();
        }
    }, [productId, products, refreshProducts]);

    return (
        <ProductDetails
            product={product}
            loading={loading}
        />
    );
};

export default ProductDetailsContainer;
