interface DatosConfirmacionUsuario {
    nombreUsuario: string;
    asunto: string;
    prioridad: string;
}

const soporteEmailToUserTemplate = (datos: DatosConfirmacionUsuario): string => {

    // Tiempo de respuesta según prioridad
    const tiempoRespuesta: Record<string, string> = {
        'urgente': '12 horas',
        'alta': '24 horas',
        'media': '48 horas',
        'baja': '72 horas'
    };

    const tiempo = tiempoRespuesta[datos.prioridad] || '48 horas';

    return `
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mensaje de Soporte Recibido</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
<div style="max-width: 600px; margin: 20px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #0E6973 0%, #117A87 100%); padding: 40px 30px; text-align: center;">
    <h1 style="color: white; margin: 0 0 12px 0; font-size: 28px; font-family: Georgia, serif;">
        Trip<span style="color: #E27921;">GO</span>
    </h1>
    <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 16px;">
        Soporte Técnico
    </p>
    </div>

    <!-- Content -->
    <div style="padding: 40px 30px;">
    
    <h2 style="color: #0E6973; margin: 0 0 16px 0; font-size: 24px;">
        ¡Hola ${datos.nombreUsuario}! 👋
    </h2>
    
    <p style="color: #2B2D42; line-height: 1.8; margin-bottom: 24px; font-size: 15px;">
        Recibimos tu solicitud de soporte y queremos que sepas que <strong>ya estamos trabajando en ella</strong>.
    </p>

    <!-- Info Box -->
    <div style="background: #F0F9FA; padding: 20px; border-radius: 12px; border-left: 4px solid #0E6973; margin-bottom: 24px;">
        <p style="margin: 0 0 8px 0; color: #6B7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">
        Tu Solicitud
        </p>
        <p style="margin: 0; color: #2B2D42; font-size: 16px; font-weight: 600;">
        ${datos.asunto}
        </p>
    </div>

    <p style="color: #2B2D42; line-height: 1.8; margin-bottom: 24px; font-size: 15px;">
        Nuestro equipo revisará tu caso y te responderá en un plazo máximo de <strong style="color: #E27921;">${tiempo} hábiles</strong>.
    </p>

    <!-- Warning -->
    <div style="background: #FFF3CD; padding: 16px; border-radius: 8px; border-left: 4px solid #FFC107; margin-bottom: 24px;">
        <p style="margin: 0; color: #856404; font-size: 14px; line-height: 1.6;">
        💡 <strong>Tip:</strong> Si tienes más información que agregar, simplemente responde a este correo.
        </p>
    </div>

    <p style="color: #6B7280; line-height: 1.8; margin-bottom: 0; font-size: 14px;">
        Gracias por tu paciencia.<br>
        <strong style="color: #0E6973;">Equipo TripGO</strong>
    </p>

    </div>

    <!-- Footer -->
    <div style="background: #2B2D42; padding: 24px 30px; text-align: center;">
    <p style="color: white; margin: 0 0 8px 0; font-size: 18px; font-family: Georgia, serif;">
        Trip<span style="color: #E27921;">GO</span>
    </p>
    <div style="width: 40px; height: 2px; background: #E27921; margin: 12px auto; border-radius: 2px;"></div>
    <p style="color: #9BA3AF; font-size: 11px; margin: 12px 0 0 0; line-height: 1.6;">
        📧 X-code@tripgo.com • 📞 +57 3147212090<br>
        © 2025 TripGO. Todos los derechos reservados.
    </p>
    </div>

</div>
</body>
</html>
`;
};

export default soporteEmailToUserTemplate;