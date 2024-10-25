import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from 'react-router-dom';
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import AppLayout from './components/Layout/AppLayout';
import Dashboard from './components/Dashboard/Dashboard';
import ProfilePage from './components/Profile/ProfilePage';
import ProductListContainer from './components/Product/ProductListContainer';
import { ProductProvider } from './context/ProductContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ProductDetailsContainer from './components/Product/ProductDetailsContainer';
import RiskMatrixContainer from './components/RiskMatrix/RiskMatrixContainer';
import ProductDescriptionContainer from './components/ProductDescription/ProductDescriptionContainer'; 

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

// Wrapper for dynamic rendering of RiskMatrixContainer based on productId
const MatrixWrapper: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();

    if (!productId) {
        return <div>Product ID is required</div>;
    }

    return <RiskMatrixContainer productId={productId} />;
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
                            <Route path="/products" element={<ProductListContainer />} />
                            <Route path="/products/:productId" element={<ProductDetailsContainer />} />
                            {/* Dynamic route for displaying risk matrix associated with a product */}
                            <Route path="/products/:productId/description" element={<ProductDescriptionContainer />} />
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
