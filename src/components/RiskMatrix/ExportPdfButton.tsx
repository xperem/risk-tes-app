// src/components/ExportPdfButton.ts
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface ExportPdfButtonProps {
    targetId: string;
}

const exportPdf = async (targetId: string) => {
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

export default exportPdf;
