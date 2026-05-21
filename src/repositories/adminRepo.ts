import pool from '../config/db.js';
import { SolicitudOnboarding } from '../types/onboarding.types.js';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// ─── Helper: safe JSON parse ─────────────────────────────────────────────────

function safeJsonParse(value: any): any {
    if (value === null || value === undefined) return null;
    if (typeof value === 'object') return value; // Ya es objeto
    if (typeof value === 'string') {
        try {
            return JSON.parse(value);
        } catch {
            return null;
        }
    }
    return null;
}

// ─── Listar solicitudes pendientes y en revisión ─────────────────────────────

export async function listarSolicitudes(): Promise<SolicitudOnboarding[]> {
    const [rows] = await pool.execute<RowDataPacket[]>(
        `SELECT * FROM solicitudes_onboarding
        WHERE estado IN ('pendiente', 'en_revision')
        ORDER BY created_at DESC`
    );

    return rows.map((row) => ({
        ...row,
        datos_completos: safeJsonParse(row['datos_completos']),
        fotos: safeJsonParse(row['fotos']),
        servicios: safeJsonParse(row['servicios']),
        token_expiracion: new Date(row['token_expiracion']),
        created_at: new Date(row['created_at']),
        updated_at: new Date(row['updated_at']),
    })) as SolicitudOnboarding[];
}

// ─── Obtener solicitud por ID ─────────────────────────────────────────────────

export async function getSolicitudById(id: number): Promise<SolicitudOnboarding | null> {
    const [rows] = await pool.execute<RowDataPacket[]>(
        `SELECT * FROM solicitudes_onboarding WHERE id_solicitud = ? LIMIT 1`,
        [id]
    );

    const [row] = rows;
    if (!row) return null;

    return {
        ...row,
        datos_completos: safeJsonParse(row['datos_completos']),
        fotos: safeJsonParse(row['fotos']),
        servicios: safeJsonParse(row['servicios']),
        token_expiracion: new Date(row['token_expiracion']),
        created_at: new Date(row['created_at']),
        updated_at: new Date(row['updated_at']),
    } as SolicitudOnboarding;
}

// ─── Actualizar estado de solicitud ──────────────────────────────────────────

export async function actualizarEstado(
    id: number,
    estado: 'aprobado' | 'rechazado'
): Promise<void> {
    await pool.execute<ResultSetHeader>(
        `UPDATE solicitudes_onboarding SET estado = ? WHERE id_solicitud = ?`,
        [estado, id]
    );
}