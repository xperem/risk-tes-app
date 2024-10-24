// src/components/RiskMatrix/StatisticsModal.tsx
import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from '@mui/material';
import MatrixStatistics from './MatrixStatistics';
import { MatrixRow as MatrixRowType } from '../../types/MatrixRow';

interface StatisticsModalProps {
    isOpen: boolean;
    onClose: () => void;
    rows: MatrixRowType[];
}

const StatisticsModal: React.FC<StatisticsModalProps> = ({ isOpen, onClose, rows }) => {
    return (
        <Dialog
            open={isOpen} // Assurez-vous que la prop est utilisée ici
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    backgroundColor: '#2e2e38',
                    color: '#ffffff',
                    padding: 2,
                    borderRadius: 2,
                },
            }}
        >
            <DialogTitle sx={{ borderBottom: '1px solid #444', marginBottom: 1 }}>
                Matrix Statistics
            </DialogTitle>
            <DialogContent>
                <MatrixStatistics rows={rows} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} sx={{ color: '#1976d2' }}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default StatisticsModal;
