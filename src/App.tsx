import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from 'react-router-dom';
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import AppLayout from './components/Layout/AppLayout';
import Matrix from './components/RiskMatrix/Matrix';
import Dashboard from './components/Dashboard/Dashboard';
import ProfilePage from './components/Profile/ProfilePage';
import ProductListPage from './components/Product/ProductListPage';
import { ProductProvider } from './context/ProductContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ProductDetailsPage from './components/Product/ProductDetailsPage';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#d32f2f',
        },
        background: {
            default: '#1e1e2d',
            paper: '#2a2a2a',
        },
        text: {
            primary: '#ffffff',
        },
    },
});

const MatrixWrapper: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();

    if (!productId) {
        return <div>Product ID is required</div>;
    }

    return <Matrix productId={productId} />;
};

const App: React.FC = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <ProductProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route element={<AppLayout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/products" element={<ProductListPage />} />
                        <Route path="/products/:productId" element={<ProductDetailsPage />} />
                        {/* Route dynamique pour afficher les matrices de risque associées à un produit */}
                        <Route path="/products/:productId/risk-matrix" element={<MatrixWrapper />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                    </Route>
                </Routes>
            </Router>
            </ProductProvider>
        </ThemeProvider>
    );
};

export default App;
