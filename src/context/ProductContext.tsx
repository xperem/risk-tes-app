import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchProducts, addProduct } from '../api/productService';
import { Product } from '../api/productService';

interface ProductContextType {
    products: Product[];
    addNewProduct: (name: string, description: string) => Promise<void>;
    refreshProducts: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);

    const loadProducts = useCallback(async () => {
        const fetchedProducts = await fetchProducts();
        if (fetchedProducts) {
            setProducts(fetchedProducts);
        }
    }, []); // Utilisation de useCallback pour mémoïser

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    const addNewProduct = async (name: string, description: string) => {
        const newProduct = await addProduct(name, description);
        if (newProduct) {
            setProducts((prevProducts) => [...prevProducts, newProduct]);
        }
    };

    const refreshProducts = useCallback(() => {
        loadProducts();
    }, [loadProducts]);

    return (
        <ProductContext.Provider value={{ products, addNewProduct, refreshProducts }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProductContext must be used within a ProductProvider');
    }
    return context;
};
