// src/api/matrixService.ts
import { supabase } from './supabaseClient';

export interface MatrixRow {
    id: string;
    user_id: string;
    product_id: string;
    danger: string;
    event: string;
    situation: string;
    probability: number;
    severity: number;
    mitigation: string;
    evidence: string;
    residual_probability: number; // Correspond à la base de données
    residual_severity: number;    // Correspond à la base de données
    acceptability: string;
    created_at: string;
}

// Fonction pour récupérer l'utilisateur courant
const getCurrentUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
        console.error('Error fetching user:', error);
        return null;
    }
    return data.user;
};

// Récupérer les lignes de la matrice pour l'utilisateur connecté
export const fetchMatrixRows = async (productId: string): Promise<MatrixRow[]> => {
    const user = await getCurrentUser();
    if (!user) return [];

    const { data, error } = await supabase
        .from('risk_matrix')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', productId);

    if (error) {
        console.error('Error fetching matrix rows:', error);
        return [];
    }

    return data || [];
};

// Ajouter une ligne à la matrice
export const addMatrixRow = async (row: Partial<MatrixRow>, productId: string): Promise<void> => {
    const user = await getCurrentUser();
    if (!user) return;

    const { error } = await supabase
        .from('risk_matrix')
        .insert([
            {
                ...row,
                user_id: user.id,
                product_id: productId, // Associer la ligne au produit
            },
        ]);

    if (error) {
        console.error('Error adding matrix row:', error);
    }
};


// Mettre à jour une ligne existante
export const updateMatrixRow = async (id: string, updates: Partial<MatrixRow>): Promise<void> => {
    const { error } = await supabase
        .from('risk_matrix')
        .update(updates)
        .eq('id', id);

    if (error) {
        console.error('Error updating matrix row:', error);
    }
};

// Supprimer une ligne
export const deleteMatrixRow = async (id: string): Promise<void> => {
    const { error } = await supabase
        .from('risk_matrix')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting matrix row:', error);
    }
};
