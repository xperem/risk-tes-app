// src/components/RiskMatrix/MatrixTable.tsx
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@mui/material';
import MatrixRow from './MatrixRow';
import { MatrixRow as MatrixRowType } from '../../types/MatrixRow';

interface MatrixTableProps {
    rows: MatrixRowType[];
    handleUpdateRow: (id: string, field: keyof MatrixRowType, value: MatrixRowType[keyof MatrixRowType]) => void;
    handleDeleteRow: (id: string) => void;
}

const MatrixTable: React.FC<MatrixTableProps> = ({ rows, handleUpdateRow, handleDeleteRow }) => {
    return (
        <TableContainer
            component={Box}
            sx={{
                backgroundColor: 'transparent',
                boxShadow: 'none',
                paddingRight: 2,
                border: 'none',
            }}
        >
            <Table
                id="matrix-table"
                sx={{
                    minWidth: 650,
                    backgroundColor: '#2e2e38',
                    border: 'none',
                }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ color: '#ffffff' }}>ID</TableCell>
                        <TableCell sx={{ color: '#ffffff' }}>Danger</TableCell>
                        <TableCell sx={{ color: '#ffffff' }}>Event Sequence</TableCell>
                        <TableCell sx={{ color: '#ffffff' }}>Situation</TableCell>
                        <TableCell sx={{ color: '#ffffff' }}>Probability</TableCell>
                        <TableCell sx={{ color: '#ffffff' }}>Severity</TableCell>
                        <TableCell sx={{ color: '#ffffff' }}>Risk</TableCell>
                        <TableCell sx={{ color: '#ffffff' }}>Mitigation</TableCell>
                        <TableCell sx={{ color: '#ffffff' }}>New risk?</TableCell>
                        <TableCell sx={{ color: '#ffffff' }}>Evidence</TableCell>
                        <TableCell sx={{ color: '#ffffff' }}>Residual Probability</TableCell>
                        <TableCell sx={{ color: '#ffffff' }}>Residual Severity</TableCell>
                        <TableCell sx={{ color: '#ffffff' }}>Residual Risk</TableCell>
                        <TableCell sx={{ color: '#ffffff' }}>Acceptability</TableCell>
                        <TableCell sx={{ color: '#ffffff' }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.length > 0 ? (
                        rows.map((row, index) => (
                            <MatrixRow
                                key={row.id}
                                row={row}
                                rowIndex={index}
                                deleteRow={handleDeleteRow}
                                updateRow={(field, value) => handleUpdateRow(row.id, field, value)}
                            />
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={12} align="center" sx={{ color: '#ffffff' }}>
                                No rows available
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MatrixTable;
