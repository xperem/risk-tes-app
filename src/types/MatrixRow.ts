// src/types/MatrixRow.ts
export interface MatrixRow {
    id: string;
    user_id: string;
    product_id: string;
    danger: string;
    event: string;
    situation: string;
    probability: number;
    severity: number;
    mitigation: string;
    evidence: string;
    residual_probability: number; // Correspond à la base de données
    residual_severity: number;    // Correspond à la base de données
    acceptability: string;
    created_at: string;
}
