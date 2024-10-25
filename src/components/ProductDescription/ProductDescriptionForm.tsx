import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Typography, Paper } from '@mui/material';
import { ProductDescription } from '../../types/ProductDescription';
import TextFieldGroup from './TextFieldGroup';
import SelectFieldGroup from './SelectFieldGroup';
import CheckboxField from './CheckboxField';
import { SelectChangeEvent } from '@mui/material';

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
            [name as keyof Omit<ProductDescription, 'id' | 'product_id'>]: value,
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
                    <TextFieldGroup
                        label="General Description"
                        name="general_description"
                        value={description.general_description}
                        onChange={handleChange}
                        multiline
                        rows={2}
                    />
                    <SelectFieldGroup
                        label="DM or DMDIV"
                        name="dm_or_dmd"
                        value={description.dm_or_dmd}
                        options={[{ value: 'DM', label: 'DM' }, { value: 'DMDIV', label: 'DMDIV' }]}
                        onChange={handleSelectChange}
                    />
                    <SelectFieldGroup
                        label="DM Class"
                        name="dm_class"
                        value={description.dm_class}
                        options={[
                            { value: 'I', label: 'I' },
                            { value: 'IIa', label: 'IIa' },
                            { value: 'IIb', label: 'IIb' },
                            { value: 'III', label: 'III' },
                            { value: 'A', label: 'A' },
                            { value: 'B', label: 'B' },
                            { value: 'C', label: 'C' },
                            { value: 'D', label: 'D' }
                        ]}
                        onChange={handleSelectChange}
                    />
                    <TextFieldGroup
                        label="Product Reference"
                        name="product_reference"
                        value={description.product_reference}
                        onChange={handleChange}
                    />
                    <CheckboxField
                        label="On Market"
                        name="on_market"
                        checked={description.on_market}
                        onChange={handleCheckboxChange}
                    />
                    <TextFieldGroup
                        label="GMN"
                        name="gmn"
                        value={description.gmn}
                        onChange={handleChange}
                    />
                    <TextFieldGroup
                        label="GTIN"
                        name="gtin"
                        value={description.gtin}
                        onChange={handleChange}
                    />
                    <TextFieldGroup
                        label="Classification Code"
                        name="classification_code"
                        value={description.classification_code}
                        onChange={handleChange}
                    />
                    <TextFieldGroup
                        label="Intended Use"
                        name="intended_use"
                        value={description.intended_use}
                        onChange={handleChange}
                        multiline
                        rows={2}
                    />
                    <TextFieldGroup
                        label="Intended User"
                        name="intended_user"
                        value={description.intended_user}
                        onChange={handleChange}
                    />
                    <TextFieldGroup
                        label="Operating Principle"
                        name="operating_principle"
                        value={description.operating_principle}
                        onChange={handleChange}
                        multiline
                        rows={2}
                    />
                    <TextFieldGroup
                        label="Medical Indication"
                        name="medical_indication"
                        value={description.medical_indication}
                        onChange={handleChange}
                        multiline
                        rows={2}
                    />
                    <TextFieldGroup
                        label="Contraindication"
                        name="contraindication"
                        value={description.contraindication}
                        onChange={handleChange}
                        multiline
                        rows={2}
                    />
                    <TextFieldGroup
                        label="Performance Claims"
                        name="performance_claims"
                        value={description.performance_claims}
                        onChange={handleChange}
                        multiline
                        rows={2}
                    />
                    <TextFieldGroup
                        label="Expected Benefit"
                        name="expected_benefit"
                        value={description.expected_benefit}
                        onChange={handleChange}
                        multiline
                        rows={2}
                    />
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
