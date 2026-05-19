import pool from '../config/db.js';
import { SolicitudOnboarding, CrearSolicitudDTO } from '../types/onboarding.types.js';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// ─── Crear solicitud inicial ────────────────────────────────────────────────

export async function crearSolicitud(
    data: CrearSolicitudDTO,
    token: string,
    expiracion: Date
): Promise<number> {
    const [result] = await pool.execute<ResultSetHeader>(
        `INSERT INTO solicitudes_onboarding
        (nombre_establecimiento, nombre_contacto, correo_contacto, descripcion, token_formulario, token_expiracion)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [data.nombre_establecimiento, data.nombre_contacto, data.correo_contacto, data.descripcion, token, expiracion]
    );
    return result.insertId;
}

// ─── Buscar por token ────────────────────────────────────────────────────────

export async function buscarPorToken(token: string): Promise<SolicitudOnboarding | null> {
    const [rows] = await pool.execute<RowDataPacket[]>(
        `SELECT * FROM solicitudes_onboarding WHERE token_formulario = ? LIMIT 1`,
        [token]
    );

    if (rows.length === 0) return null;

    // Desestructuración + guard: TS no infiere que rows[0] existe aunque pasó el length check
    const [row] = rows;
    if (!row) return null;

    return {
        ...row,
        datos_completos:  row['datos_completos']  ? JSON.parse(row['datos_completos'])  : null,
        fotos:            row['fotos']            ? JSON.parse(row['fotos'])            : null,
        servicios:        row['servicios']        ? JSON.parse(row['servicios'])        : null,
        token_expiracion: new Date(row['token_expiracion']),
        created_at:       new Date(row['created_at']),
        updated_at:       new Date(row['updated_at']),
    } as SolicitudOnboarding;
}

// ─── Actualizar solicitud a en_revision (paso 2) ─────────────────────────────

export async function completarSolicitud(
    token: string,
    datos_completos: Record<string, unknown>,
    fotos: string[],
    servicios: string[]
): Promise<void> {
    await pool.execute(
        `UPDATE solicitudes_onboarding
        SET datos_completos = ?, fotos = ?, servicios = ?, estado = 'en_revision'
        WHERE token_formulario = ?`,
        [JSON.stringify(datos_completos), JSON.stringify(fotos), JSON.stringify(servicios), token]
    );
}