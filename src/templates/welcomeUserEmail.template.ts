const welcomeUserEmail = (nombre: string): string => {
    return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bienvenido a TripGO</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
  <div style="max-width: 600px; margin: 20px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #0E6973 0%, #117A87 100%); padding: 50px 30px; text-align: center; position: relative;">
      <div style="background: rgba(226, 121, 33, 0.15); width: 200px; height: 200px; border-radius: 50%; position: absolute; top: -50px; right: -50px;"></div>
      <h1 style="color: white; margin: 0; font-size: 36px; font-family: Georgia, serif; position: relative; z-index: 2;">
        Trip<span style="color: #E27921;">GO</span>
      </h1>
      <p style="color: rgba(255,255,255,0.9); margin: 12px 0 0 0; font-size: 18px; position: relative; z-index: 2;">
        Tu aventura comienza aquí 🌴
      </p>
    </div>

    <!-- Content -->
    <div style="padding: 40px 30px;">
      
      <div style="text-align: center; margin-bottom: 30px;">
        <div style="display: inline-block; background: #E8F4F8; padding: 12px 24px; border-radius: 50px; margin-bottom: 20px;">
          <span style="color: #0E6973; font-weight: 700; font-size: 14px; letter-spacing: 1px;">¡BIENVENIDO!</span>
        </div>
      </div>

      <h2 style="color: #0E6973; margin: 0 0 16px 0; font-size: 24px; text-align: center;">
        ¡Hola ${nombre}! 👋
      </h2>
      
      <p style="color: #666; line-height: 1.8; margin-bottom: 24px; text-align: center;">
        Nos emociona que te hayas unido a <strong style="color: #0E6973;">TripGO</strong>. 
        Estás a punto de descubrir los mejores lugares turísticos del Quindío.
      </p>

      <!-- Features -->
      <div style="background: #F8F9FA; padding: 24px; border-radius: 12px; margin: 30px 0;">
        <h3 style="color: #333; margin: 0 0 20px 0; font-size: 18px; text-align: center;">
          ¿Qué puedes hacer en TripGO?
        </h3>
        
        <div style="margin-bottom: 16px;">
          <div style="display: table; width: 100%; margin-bottom: 12px;">
            <div style="display: table-cell; width: 30px; vertical-align: top;">
              <span style="color: #E27921; font-size: 20px;">🗺️</span>
            </div>
            <div style="display: table-cell; vertical-align: top;">
              <p style="margin: 0; color: #666; line-height: 1.6;">
                <strong style="color: #333;">Explora lugares increíbles</strong><br>
                Hoteles, restaurantes, atracciones turísticas y mucho más
              </p>
            </div>
          </div>
        </div>

        <div style="margin-bottom: 16px;">
          <div style="display: table; width: 100%; margin-bottom: 12px;">
            <div style="display: table-cell; width: 30px; vertical-align: top;">
              <span style="color: #E27921; font-size: 20px;">💰</span>
            </div>
            <div style="display: table-cell; vertical-align: top;">
              <p style="margin: 0; color: #666; line-height: 1.6;">
                <strong style="color: #333;">Planea tu presupuesto</strong><br>
                Crea itinerarios y calcula el costo de tu viaje soñado
              </p>
            </div>
          </div>
        </div>

        <div>
          <div style="display: table; width: 100%;">
            <div style="display: table-cell; width: 30px; vertical-align: top;">
              <span style="color: #E27921; font-size: 20px;">⭐</span>
            </div>
            <div style="display: table-cell; vertical-align: top;">
              <p style="margin: 0; color: #666; line-height: 1.6;">
                <strong style="color: #333;">Comparte tu experiencia</strong><br>
                Deja comentarios y ayuda a otros viajeros
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div style="text-align: center; margin: 40px 0 30px 0;">
        <a href="https://tripgoquindio.vercel.app/login" 
           style="display: inline-block; background: linear-gradient(135deg, #0E6973, #117A87); 
                  color: white; padding: 16px 40px; text-decoration: none; border-radius: 12px; 
                  font-weight: 700; font-size: 16px; box-shadow: 0 4px 15px rgba(14, 105, 115, 0.3);">
          🚀 Comenzar a Explorar
        </a>
      </div>

      <div style="background: #FFF3CD; padding: 16px; border-radius: 8px; border-left: 4px solid #FFC107; margin: 24px 0;">
        <p style="margin: 0; color: #856404; font-size: 14px; line-height: 1.6;">
          <strong>💡 Tip:</strong> Guarda este correo. Tu cuenta ya está activa y lista para usar.
        </p>
      </div>

      <p style="color: #666; line-height: 1.6; margin-top: 30px; font-size: 14px; text-align: center;">
        Si tienes alguna pregunta, estamos aquí para ayudarte:<br>
        📧 <a href="mailto:teamtripgo@outlook.com" style="color: #0E6973; text-decoration: none;">teamtripgo@outlook.com</a>
      </p>

    </div>

    <!-- Footer -->
    <div style="background: #2B2D42; padding: 24px 30px; text-align: center;">
      <p style="color: white; margin: 0 0 8px 0; font-size: 18px; font-family: Georgia, serif;">
        Trip<span style="color: #E27921;">GO</span>
      </p>
      <div style="width: 40px; height: 2px; background: #E27921; margin: 12px auto; border-radius: 2px;"></div>
      <p style="color: #9BA3AF; font-size: 12px; margin: 12px 0 0 0; line-height: 1.6;">
        Descubre el Quindío de una manera única<br>
        © 2025 TripGO. Todos los derechos reservados.
      </p>
    </div>

  </div>
</body>
</html>
  `;
};

module.exports = { welcomeUserEmail };