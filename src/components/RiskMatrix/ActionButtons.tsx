import React from 'react';
import { Button, Box } from '@mui/material';
import exportPdf from './ExportPdfButton';

interface ActionButtonsProps {
    handleAddRow: () => void;
    handleOpenStatisticsModal: () => void;
    targetId: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ handleAddRow, handleOpenStatisticsModal, targetId }) => {
    return (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center', marginTop: 2 }}>
            <Button variant="contained" onClick={handleAddRow} sx={{ backgroundColor: '#1976d2' }}>
                Add Row
            </Button>
            <Button variant="contained" onClick={() => exportPdf(targetId)} sx={{ backgroundColor: '#1976d2' }}>
                Export as PDF
            </Button>
            <Button variant="contained" onClick={handleOpenStatisticsModal} sx={{ backgroundColor: '#1976d2' }}>
                Show Statistics
            </Button>
        </Box>
    );
};

export default ActionButtons;
