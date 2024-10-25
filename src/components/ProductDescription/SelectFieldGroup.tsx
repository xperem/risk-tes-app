import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Grid, SelectChangeEvent } from '@mui/material';

interface SelectFieldGroupProps {
    label: string;
    name: string;
    value: string;
    options: { value: string; label: string }[];
    onChange: (e: SelectChangeEvent) => void;
}

const SelectFieldGroup: React.FC<SelectFieldGroupProps> = ({ label, name, value, options, onChange }) => (
    <Grid item xs={6}>
        <FormControl fullWidth sx={{ backgroundColor: '#1e1e2d', borderRadius: 1 }}>
            <InputLabel>{label}</InputLabel>
            <Select
                name={name}
                value={value}
                onChange={onChange}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    </Grid>
);

export default SelectFieldGroup;
