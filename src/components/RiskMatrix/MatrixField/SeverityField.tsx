import React from 'react';

interface SeverityFieldProps {
    value: number;
    setValue: (value: number) => void;
}

const SeverityField: React.FC<SeverityFieldProps> = ({ value, setValue }) => {
    return (
        <td>
            <input
                type="range"
                min="1"
                max="5"
                value={value ?? ''} 
                onChange={(e) => setValue(Number(e.target.value))}
            />
            <span>{value}</span>
        </td>
    );
};

export default SeverityField;
