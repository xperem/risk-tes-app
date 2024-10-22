// src/components/MatrixStatistics.tsx
import React from 'react';
import { MatrixRow as MatrixRowType } from '../../api/matrixService';
import { Box, Typography } from '@mui/material';

interface MatrixStatisticsProps {
    rows: MatrixRowType[];
}

const MatrixStatistics: React.FC<MatrixStatisticsProps> = ({ rows }) => {
    const totalRows = rows.length;

    const calculateResidualRisk = (residual_probability: number, residual_severity: number) => residual_probability * residual_severity;

    const unacceptableRisks = rows.filter(row => row.acceptability.toLowerCase() === 'no').length;
    const greenResidualRisks = rows.filter(row => calculateResidualRisk(row.residual_probability, row.residual_severity) < 6).length;
    const orangeResidualRisks = rows.filter(row => {
        const residualRisk = calculateResidualRisk(row.residual_probability, row.residual_severity);
        return residualRisk >= 6 && residualRisk <= 12;
    }).length;
    const redResidualRisks = rows.filter(row => calculateResidualRisk(row.residual_probability, row.residual_severity) > 12).length;

    return (
        <Box sx={{ padding: 0 }}>
            <Typography>Total Rows: {totalRows}</Typography>
            <Typography>Unacceptable Risks: {unacceptableRisks}</Typography>
            <Typography>Green Residual Risks: {greenResidualRisks}</Typography>
            <Typography>Orange Residual Risks: {orangeResidualRisks}</Typography>
            <Typography>Red Residual Risks: {redResidualRisks}</Typography>
        </Box>
    );
};

export default MatrixStatistics;
