import React, { useState, useEffect } from 'react';
import { Box, TextField, Checkbox, FormControlLabel, Button, Select, MenuItem, FormControl, InputLabel, Grid, Typography, Paper, SelectChangeEvent } from '@mui/material';
import { ProductDescription } from '../../types/ProductDescription';

interface ProductDescriptionFormProps {
    initialData?: Omit<ProductDescription, 'id' | 'product_id'>;
    onSubmit: (description: Omit<ProductDescription, 'id' | 'product_id'>) => void;
}

const ProductDescriptionForm: React.FC<ProductDescriptionFormProps> = ({ initialData, onSubmit }) => {
    const [description, setDescription] = useState<Omit<ProductDescription, 'id' | 'product_id'>>({
        general_description: initialData?.general_description || '',
        dm_or_dmd: initialData?.dm_or_dmd || '',
        dm_class: initialData?.dm_class || '',
        product_reference: initialData?.product_reference || '',
        on_market: initialData?.on_market || false,
        gmn: initialData?.gmn || '',
        gtin: initialData?.gtin || '',
        classification_code: initialData?.classification_code || '',
        intended_use: initialData?.intended_use || '',
        intended_user: initialData?.intended_user || '',
        operating_principle: initialData?.operating_principle || '',
        medical_indication: initialData?.medical_indication || '',
        contraindication: initialData?.contraindication || '',
        performance_claims: initialData?.performance_claims || '',
        expected_benefit: initialData?.expected_benefit || ''
    });

    useEffect(() => {
        if (initialData) {
            setDescription(initialData);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setDescription((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        const { name, value } = e.target;
        setDescription((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setDescription((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(description);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 'calc(100vh - 64px)',
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    maxWidth: 800,
                    width: '100%',
                    backgroundColor: '#2a2a2a',
                    borderRadius: 2,
                }}
            >
                <Typography variant="h5" sx={{ marginBottom: 3, color: '#ffffff', textAlign: 'center' }}>
                    Product Description
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="General Description"
                            name="general_description"
                            value={description.general_description}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={2}
                            sx={{ backgroundColor: '#1e1e2d', borderRadius: 1 }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth sx={{ backgroundColor: '#1e1e2d', borderRadius: 1 }}>
                            <InputLabel>DM or DMDIV</InputLabel>
                            <Select
                                name="dm_or_dmd"
                                value={description.dm_or_dmd}
                                onChange={handleSelectChange}
                            >
                                <MenuItem value="DM">DM</MenuItem>
                                <MenuItem value="DMDIV">DMDIV</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth sx={{ backgroundColor: '#1e1e2d', borderRadius: 1 }}>
                            <InputLabel>DM Class</InputLabel>
                            <Select
                                name="dm_class"
                                value={description.dm_class}
                                onChange={handleSelectChange}
                            >
                                <MenuItem value="I">I</MenuItem>
                                <MenuItem value="IIa">IIa</MenuItem>
                                <MenuItem value="IIb">IIb</MenuItem>
                                <MenuItem value="III">III</MenuItem>
                                <MenuItem value="A">A</MenuItem>
                                <MenuItem value="B">B</MenuItem>
                                <MenuItem value="C">C</MenuItem>
                                <MenuItem value="D">D</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Product Reference"
                            name="product_reference"
                            value={description.product_reference}
                            onChange={handleChange}
                            fullWidth
                            sx={{ backgroundColor: '#1e1e2d', borderRadius: 1 }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="on_market"
                                    checked={description.on_market}
                                    onChange={handleCheckboxChange}
                                    sx={{ color: '#1976d2' }}
                                />
                            }
                            label="On Market"
                            sx={{ color: '#ffffff' }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="GMN"
                            name="gmn"
                            value={description.gmn}
                            onChange={handleChange}
                            fullWidth
                            sx={{ backgroundColor: '#1e1e2d', borderRadius: 1 }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="GTIN"
                            name="gtin"
                            value={description.gtin}
                            onChange={handleChange}
                            fullWidth
                            sx={{ backgroundColor: '#1e1e2d', borderRadius: 1 }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Classification Code"
                            name="classification_code"
                            value={description.classification_code}
                            onChange={handleChange}
                            fullWidth
                            sx={{ backgroundColor: '#1e1e2d', borderRadius: 1 }}
                        />
                    </Grid>
                    {/* Remaining fields */}
                    {['intended_use', 'intended_user', 'operating_principle', 'medical_indication', 'contraindication', 'performance_claims', 'expected_benefit'].map((field) => (
                        <Grid item xs={12} key={field}>
                            <TextField
                                label={field.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                                name={field}
                                value={description[field as keyof Omit<ProductDescription, 'id' | 'product_id'>] || ''}
                                onChange={handleChange}
                                fullWidth
                                multiline
                                rows={2}
                                sx={{ backgroundColor: '#1e1e2d', borderRadius: 1 }}
                            />
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Save Description
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default ProductDescriptionForm;
