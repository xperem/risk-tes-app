import React, { useState, useEffect } from 'react';
import MatrixTable from './MatrixTable';
import ActionButtons from './ActionButtons';
import StatisticsModal from './StatisticsModal';
import { fetchMatrixRows, addMatrixRow, updateMatrixRow, deleteMatrixRow, MatrixRow as MatrixRowType } from '../../api/matrixService';
import { Box, Typography } from '@mui/material';

interface MatrixProps {
    productId: string;
}

const Matrix: React.FC<MatrixProps> = ({ productId }) => {
    const [rows, setRows] = useState<MatrixRowType[]>([]);
    const [loading, setLoading] = useState(true);
    const [isStatisticsModalOpen, setIsStatisticsModalOpen] = useState(false);

    useEffect(() => {
        const getRows = async () => {
            setLoading(true);
            const fetchedRows = await fetchMatrixRows(productId);
            setRows(fetchedRows);
            setLoading(false);
        };
        getRows();
    }, [productId]);

    const handleAddRow = async () => {
        const newRow: Partial<MatrixRowType> = {
            danger: '',
            event: '',
            situation: '',
            probability: 1,
            severity: 1,
            mitigation: '',
            evidence: '',
            residual_probability: 1,
            residual_severity: 1,
            acceptability: 'Yes',
            product_id: productId,
        };

        // Ajouter la ligne à Supabase immédiatement et récupérer la nouvelle ligne ajoutée
        const addedRow = await addMatrixRow(newRow, productId);
        if (addedRow) {
            setRows((prevRows) => [...prevRows, addedRow]);
        }
    };

    const handleUpdateRow = async (id: string, field: keyof MatrixRowType, value: MatrixRowType[keyof MatrixRowType]) => {
        setRows((prevRows) =>
            prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
        );

        // Mettre à jour la base de données immédiatement
        await updateMatrixRow(id, { [field]: value });
    };

    const handleDeleteRow = async (id: string) => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        // Supprimer de la base de données
        await deleteMatrixRow(id);
    };

    const handleOpenStatisticsModal = () => setIsStatisticsModalOpen(true);
    const handleCloseStatisticsModal = () => setIsStatisticsModalOpen(false);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Box sx={{ padding: 2, backgroundColor: '#1e1e2d', borderRadius: 2, minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 4 }}>
            <Typography variant="h4" sx={{ color: '#ffffff' }}>
                Medical Device Risk Matrix
            </Typography>
            <MatrixTable rows={rows} handleUpdateRow={handleUpdateRow} handleDeleteRow={handleDeleteRow} />
            <ActionButtons
                handleAddRow={handleAddRow}
                handleOpenStatisticsModal={handleOpenStatisticsModal}
                targetId="matrix-table"
            />
            <StatisticsModal isOpen={isStatisticsModalOpen} onClose={handleCloseStatisticsModal} rows={rows} />
        </Box>
    );
};

export default Matrix;
