// src/components/MatrixRow.tsx
import React from 'react';
import ProbabilityField from './MatrixField/ProbabilityField';
import SeverityField from './MatrixField/SeverityField';
import RiskField from './MatrixField/RiskField';
import TextField from './MatrixField/TextField';
import NewRiskField from './MatrixField/NewRiskField';
import AcceptabilityField from './MatrixField/AcceptabilityField';
import { MatrixRow as MatrixRowType } from '../../api/matrixService';

interface MatrixRowProps {
    row: MatrixRowType;
    rowIndex: number;
    deleteRow: (id: string) => void;
    updateRow: (field: keyof MatrixRowType, value: MatrixRowType[keyof MatrixRowType]) => void;
}

const MatrixRow: React.FC<MatrixRowProps> = ({ row, rowIndex, deleteRow, updateRow }) => {
    const handleAcceptabilityChange = (newValue: string) => {
        updateRow('acceptability', newValue);
    };

    return (
        <tr>
            <td>{rowIndex + 1}</td>
            <TextField
                placeholder="Enter danger"
                value={row.danger}
                onChange={(value) => updateRow('danger', value)}
            />
            <TextField
                placeholder="Enter event sequence"
                value={row.event}
                onChange={(value) => updateRow('event', value)}
            />
            <TextField
                placeholder="Enter situation"
                value={row.situation}
                onChange={(value) => updateRow('situation', value)}
            />
            <ProbabilityField
                value={row.probability}
                setValue={(value) => updateRow('probability', value)}
            />
            <SeverityField
                value={row.severity}
                setValue={(value) => updateRow('severity', value)}
            />
            <RiskField
                probability={row.probability}
                severity={row.severity}
            />
            <TextField
                placeholder="Enter mitigation"
                value={row.mitigation}
                onChange={(value) => updateRow('mitigation', value)}
            />
            <NewRiskField />
            <TextField
                placeholder="Enter evidence"
                value={row.evidence}
                onChange={(value) => updateRow('evidence', value)}
            />
            <ProbabilityField
                value={row.residual_probability}
                setValue={(value) => updateRow('residual_probability', value)}
            />
            <SeverityField
                value={row.residual_severity}
                setValue={(value) => updateRow('residual_severity', value)}
            />
            <RiskField
                probability={row.residual_probability}
                severity={row.residual_severity}
            />
            <AcceptabilityField value={row.acceptability} onChange={handleAcceptabilityChange} />
            <td>
                <button onClick={() => deleteRow(row.id)}>Delete</button>
            </td>
        </tr>
    );
};

export default MatrixRow;
