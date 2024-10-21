import React, { useState } from 'react';

const NewRiskField: React.FC = () => {
    const [value, setValue] = useState<string>('NA');
    const [isCustom, setIsCustom] = useState<boolean>(false);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        if (selectedValue === 'NA') {
            setIsCustom(false);
            setValue('NA');
        } else {
            setIsCustom(true);
            setValue(''); // Réinitialise la valeur pour le champ texte
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <td>
            {!isCustom ? (
                <select value={value} onChange={handleSelectChange}>
                    <option value="NA">NA</option>
                    <option value="custom">Custom</option>
                </select>
            ) : (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                        type="text"
                        value={value}
                        onChange={handleInputChange}
                        placeholder="Enter risk"
                        style={{ flex: 1 }}
                    />
                    <button
                        onClick={() => {
                            setIsCustom(false);
                            setValue('NA');
                        }}
                        style={{
                            marginLeft: '5px',
                            padding: '2px 6px',
                            cursor: 'pointer'
                        }}
                    >
                        X
                    </button>
                </div>
            )}
        </td>
    );
};

export default NewRiskField;
