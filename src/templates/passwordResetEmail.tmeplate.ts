const passwordResetEmailTemplate = (nombre: string, resetToken: string): string => {
    const resetLink = `https://tripgoquindio.vercel.app/reset-password?token=${resetToken}`;

    return `
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Recupera tu contraseña - TripGO</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
<div style="max-width: 600px; margin: 20px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #0E6973 0%, #117A87 100%); padding: 40px 30px; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 32px; font-family: Georgia, serif;">
        Trip<span style="color: #E27921;">GO</span>
    </h1>
    <p style="color: rgba(255,255,255,0.9); margin: 12px 0 0 0; font-size: 16px;">
        Recuperación de Contraseña
    </p>
    </div>

    <!-- Content -->
    <div style="padding: 40px 30px;">
    
    <h2 style="color: #0E6973; margin: 0 0 16px 0; font-size: 24px;">
        ¡Hola ${nombre}! 👋
    </h2>
    <p style="color: #666; line-height: 1.8; margin-bottom: 24px;">
        Recibimos una solicitud para restablecer la contraseña de tu cuenta en <strong style="color: #0E6973;">TripGO</strong>.
    </p>

    <p style="color: #666; line-height: 1.8; margin-bottom: 30px;">
        Si fuiste tú, haz clic en el botón de abajo para crear una nueva contraseña:
    </p>

    <!-- CTA Button -->
    <div style="text-align: center; margin: 30px 0;">
        <a href="${resetLink}" 
        style="display: inline-block; background: linear-gradient(135deg, #0E6973, #117A87); 
                color: white; padding: 16px 40px; text-decoration: none; border-radius: 12px; 
                font-weight: 700; font-size: 16px; box-shadow: 0 4px 15px rgba(14, 105, 115, 0.3);">
        🔐 Restablecer Contraseña
        </a>
    </div>

    <!-- Alternative Link -->
    <p style="color: #999; font-size: 13px; line-height: 1.6; margin: 30px 0; text-align: center;">
        Si el botón no funciona, copia y pega este enlace en tu navegador:<br>
        <a href="${resetLink}" style="color: #0E6973; word-break: break-all;">${resetLink}</a>
    </p>

    <!-- Warning -->
    <div style="background: #FFF3CD; padding: 16px; border-radius: 8px; border-left: 4px solid #FFC107; margin: 24px 0;">
        <p style="margin: 0; color: #856404; font-size: 14px; line-height: 1.6;">
        ⏰ <strong>Este enlace expira en 1 hora.</strong>
        </p>
    </div>

    <div style="background: #F8F9FA; padding: 16px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.6;">
        🛡️ Si <strong>no solicitaste</strong> este cambio, ignora este correo. Tu contraseña no será modificada.
        </p>
    </div>

    </div>

    <!-- Footer -->
    <div style="background: #2B2D42; padding: 24px 30px; text-align: center;">
    <p style="color: white; margin: 0 0 8px 0; font-size: 18px; font-family: Georgia, serif;">
        Trip<span style="color: #E27921;">GO</span>
    </p>
    <div style="width: 40px; height: 2px; background: #E27921; margin: 12px auto; border-radius: 2px;"></div>
    <p style="color: #9BA3AF; font-size: 11px; margin: 12px 0 0 0; line-height: 1.6;">
        Descubre el Quindío de una manera única<br>
        © 2025 TripGO. Todos los derechos reservados.
    </p>
    </div>

</div>
</body>
</html>
`;
};

export default passwordResetEmailTemplate;