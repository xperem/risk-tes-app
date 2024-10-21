// src/components/ExportPdfButton.tsx
import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Button, SxProps, Theme } from '@mui/material';

interface ExportPdfButtonProps {
    targetId: string; // L'ID de l'élément HTML que tu veux exporter
    sx?: SxProps<Theme>; // Ajoutez cette ligne pour accepter la prop `sx`
}

const ExportPdfButton: React.FC<ExportPdfButtonProps> = ({ targetId, sx }) => {
    const exportToPdf = async () => {
        const element = document.getElementById(targetId);

        if (element) {
            const canvas = await html2canvas(element);
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('risk-matrix.pdf');
        }
    };

    return (
        <Button
            variant="contained"
            onClick={exportToPdf}
            sx={{
                padding: '10px',
                cursor: 'pointer',
                margin: '20px 0',
                ...sx, // Merge le style passé en props avec le style par défaut
            }}
        >
            Export as PDF
        </Button>
    );
};

export default ExportPdfButton;
