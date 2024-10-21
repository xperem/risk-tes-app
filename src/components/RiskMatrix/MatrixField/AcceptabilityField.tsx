import React from 'react';

interface AcceptabilityFieldProps {
    value: string;
    onChange: (newValue: string) => void;
}

const AcceptabilityField: React.FC<AcceptabilityFieldProps> = ({ value, onChange }) => {
    return (
        <td>
            <select value={value} onChange={(e) => onChange(e.target.value)}>
                <option value="Yes">yes</option>
                <option value="No">no</option>
            </select>
        </td>
    );
};

export default AcceptabilityField;
