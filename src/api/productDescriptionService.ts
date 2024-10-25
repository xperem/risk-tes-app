import { supabase } from './supabaseClient';
import { ProductDescription } from '../types/ProductDescription';

// Fonction pour ajouter une description de produit
export const addProductDescription = async (productId: string, description: Omit<ProductDescription, 'id' | 'product_id' | 'created_at' | 'updated_at'>): Promise<ProductDescription | null> => {
    const { data, error } = await supabase
        .from('description')
        .insert([
            { product_id: productId, ...description }
        ])
        .select()
        .single();

    if (error) {
        console.error('Error adding product description:', error);
        return null;
    }

    return data;
};

// Fonction pour récupérer une description de produit par ID de produit
export const fetchProductDescription = async (productId: string): Promise<ProductDescription | null> => {
    const { data, error } = await supabase
        .from('description')
        .select('*')
        .eq('product_id', productId)
        .maybeSingle();

    if (error) {
        console.error('Error fetching product description:', error);
        return null;
    }

    return data;
};

// Fonction pour mettre à jour une description de produit
export const updateProductDescription = async (productId: string, updates: Partial<ProductDescription>): Promise<ProductDescription | null> => {
    const { data, error } = await supabase
        .from('description')
        .update(updates)
        .eq('product_id', productId)
        .select()
        .single();

    if (error) {
        console.error('Error updating product description:', error);
        return null;
    }

    return data;
};

// Fonction pour supprimer une description de produit par ID de produit
export const deleteProductDescription = async (productId: string): Promise<void> => {
    const { error } = await supabase
        .from('description')
        .delete()
        .eq('product_id', productId);

    if (error) {
        console.error('Error deleting product description:', error);
    }
};
