import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from '@mui/material';
import MatrixStatistics from './MatrixStatistics';
import { MatrixRow as MatrixRowType } from '../../api/matrixService';

interface StatisticsModalProps {
    isOpen: boolean;
    onClose: () => void;
    rows: MatrixRowType[];
}

const StatisticsModal: React.FC<StatisticsModalProps> = ({ isOpen, onClose, rows }) => {
    return (
        <Dialog
            open={isOpen}
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
                <Button onClick={onClose} sx={{ color: '#4caf50' }}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default StatisticsModal;
