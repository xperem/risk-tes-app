import React from 'react';
import { TextField, Grid } from '@mui/material';

interface TextFieldGroupProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    multiline?: boolean;
    rows?: number;
}

const TextFieldGroup: React.FC<TextFieldGroupProps> = ({ label, name, value, onChange, multiline = false, rows = 1 }) => (
    <Grid item xs={12}>
        <TextField
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            fullWidth
            multiline={multiline}
            rows={rows}
            sx={{ backgroundColor: '#1e1e2d', borderRadius: 1 }}
        />
    </Grid>
);

export default TextFieldGroup;
