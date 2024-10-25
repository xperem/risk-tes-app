import React from 'react';
import { Checkbox, FormControlLabel, Grid } from '@mui/material';

interface CheckboxFieldProps {
    label: string;
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({ label, name, checked, onChange }) => (
    <Grid item xs={12}>
        <FormControlLabel
            control={<Checkbox name={name} checked={checked} onChange={onChange} sx={{ color: '#1976d2' }} />}
            label={label}
            sx={{ color: '#ffffff' }}
        />
    </Grid>
);

export default CheckboxField;
