// src/api/utils.ts
import { supabase } from './supabaseClient';

// Fonction pour récupérer l'utilisateur courant
export const getCurrentUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
        console.error('Error fetching user:', error);
        return null;
    }
    return data.user;
};
