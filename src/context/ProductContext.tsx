import React, { createContext, useState, useEffect, useCallback } from 'react';
import { fetchProducts, addProduct, deleteProduct as deleteProductAPI } from '../api/productService';
import { Product } from '../types/Product';

interface ProductContextType {
    products: Product[];
    addNewProduct: (name: string, description: string) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    refreshProducts: () => void;
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);

    const loadProducts = useCallback(async () => {
        try {
            const fetchedProducts = await fetchProducts();
            if (fetchedProducts) {
                setProducts(fetchedProducts);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }, []);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    const addNewProduct = useCallback(async (name: string, description: string) => {
        try {
            const newProduct = await addProduct(name, description);
            if (newProduct) {
                setProducts((prevProducts) => [...prevProducts, newProduct]);
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    }, []);

    const deleteProduct = useCallback(async (id: string) => {
        try {
            await deleteProductAPI(id);
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }, []);

    const refreshProducts = useCallback(() => {
        loadProducts();
    }, [loadProducts]);

    return (
        <ProductContext.Provider value={{ products, addNewProduct, deleteProduct, refreshProducts }}>
            {children}
        </ProductContext.Provider>
    );
};
