// src/components/AddRowButton.tsx
import { Button, SxProps } from '@mui/material';

interface AddRowButtonProps {
    addRow: () => void;
    sx?: SxProps; // Ajoutez cette ligne pour accepter `sx`
}

const AddRowButton: React.FC<AddRowButtonProps> = ({ addRow, sx }) => (
    <Button variant="contained" onClick={addRow} sx={sx}>
        Add Row
    </Button>
);

export default AddRowButton;
