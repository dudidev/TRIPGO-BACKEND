const onboardingEmailTemplate = (
  nombreContacto: string,
  nombreEstablecimiento: string,
  onboardingLink: string
): string => {

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Completa tu onboarding - TripGO</title>
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
        Lleva tu negocio al siguiente nivel 
      </p>
    </div>

    <!-- Content -->
    <div style="padding: 40px 30px;">

      <!-- Badge -->
      <div style="text-align: center; margin-bottom: 30px;">
        <div style="display: inline-block; background: #E8F4F8; padding: 12px 24px; border-radius: 50px; margin-bottom: 20px;">
          <span style="color: #0E6973; font-weight: 700; font-size: 14px; letter-spacing: 1px;">
            ONBOARDING DE ESTABLECIMIENTO
          </span>
        </div>
      </div>

      <!-- Title -->
      <h2 style="color: #0E6973; margin: 0 0 16px 0; font-size: 24px; text-align: center;">
        ¡Hola ${nombreContacto}! 👋
      </h2>

      <p style="color: #666; line-height: 1.8; margin-bottom: 24px; text-align: center;">
        Hemos recibido exitosamente la solicitud de registro de tu establecimiento 
        <strong style="color: #0E6973;">${nombreEstablecimiento}</strong>.
      </p>

      <p style="color: #666; line-height: 1.8; margin-bottom: 24px; text-align: center;">
        Para continuar con el proceso de onboarding, necesitamos que completes la información adicional de tu negocio.
      </p>

      <!-- Steps -->
      <div style="background: #F8F9FA; padding: 24px; border-radius: 12px; margin: 30px 0;">

        <h3 style="color: #333; margin: 0 0 20px 0; font-size: 18px; text-align: center;">
          ¿Qué podrás completar?
        </h3>

        <div style="margin-bottom: 16px;">
          <div style="display: table; width: 100%;">

            <div style="display: table-cell; width: 30px; vertical-align: top;">
              <span style="color: #E27921; font-size: 20px;">📸</span>
            </div>

            <div style="display: table-cell; vertical-align: top;">
              <p style="margin: 0; color: #666; line-height: 1.6;">
                <strong style="color: #333;">Subir imágenes</strong><br>
                Agrega fotografías atractivas de tu establecimiento
              </p>
            </div>

          </div>
        </div>

        <div style="margin-bottom: 16px;">
          <div style="display: table; width: 100%;">

            <div style="display: table-cell; width: 30px; vertical-align: top;">
              <span style="color: #E27921; font-size: 20px;">🛎️</span>
            </div>

            <div style="display: table-cell; vertical-align: top;">
              <p style="margin: 0; color: #666; line-height: 1.6;">
                <strong style="color: #333;">Configurar servicios</strong><br>
                Selecciona los servicios que ofrece tu negocio
              </p>
            </div>

          </div>
        </div>

        <div>
          <div style="display: table; width: 100%;">

            <div style="display: table-cell; width: 30px; vertical-align: top;">
              <span style="color: #E27921; font-size: 20px;">📝</span>
            </div>

            <div style="display: table-cell; vertical-align: top;">
              <p style="margin: 0; color: #666; line-height: 1.6;">
                <strong style="color: #333;">Completar información</strong><br>
                Horarios, ubicación, contacto y detalles del negocio
              </p>
            </div>

          </div>
        </div>

      </div>

      <!-- CTA -->
      <div style="text-align: center; margin: 40px 0 30px 0;">

        <a href="${onboardingLink}"
           style="display: inline-block; background: linear-gradient(135deg, #0E6973, #117A87);
                  color: white; padding: 16px 40px; text-decoration: none; border-radius: 12px;
                  font-weight: 700; font-size: 16px; box-shadow: 0 4px 15px rgba(14, 105, 115, 0.3);">

          Completar Onboarding

        </a>

      </div>

      <!-- Warning -->
      <div style="background: #FFF3CD; padding: 16px; border-radius: 8px; border-left: 4px solid #FFC107; margin: 24px 0;">

        <p style="margin: 0; color: #856404; font-size: 14px; line-height: 1.6;">
          <strong>Importante:</strong> Este enlace tiene un tiempo limitado de validez por motivos de seguridad.
        </p>

      </div>

      <!-- Support -->
      <p style="color: #666; line-height: 1.6; margin-top: 30px; font-size: 14px; text-align: center;">
        Si tienes alguna duda durante el proceso, estaremos felices de ayudarte.<br>

        
        <a href="mailto:tripgoservice@gmail.com"
           style="color: #0E6973; text-decoration: none;">

          tripgoservice@gmail.com

        </a>

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

export default onboardingEmailTemplate;