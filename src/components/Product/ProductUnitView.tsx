// src/components/Product/ProductUnitView.tsx

import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography, Button, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

interface ProductUnitViewProps {
    id: string;
    name: string;
    description: string;
    onDelete: (id: string) => void;
    onViewDetails: (id: string) => void;
}

const ProductUnitView: React.FC<ProductUnitViewProps> = ({ id, name, description, onDelete, onViewDetails }) => {
    return (
        <Card sx={{ maxWidth: 345, backgroundColor: '#2a2a2a', color: '#ffffff' }}>
            <CardMedia
                component="img"
                height="140"
                image="https://via.placeholder.com/345x140" // Placeholder image, replace with real image if available
                alt={name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => onViewDetails(id)}>View Details</Button>
                <IconButton
                    aria-label="delete"
                    onClick={() => onDelete(id)}
                    sx={{ color: '#d32f2f' }}
                >
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default ProductUnitView;
