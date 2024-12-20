// src/api/productService.ts
import { supabase } from './supabaseClient';
import { Product} from '../types/Product';
import { getCurrentUser } from './utils'; 
import { deleteProductDescription } from './productDescriptionService';


// Fonction pour récupérer tous les produits pour l'utilisateur connecté
export const fetchProducts = async (): Promise<Product[] | null> => {
    const user = await getCurrentUser();
    if (!user) return null;

    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('user_id', user.id);

    if (error) {
        console.error('Error fetching products:', error);
        return null;
    }

    return data;
};

// Fonction pour ajouter un nouveau produit
export const addProduct = async (name: string): Promise<Product | null> => {
    const user = await getCurrentUser();
    if (!user) return null;

    const { data, error } = await supabase
        .from('products')
        .insert([
            {
                name,
                user_id: user.id,
            },
        ])
        .select()
        .single();

    if (error) {
        console.error('Error adding product:', error);
        return null;
    }

   

    return data;
};


// Fonction pour créer une matrice de risque associée à un produit
export const addRiskMatrixForProduct = async (productId: string): Promise<void> => {
    const user = await getCurrentUser();
    if (!user) return;

    const { error } = await supabase
        .from('risk_matrix')
        .insert([
            {
                product_id: productId,
                user_id: user.id,
                // Autres champs par défaut à initialiser
            },
        ]);

    if (error) {
        console.error('Error creating associated risk matrix:', error);
    }
};

// Fonction pour supprimer un produit
// Fonction pour supprimer toutes les matrices de risques associées à un produit
const deleteRiskMatricesForProduct = async (productId: string): Promise<void> => {
    const { error } = await supabase
        .from('risk_matrix')
        .delete()
        .eq('product_id', productId);

    if (error) {
        console.error('Error deleting risk matrices for product:', error);
    }
};

// Fonction pour supprimer un produit et ses matrices associées
export const deleteProduct = async (productId: string): Promise<void> => {
    // Supprimer toutes les matrices de risques associées
    await deleteRiskMatricesForProduct(productId);
    await deleteProductDescription(productId);

    // Ensuite, supprimer le produit
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

    if (error) {
        console.error('Error deleting product:', error);
    }
};
