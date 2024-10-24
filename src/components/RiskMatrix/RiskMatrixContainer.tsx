// src/components/RiskMatrix/RiskMatrixContainer.tsx
import React, { useState } from 'react';
import MatrixTable from './MatrixTable';
import ActionButtons from './ActionButtons';
import StatisticsModal from './StatisticsModal';
import useRiskMatrix from './hooks/useRiskMatrix';
import { Box, Typography } from '@mui/material';
import { MatrixRow as MatrixRowType } from '../../types/MatrixRow';

interface RiskMatrixContainerProps {
    productId: string;
}

const RiskMatrixContainer: React.FC<RiskMatrixContainerProps> = ({ productId }) => {
    const { rows, loading, addRow, updateRow, deleteRow } = useRiskMatrix(productId);
    const [isStatisticsModalOpen, setIsStatisticsModalOpen] = useState(false);

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

        await addRow(newRow);
    };

    const handleUpdateRow = async (id: string, field: keyof MatrixRowType, value: MatrixRowType[keyof MatrixRowType]) => {
        await updateRow(id, { [field]: value });
    };

    const handleDeleteRow = async (id: string) => {
        await deleteRow(id);
    };

    const handleOpenStatisticsModal = () => setIsStatisticsModalOpen(true);
    const handleCloseStatisticsModal = () => setIsStatisticsModalOpen(false);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Box
            sx={{
                padding: 2,
                backgroundColor: '#1e1e2d',
                borderRadius: 2,
                minHeight: 'calc(100vh - 64px)',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                marginBottom: 4,
            }}
        >
            <Typography variant="h4" sx={{ color: '#ffffff' }}>
                Medical Device Risk Matrix
            </Typography>
            <MatrixTable rows={rows} handleUpdateRow={handleUpdateRow} handleDeleteRow={handleDeleteRow} />
            <ActionButtons
                handleAddRow={handleAddRow}
                handleOpenStatisticsModal={handleOpenStatisticsModal}
                targetId="matrix-table"
            />
            <StatisticsModal
                isOpen={isStatisticsModalOpen}
                onClose={handleCloseStatisticsModal}
                rows={rows}
            />
        </Box>
    );
};

export default RiskMatrixContainer;
