import React from 'react';
import { Button, Box } from '@mui/material';

interface ActionButtonsProps {
    handleAddRow: () => void;
    handleSaveChanges: () => void;
    handleOpenStatisticsModal: () => void;
    targetId: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ handleAddRow, handleSaveChanges, handleOpenStatisticsModal, targetId }) => {
    return (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center', marginTop: 2 }}>
            <Button variant="contained" onClick={handleAddRow} sx={{ backgroundColor: '#1976d2' }}>
                Add Row
            </Button>
            <Button variant="contained" sx={{ backgroundColor: '#1976d2' }}>
                Export as PDF
            </Button>
            <Button variant="contained" onClick={handleSaveChanges} sx={{ backgroundColor: '#1976d2' }}>
                Save Changes
            </Button>
            <Button variant="contained" onClick={handleOpenStatisticsModal} sx={{ backgroundColor: '#1976d2' }}>
                Show Statistics
            </Button>
        </Box>
    );
};

export default ActionButtons;
