import React from 'react';

interface AcceptabilityFieldProps {
    value: string | null;
    onChange: (newValue: string) => void;
}

const AcceptabilityField: React.FC<AcceptabilityFieldProps> = ({ value, onChange }) => {
    return (
        <td>
            <select 
                value={value ?? 'Yes'} // Par défaut à 'Yes' si la valeur est null ou undefined
                onChange={(e) => onChange(e.target.value)}
                style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '4px',
                }}
            >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>
        </td>
    );
};

export default AcceptabilityField;
