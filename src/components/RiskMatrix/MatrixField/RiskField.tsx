import React from 'react';

interface RiskFieldProps {
    probability: number;
    severity: number;
}

const RiskField: React.FC<RiskFieldProps> = ({ probability, severity }) => {
    const risk = probability * severity;

    // Déterminer la couleur en fonction de la valeur du risque
    const getColor = () => {
        if (risk <= 6) {
            return 'green';
        } else if (risk <= 12) {
            return 'orange';
        } else {
            return 'red';
        }
    };

    return (
        <td style={{ backgroundColor: getColor(), color: 'white', fontWeight: 'bold' }}>
            {risk}
        </td>
    );
};

export default RiskField;
