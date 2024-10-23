import React from 'react';

interface ProbabilityFieldProps {
    value: number;
    setValue: (value: number) => void;
}

const ProbabilityField: React.FC<ProbabilityFieldProps> = ({ value, setValue }) => {
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

export default ProbabilityField;
