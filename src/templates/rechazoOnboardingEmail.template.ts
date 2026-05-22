const rechazoOnboardingEmailTemplate = (
  nombreContacto: string,
  nombreEstablecimiento: string,
  motivo?: string
): string => {

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Actualización de tu solicitud - TripGO</title>
</head>

<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">

  <div style="max-width: 600px; margin: 20px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">

    <!-- Header -->
    <div style="background: linear-gradient(135deg, #A83232 0%, #C44545 100%); padding: 50px 30px; text-align: center; position: relative;">

      <div style="background: rgba(255,255,255,0.08); width: 200px; height: 200px; border-radius: 50%; position: absolute; top: -50px; right: -50px;"></div>

      <h1 style="color: white; margin: 0; font-size: 36px; font-family: Georgia, serif; position: relative; z-index: 2;">
        Trip<span style="color: #FFD166;">GO</span>
      </h1>

      <p style="color: rgba(255,255,255,0.9); margin: 12px 0 0 0; font-size: 18px; position: relative; z-index: 2;">
        Actualización de tu solicitud
      </p>

    </div>

    <!-- Content -->
    <div style="padding: 40px 30px;">

      <!-- Badge -->
      <div style="text-align: center; margin-bottom: 30px;">

        <div style="display: inline-block; background: #FDECEC; padding: 12px 24px; border-radius: 50px; margin-bottom: 20px;">

          <span style="color: #C44545; font-weight: 700; font-size: 14px; letter-spacing: 1px;">
            SOLICITUD NO APROBADA
          </span>

        </div>

      </div>

      <!-- Title -->
      <h2 style="color: #A83232; margin: 0 0 16px 0; font-size: 24px; text-align: center;">
        Hola ${nombreContacto}
      </h2>

      <p style="color: #666; line-height: 1.8; margin-bottom: 24px; text-align: center;">

        Hemos revisado la solicitud de onboarding de tu establecimiento
        <strong style="color: #A83232;">${nombreEstablecimiento}</strong>,
        pero en este momento no pudo ser aprobada.

      </p>

      ${
        motivo
          ? `
          <!-- Motivo -->
          <div style="
            background: #FFF5F5;
            border-left: 4px solid #C44545;
            padding: 20px;
            border-radius: 10px;
            margin: 30px 0;
          ">

            <h3 style="margin: 0 0 12px 0; color: #A83232; font-size: 18px;">
              Motivo de rechazo
            </h3>

            <p style="margin: 0; color: #666; line-height: 1.7;">
              ${motivo}
            </p>

          </div>
          `
          : ''
      }

      <!-- Info -->
      <div style="background: #F8F9FA; padding: 24px; border-radius: 12px; margin: 30px 0;">

        <h3 style="color: #333; margin: 0 0 16px 0; font-size: 18px; text-align: center;">
          ¿Qué puedes hacer ahora?
        </h3>

        <p style="color: #666; line-height: 1.8; margin: 0; text-align: center;">
          Puedes comunicarte con nuestro equipo para recibir más información
          o corregir los datos enviados en tu solicitud.
        </p>

      </div>

      <!-- Support -->
      <p style="color: #666; line-height: 1.6; margin-top: 30px; font-size: 14px; text-align: center;">

        Si tienes dudas o deseas más información, estaremos felices de ayudarte.<br>

        <a href="mailto:tripgoservice@gmail.com"
           style="color: #A83232; text-decoration: none;">

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

export default rechazoOnboardingEmailTemplate;