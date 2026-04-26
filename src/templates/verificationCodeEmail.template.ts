/**
 * Template del correo de verificación por código de 6 dígitos.
 * Construido 100% con inline styles para compatibilidad universal:
 * Gmail, Outlook, Apple Mail, Yahoo, móvil nativo.
 * 
 * @param nombre - Nombre del usuario recién registrado
 * @param code   - Código de 6 dígitos generado en auth.service.ts
 */
const verificationCodeEmailTemplate = (nombre: string, code: string): string => {
    // Separa los 6 dígitos para mostrarlos como celdas individuales
    const digits = code.split("");

    const digitCells = digits.map(d =>
        `<td style="padding: 0 5px;">
            <div style="
                width: 44px;
                height: 56px;
                background-color: #F0F9FA;
                border: 2px solid #0E6973;
                border-radius: 10px;
                font-family: 'Courier New', Courier, monospace;
                font-size: 28px;
                font-weight: 700;
                color: #0A4A53;
                text-align: center;
                line-height: 56px;
                display: block;
            ">${d}</div>
        </td>`
    ).join("");

    return `<!DOCTYPE html>
<html lang="es" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>Código de verificación — TripGO</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
  <style>
    /* Resets básicos: solo lo que inline no puede hacer */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    body { margin: 0 !important; padding: 0 !important; background-color: #EAEFF2; }
    /* Outlook fix */
    .ExternalClass { width: 100%; }
    .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font,
    .ExternalClass td, .ExternalClass div { line-height: 100%; }
    /* Evita que algunos clientes auto-linkeen números */
    a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; }
    @media screen and (max-width: 480px) {
      .email-wrapper  { width: 100% !important; padding: 0 12px !important; }
      .main-table     { width: 100% !important; }
      .header-td      { padding: 36px 24px 30px !important; }
      .body-td        { padding: 32px 24px !important; }
      .cta-td         { padding: 24px !important; }
      .footer-td      { padding: 24px !important; }
      .digit-cell div { width: 38px !important; height: 50px !important; line-height: 50px !important; font-size: 24px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #EAEFF2;">

<!-- Preheader invisible -->
<div style="display: none; max-height: 0; overflow: hidden; mso-hide: all;">
  Tu código de verificación TripGO es ${code}. Válido por 15 minutos.
  &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
</div>

<!-- Wrapper -->
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #EAEFF2;">
  <tr>
    <td align="center" style="padding: 40px 16px;">

      <!-- Card principal: max 600px -->
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="main-table"
             style="max-width: 600px; width: 100%; border-radius: 20px; overflow: hidden;">

        <!-- ══ HEADER ══ -->
        <tr>
          <td class="header-td" style="
            background-color: #0A5560;
            background-image: linear-gradient(135deg, #0A5560 0%, #0E6973 55%, #117A87 100%);
            padding: 48px 48px 40px;
            border-radius: 20px 20px 0 0;
          ">
            <!-- Logo row -->
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td style="padding-bottom: 32px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <!-- Ícono cuadrado naranja -->
                      <td style="padding-right: 12px; vertical-align: middle;">
                        <div style="
                          width: 40px; height: 40px;
                          background-color: #E27921;
                          border-radius: 11px;
                          text-align: center;
                          line-height: 40px;
                        ">
                          <img src="https://www.tripgoapp.com/assets/icons/logo-white.png"
                               alt="TripGO" width="22" height="22"
                               style="vertical-align: middle; display: inline-block;"
                               onerror="this.style.display='none'" />
                        </div>
                      </td>
                      <!-- Nombre logotipo -->
                      <td style="vertical-align: middle;">
                        <span style="
                          font-family: Georgia, 'Times New Roman', serif;
                          font-size: 22px;
                          color: #ffffff;
                          letter-spacing: -0.3px;
                        ">Trip<span style="color: #E27921;">GO</span></span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <!-- Badge tipo pill -->
                <td style="padding-bottom: 14px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="
                        background-color: rgba(226,121,33,0.18);
                        border: 1px solid rgba(226,121,33,0.40);
                        border-radius: 100px;
                        padding: 5px 14px;
                      ">
                        <span style="
                          font-family: Arial, Helvetica, sans-serif;
                          font-size: 11px;
                          font-weight: 700;
                          letter-spacing: 1.2px;
                          text-transform: uppercase;
                          color: #F59A52;
                        ">Verificacion de correo</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <h1 style="
                    font-family: Georgia, 'Times New Roman', serif;
                    font-size: 30px;
                    font-weight: 400;
                    color: #ffffff;
                    line-height: 1.18;
                    letter-spacing: -0.4px;
                    margin: 0;
                  ">Confirma tu correo<br>para ingresar a <em style="color: #F59A52; font-style: italic;">TripGO</em></h1>
                  <p style="
                    font-family: Arial, Helvetica, sans-serif;
                    font-size: 14px;
                    color: rgba(255,255,255,0.65);
                    margin: 12px 0 0 0;
                    line-height: 1.6;
                    font-weight: 300;
                  ">Ingresa el código en la pantalla de registro para continuar.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ══ BANDA NARANJA ══ -->
        <tr>
          <td style="background-color: #E27921; padding: 13px 48px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td width="20" style="vertical-align: middle; padding-right: 10px;">
                  <!-- Ícono reloj SVG inline -->
                  <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTExLjk5IDJDNi40NyAyIDIgNi40OCAyIDEyczQuNDcgMTAgOS45OSAxMFMyMiAxNy41MiAyMiAxMiAxNy41MSAyIDExLjk5IDJ6TTEyIDIwYy00LjQyIDAtOC0zLjU4LTgtOHMzLjU4LTggOC04IDggMy41OCA4IDgtMy41OCA4LTggOHptLjUtMTNoLTF2Nmw1LjI1IDMuMTUuNzUtMS4yMy00LTIuMzZWN3oiLz48L3N2Zz4="
                       alt="" width="16" height="16" style="vertical-align: middle; display: block;" />
                </td>
                <td>
                  <span style="
                    font-family: Arial, Helvetica, sans-serif;
                    font-size: 13px;
                    font-weight: 700;
                    color: #ffffff;
                    letter-spacing: 0.2px;
                  ">Este codigo expira en 15 minutos</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ══ BODY ══ -->
        <tr>
          <td class="body-td" style="background-color: #ffffff; padding: 44px 48px 36px;">

            <!-- Saludo -->
            <p style="
              font-family: Arial, Helvetica, sans-serif;
              font-size: 15px;
              color: #2B2D42;
              line-height: 1.7;
              margin: 0 0 28px 0;
              font-weight: 300;
            ">Hola <strong style="font-weight: 600; color: #0A4A53;">${nombre}</strong>, 
            para completar tu registro en TripGO necesitamos confirmar que este correo te pertenece.
            Ingresa el siguiente código en la pantalla de registro:</p>

            <!-- Código de dígitos -->
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                   style="margin-bottom: 28px;">
              <tr>
                <td align="center">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      ${digitCells}
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Nota de seguridad -->
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                   style="margin-bottom: 24px;">
              <tr>
                <td style="
                  background-color: #FFF3CD;
                  border-left: 3px solid #FFC107;
                  border-radius: 0 10px 10px 0;
                  padding: 14px 18px;
                ">
                  <p style="
                    font-family: Arial, Helvetica, sans-serif;
                    font-size: 13px;
                    color: #856404;
                    line-height: 1.6;
                    margin: 0;
                  "><strong>No compartas este codigo.</strong> TripGO nunca te lo pedira por telefono, chat ni otro correo.</p>
                </td>
              </tr>
            </table>

            <!-- Nota de no solicitado -->
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td style="
                  background-color: #F8F9FA;
                  border-radius: 10px;
                  padding: 14px 18px;
                ">
                  <p style="
                    font-family: Arial, Helvetica, sans-serif;
                    font-size: 13px;
                    color: #6B7280;
                    line-height: 1.6;
                    margin: 0;
                  ">¿No creaste una cuenta en TripGO? Puedes ignorar este correo con seguridad.</p>
                </td>
              </tr>
            </table>

            <!-- Separador -->
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                   style="margin-top: 32px; border-top: 1px solid #F0F0F0;">
              <tr>
                <td style="padding-top: 18px;">
                  <p style="
                    font-family: Arial, Helvetica, sans-serif;
                    font-size: 12px;
                    color: #B0B7C3;
                    margin: 0;
                    line-height: 1.6;
                  ">Enviado desde <strong style="color: #6B7280;">tripgoapp.com/registro</strong></p>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- ══ FOOTER ══ -->
        <tr>
          <td class="footer-td" style="
            background-color: #2B2D42;
            border-radius: 0 0 20px 20px;
            padding: 28px 48px;
            text-align: center;
          ">
            <p style="
              font-family: Georgia, 'Times New Roman', serif;
              font-size: 18px;
              color: #ffffff;
              margin: 0 0 4px 0;
            ">Trip<span style="color: #E27921;">GO</span></p>

            <!-- Línea decorativa naranja -->
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                   style="margin: 12px 0;">
              <tr>
                <td align="center">
                  <div style="width: 36px; height: 2px; background-color: #E27921; border-radius: 2px;"></div>
                </td>
              </tr>
            </table>

            <p style="
              font-family: Arial, Helvetica, sans-serif;
              font-size: 11px;
              color: #6B7380;
              line-height: 1.7;
              margin: 0;
            ">
              Este correo fue generado automaticamente.<br>
              <a href="https://www.tripgoapp.com/privacidad" style="color: #9BA3AF; text-decoration: none;">Politica de privacidad</a>
              &nbsp;·&nbsp;
              <a href="https://www.tripgoapp.com/soporte" style="color: #9BA3AF; text-decoration: none;">Soporte</a>
              &nbsp;·&nbsp;
              <a href="https://www.tripgoapp.com" style="color: #9BA3AF; text-decoration: none;">tripgoapp.com</a>
            </p>
            <p style="
              font-family: Arial, Helvetica, sans-serif;
              font-size: 10px;
              color: #444755;
              margin: 10px 0 0 0;
            ">© 2025 TripGO. Todos los derechos reservados.</p>
          </td>
        </tr>

      </table>
      <!-- /Card -->

    </td>
  </tr>
</table>

</body>
</html>`;
};

export default verificationCodeEmailTemplate;