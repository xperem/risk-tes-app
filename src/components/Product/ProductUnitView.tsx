// src/components/Product/ProductUnitView.tsx
import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography, Button, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

interface ProductUnitViewProps {
    id: string;
    name: string;
    onDelete: (id: string) => void;
    onViewDetails: (id: string) => void; // Assurez-vous que cette prop est définie ici
}

const ProductUnitView: React.FC<ProductUnitViewProps> = ({ id, name, onDelete, onViewDetails }) => {
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
                
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => onViewDetails(id)}>View Details</Button> {/* Assurez-vous que cette ligne appelle bien la fonction */}
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
