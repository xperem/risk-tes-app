// src/components/ProtectedRoute.tsx
import React, { ReactNode, useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkSession = async () => {
            const session = await supabase.auth.getSession();
            setIsAuthenticated(!!session.data.session);
        };

        checkSession();
    }, []);

    if (isAuthenticated === null) {
        // Affiche un indicateur de chargement en attendant la vérification de la session
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
