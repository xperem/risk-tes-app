// src/components/RiskMatrix/hooks/useRiskMatrix.ts
import { useState, useEffect } from 'react';
import { fetchMatrixRows, addMatrixRow, updateMatrixRow, deleteMatrixRow, } from '../../../api/matrixService';
import { MatrixRow as MatrixRowType } from '../../../types/MatrixRow';

const useRiskMatrix = (productId: string) => {
    const [rows, setRows] = useState<MatrixRowType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getRows = async () => {
            setLoading(true);
            const fetchedRows = await fetchMatrixRows(productId);
            setRows(fetchedRows);
            setLoading(false);
        };
        getRows();
    }, [productId]);

    const addRow = async (row: Partial<MatrixRowType>) => {
        const newRow = await addMatrixRow(row, productId);
        if (newRow) {
            setRows((prev) => [...prev, newRow]);
        }
    };

    const updateRow = async (id: string, updates: Partial<MatrixRowType>) => {
        await updateMatrixRow(id, updates);
        setRows((prev) =>
            prev.map((row) => (row.id === id ? { ...row, ...updates } : row))
        );
    };

    const deleteRow = async (id: string) => {
        await deleteMatrixRow(id);
        setRows((prev) => prev.filter((row) => row.id !== id));
    };

    return { rows, loading, addRow, updateRow, deleteRow };
};

export default useRiskMatrix;
