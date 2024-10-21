// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import DashboardLayout from './components/Dashboard/DashboardLayout';
import Matrix from './components/RiskMatrix/Matrix';
import Dashboard from './components/Dashboard/Dashboard';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route element={<DashboardLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/risk-matrix" element={<Matrix />} />
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
