import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchProducts, addProduct } from '../api/productService';
import { Product} from '../types/Product';

interface ProductContextType {
    products: Product[];
    addNewProduct: (name: string, description: string) => Promise<void>;
    refreshProducts: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);

    // Fonction pour charger les produits depuis l'API
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

    // Charger les produits lors du montage du composant
    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    // Ajouter un nouveau produit et mettre à jour l'état local
    const addNewProduct = useCallback(async (name: string, description: string) => {
        try {
            const newProduct = await addProduct(name, description);
            console.log('New product added:', newProduct);
            if (newProduct) {
                setProducts((prevProducts) => [...prevProducts, newProduct]);
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    }, []);

    // Rafraîchir les produits manuellement
    const refreshProducts = useCallback(() => {
        loadProducts();
    }, [loadProducts]);

    return (
        <ProductContext.Provider value={{ products, addNewProduct, refreshProducts }}>
            {children}
        </ProductContext.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte de produits
export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProductContext must be used within a ProductProvider');
    }
    return context;
};
