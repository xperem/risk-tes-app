import React, { useRef, useEffect } from 'react';

interface TextFieldProps {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
}

const TextField: React.FC<TextFieldProps> = ({ placeholder, value, onChange }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            // Réinitialise la hauteur pour recalculer après le changement de texte
            textareaRef.current.style.height = 'auto';
            // Ajuste la hauteur en fonction du scrollHeight
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [value]);

    return (
        <td>
            <textarea
                ref={textareaRef}
                value={value ?? ''} // Utilisation d'une chaîne vide si la valeur est null
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                style={{
                    width: '100%',
                    resize: 'none',
                    overflow: 'hidden',
                    minHeight: '40px',
                    padding: '8px',
                    boxSizing: 'border-box',
                    borderRadius: '4px'
                }}
                rows={1} // Hauteur initiale de 1 ligne
            />
        </td>
    );
};

export default TextField;
