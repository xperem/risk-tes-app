import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@mui/material';
import MatrixRow from './MatrixRow';
import { MatrixRow as MatrixRowType } from '../../api/matrixService';

interface MatrixTableProps {
    rows: MatrixRowType[];
    handleUpdateRow: (id: string, field: keyof MatrixRowType, value: MatrixRowType[keyof MatrixRowType]) => void;
    handleDeleteRow: (id: string) => void;
}

const MatrixTable: React.FC<MatrixTableProps> = ({ rows, handleUpdateRow, handleDeleteRow }) => {
    return (
        <TableContainer
            component={Box} // Remplacer Paper par Box
            sx={{
                backgroundColor: 'transparent',
                boxShadow: 'none', // Supprimer l'ombre
                paddingRight: 2,
                border: 'none', // Supprimer toute bordure si présente
            }}
        >
            <Table
                id="matrix-table"
                sx={{
                    minWidth: 650,
                    backgroundColor: '#2e2e38',
                    border: 'none', // Assurez-vous qu'il n'y a pas de bordure autour de la table
                }}
            >
                <TableHead>
                    <TableRow>
                        {/* Les cellules d'en-tête */}
                        <TableCell sx={{ color: '#ffffff' }}>ID</TableCell>
                        <TableCell sx={{ color: '#ffffff' }}>Danger</TableCell>
                        <TableCell sx={{ color: '#ffffff' }}>Event Sequence</TableCell>
                        <TableCell sx={{ color: '#ffffff' }}>Situation</TableCell>
                        <TableCell sx={{ color: '#ffffff' }}>Probability</TableCell>
                        <TableCell sx={{ color: '#ffffff' }}>Severity</TableCell>
                        <TableCell sx={{ color: '#ffffff' }}>Risk</TableCell>
                        <TableCell sx={{ color: '#ffffff' }}>Mitigation</TableCell>
                        <TableCell sx={{ color: '#ffffff' }}>New Risk?</TableCell>
                        <TableCell sx={{ color: '#ffffff' }}>Evidence</TableCell>
                        <TableCell sx={{ color: '#ffffff' }}>Residual Probability</TableCell>
                        <TableCell sx={{ color: '#ffffff' }}>Residual Severity</TableCell>
                        <TableCell sx={{ color: '#ffffff' }}>Residual Risk</TableCell>
                        <TableCell sx={{ color: '#ffffff' }}>Acceptability</TableCell>
                        <TableCell sx={{ color: '#ffffff' }}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <MatrixRow
                            key={row.id}
                            row={row}
                            rowIndex={index}
                            deleteRow={handleDeleteRow}
                            updateRow={(field, value) => handleUpdateRow(row.id, field as keyof MatrixRowType, value)}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MatrixTable;
