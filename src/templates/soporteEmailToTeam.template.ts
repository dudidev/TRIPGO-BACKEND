interface DatosEmailSoporte {
    nombreUsuario: string;
    emailUsuario: string;
    idUsuario: number;
    categoria: string;
    prioridad: string;
    asunto: string;
    descripcion: string;
    fechaHora: string;
}

const soporteEmailToTeamTemplate = (datos: DatosEmailSoporte): string => {

    // Mapeo de prioridad a emoji
    const prioridadEmoji: Record<string, string> = {
        'urgente': '🔴',
        'alta': '🟠',
        'media': '🟡',
        'baja': '🟢'
    };

    const emoji = prioridadEmoji[datos.prioridad] || '⚪';

    return `
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Nuevo Mensaje de Soporte</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
<div style="max-width: 650px; margin: 20px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #DC3545 0%, #C82333 100%); padding: 30px; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 24px;">
        🚨 Nuevo Mensaje de Soporte
    </h1>
    <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 14px;">
        TripGO - Sistema de Soporte
    </p>
    </div>

    <!-- Content -->
    <div style="padding: 30px;">
    
    <!-- Usuario -->
    <div style="background: #F8F9FA; padding: 20px; border-radius: 8px; margin-bottom: 24px; border-left: 4px solid #0E6973;">
        <h3 style="margin: 0 0 12px 0; color: #2B2D42; font-size: 16px;">👤 Información del Usuario</h3>
        <table style="width: 100%; border-collapse: collapse;">
        <tr>
            <td style="padding: 6px 0; color: #6B7280; font-size: 14px; width: 80px;">Nombre:</td>
            <td style="padding: 6px 0; color: #2B2D42; font-weight: 600; font-size: 14px;">${datos.nombreUsuario}</td>
        </tr>
        <tr>
            <td style="padding: 6px 0; color: #6B7280; font-size: 14px;">Email:</td>
            <td style="padding: 6px 0; color: #0E6973; font-weight: 600; font-size: 14px;">
            <a href="mailto:${datos.emailUsuario}" style="color: #0E6973; text-decoration: none;">${datos.emailUsuario}</a>
            </td>
        </tr>
        <tr>
            <td style="padding: 6px 0; color: #6B7280; font-size: 14px;">ID:</td>
            <td style="padding: 6px 0; color: #2B2D42; font-weight: 600; font-size: 14px;">#${datos.idUsuario}</td>
        </tr>
        </table>
    </div>

    <!-- Categoría y Prioridad -->
    <div style="display: flex; gap: 12px; margin-bottom: 24px;">
        <div style="flex: 1; background: #E3F2FD; padding: 16px; border-radius: 8px; text-align: center;">
        <div style="color: #1976D2; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">
            Categoría
        </div>
        <div style="color: #0D47A1; font-size: 16px; font-weight: 600; text-transform: capitalize;">
            ${datos.categoria}
        </div>
        </div>
        <div style="flex: 1; background: #FFF3E0; padding: 16px; border-radius: 8px; text-align: center;">
        <div style="color: #F57C00; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">
            Prioridad
        </div>
        <div style="color: #E65100; font-size: 16px; font-weight: 600; text-transform: capitalize;">
            ${emoji} ${datos.prioridad}
        </div>
        </div>
    </div>

    <!-- Asunto -->
    <div style="margin-bottom: 20px;">
        <h3 style="margin: 0 0 8px 0; color: #2B2D42; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
        📋 Asunto
        </h3>
        <p style="margin: 0; color: #2B2D42; font-size: 16px; font-weight: 600; line-height: 1.5;">
        ${datos.asunto}
        </p>
    </div>

    <!-- Descripción -->
    <div style="margin-bottom: 24px;">
        <h3 style="margin: 0 0 12px 0; color: #2B2D42; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
        💬 Descripción del Problema
        </h3>
        <div style="background: #F8F9FA; padding: 16px; border-radius: 8px; border-left: 3px solid #0E6973;">
        <p style="margin: 0; color: #2B2D42; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">
${datos.descripcion}
        </p>
        </div>
    </div>

    <!-- Timestamp -->
    <div style="border-top: 1px solid #E5E7EB; padding-top: 16px; margin-top: 24px;">
        <p style="margin: 0; color: #9CA3AF; font-size: 12px;">
        📅 Recibido el: <strong style="color: #6B7280;">${datos.fechaHora}</strong>
        </p>
    </div>

    <!-- CTA -->
    <div style="text-align: center; margin-top: 24px;">
        <a href="mailto:${datos.emailUsuario}?subject=Re: ${datos.asunto}" 
        style="display: inline-block; background: linear-gradient(135deg, #0E6973, #117A87); 
                color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; 
                font-weight: 600; font-size: 14px; box-shadow: 0 4px 12px rgba(14, 105, 115, 0.3);">
        ✉️ Responder al Usuario
        </a>
    </div>

    </div>

    <!-- Footer -->
    <div style="background: #2B2D42; padding: 20px; text-align: center;">
    <p style="color: white; margin: 0; font-size: 16px; font-family: Georgia, serif;">
        Trip<span style="color: #E27921;">GO</span>
    </p>
    <div style="width: 40px; height: 2px; background: #E27921; margin: 10px auto; border-radius: 2px;"></div>
    <p style="color: #9BA3AF; font-size: 11px; margin: 8px 0 0 0;">
        Sistema de Soporte Automático
    </p>
    </div>

</div>
</body>
</html>
`;
};

export default soporteEmailToTeamTemplate;