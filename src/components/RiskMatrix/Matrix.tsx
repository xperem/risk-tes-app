import React, { useState, useEffect } from 'react';
import MatrixTable from './MatrixTable';
import ActionButtons from './ActionButtons';
import StatisticsModal from './StatisticsModal';
import { fetchMatrixRows, addMatrixRow, updateMatrixRow, deleteMatrixRow, MatrixRow as MatrixRowType } from '../../api/matrixService';
import { Box, Typography } from '@mui/material';

const Matrix: React.FC = () => {
    const [rows, setRows] = useState<MatrixRowType[]>([]);
    const [initialRows, setInitialRows] = useState<MatrixRowType[]>([]);
    const [loading, setLoading] = useState(true);
    const [isStatisticsModalOpen, setIsStatisticsModalOpen] = useState(false);

    useEffect(() => {
        const getRows = async () => {
            setLoading(true);
            const fetchedRows = await fetchMatrixRows();
            setRows(fetchedRows);
            setInitialRows(fetchedRows);
            setLoading(false);
        };
        getRows();
    }, []);

    const handleAddRow = () => {
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
        };

        setRows((prevRows) => [
            ...prevRows,
            { ...newRow, id: `temp-${Date.now()}`, user_id: 'temp-user', created_at: new Date().toISOString() } as MatrixRowType,
        ]);
    };

    const handleUpdateRow = (id: string, field: keyof MatrixRowType, value: MatrixRowType[keyof MatrixRowType]) => {
        setRows((prevRows) =>
            prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
        );
    };

    const handleDeleteRow = (id: string) => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    };

    const handleSaveChanges = async () => {
        for (const row of rows) {
            if (row.id.startsWith('temp-')) {
                // If the row is new, add it to Supabase
                const { id, ...newRowData } = row;
                await addMatrixRow(newRowData);
            } else {
                // If the row has been modified, update it
                const initialRow = initialRows.find((r) => r.id === row.id);
                if (JSON.stringify(initialRow) !== JSON.stringify(row)) {
                    const { id, ...updatedRowData } = row;
                    await updateMatrixRow(id, updatedRowData);
                }
            }
        }

        // Delete rows that were removed locally
        for (const initialRow of initialRows) {
            if (!rows.find((row) => row.id === initialRow.id)) {
                await deleteMatrixRow(initialRow.id);
            }
        }

        // Refresh data from Supabase after saving
        const fetchedRows = await fetchMatrixRows();
        setRows(fetchedRows);
        setInitialRows(fetchedRows);
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
                handleSaveChanges={handleSaveChanges}
                handleOpenStatisticsModal={handleOpenStatisticsModal}
                targetId="matrix-table"
            />
            <StatisticsModal isOpen={isStatisticsModalOpen} onClose={handleCloseStatisticsModal} rows={rows} />
        </Box>
    );
};

export default Matrix;
