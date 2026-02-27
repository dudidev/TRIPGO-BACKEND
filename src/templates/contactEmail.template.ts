/**
 * Genera el HTML del correo de alerta para el equipo de TripGO.
 * @param {{ name: string, email: string, message: string, dateTime: string }} data
 * @returns {string} HTML completo del correo
 */
function buildContactEmailHtml({ name, email, message, dateTime }) {
    const s = escapeHtml; // alias corto

    return `<!DOCTYPE html>
<html lang="es" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Nuevo negocio quiere unirse a TripGO</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      background-color: #EAEFF2;
      font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      -webkit-font-smoothing: antialiased;
    }

    .email-wrapper {
      max-width: 620px;
      margin: 40px auto;
      background: transparent;
    }

    /* ── HEADER ── */
    .header {
      background: linear-gradient(135deg, #0A5560 0%, #0E6973 50%, #117A87 100%);
      border-radius: 20px 20px 0 0;
      padding: 0;
      overflow: hidden;
      position: relative;
    }

    .header-inner {
      padding: 48px 48px 40px;
      position: relative;
      z-index: 2;
    }

    .header-decoration {
      position: absolute;
      top: -60px;
      right: -60px;
      width: 280px;
      height: 280px;
      border-radius: 50%;
      background: rgba(226, 121, 33, 0.12);
      z-index: 1;
    }

    .header-decoration-2 {
      position: absolute;
      bottom: -80px;
      right: 60px;
      width: 180px;
      height: 180px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.05);
      z-index: 1;
    }

    .logo-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 36px;
    }

    .logo-icon {
      width: 42px;
      height: 42px;
      background: #E27921;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .logo-text {
      font-family: 'DM Serif Display', Georgia, serif;
      font-size: 22px;
      color: #ffffff;
      letter-spacing: -0.3px;
    }

    .logo-text span {
      color: #E27921;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(226, 121, 33, 0.2);
      border: 1px solid rgba(226, 121, 33, 0.4);
      color: #F59A52;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      padding: 5px 12px;
      border-radius: 100px;
      margin-bottom: 16px;
    }

    .badge-dot {
      width: 6px;
      height: 6px;
      background: #E27921;
      border-radius: 50%;
      animation: pulse 2s infinite;
    }

    .header h1 {
      font-family: 'DM Serif Display', Georgia, serif;
      font-size: 32px;
      color: #ffffff;
      line-height: 1.15;
      letter-spacing: -0.5px;
      font-weight: 400;
    }

    .header h1 em {
      color: #F59A52;
      font-style: italic;
    }

    /* ── DIVIDER WAVE ── */
    .wave-divider {
      background: #0E6973;
      line-height: 0;
    }

    /* ── ALERT BAND ── */
    .alert-band {
      background: #E27921;
      padding: 14px 48px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .alert-band p {
      font-size: 13px;
      font-weight: 600;
      color: #ffffff;
      letter-spacing: 0.3px;
    }

    /* ── BODY ── */
    .body-section {
      background: #ffffff;
      padding: 48px 48px 36px;
    }

    .section-label {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #0E6973;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .section-label::after {
      content: '';
      flex: 1;
      height: 1px;
      background: linear-gradient(90deg, #0E697330, transparent);
    }

    /* ── DATA CARDS ── */
    .data-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 24px;
    }

    .data-card {
      background: #F8F9FA;
      border: 1px solid #E8EAED;
      border-radius: 14px;
      padding: 18px 20px;
      transition: border-color 0.2s;
    }

    .data-card.full-width {
      grid-column: 1 / -1;
    }

    .data-card .card-label {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #9BA3AF;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .card-label svg {
      flex-shrink: 0;
    }

    .data-card .card-value {
      font-size: 15px;
      font-weight: 500;
      color: #2B2D42;
      line-height: 1.4;
      word-break: break-word;
    }

    .data-card .card-value.email-value {
      color: #0E6973;
      text-decoration: none;
      font-weight: 600;
    }

    /* ── MESSAGE BOX ── */
    .message-box {
      background: linear-gradient(135deg, #F0F9FA 0%, #EAF5F6 100%);
      border-left: 3px solid #0E6973;
      border-radius: 0 14px 14px 0;
      padding: 20px 24px;
      margin-top: 4px;
    }

    .message-box p {
      font-size: 14px;
      color: #2B2D42;
      line-height: 1.7;
      font-weight: 300;
    }

    /* ── TIMESTAMP ── */
    .meta-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 32px;
      padding-top: 20px;
      border-top: 1px solid #F0F0F0;
    }

    .meta-row p {
      font-size: 12px;
      color: #B0B7C3;
    }

    .meta-row strong {
      color: #6B7280;
    }

    /* ── CTA ── */
    .cta-section {
      background: #F8F9FA;
      border-top: 1px solid #EAECEF;
      padding: 32px 48px;
      text-align: center;
    }

    .cta-section p {
      font-size: 13px;
      color: #6B7280;
      margin-bottom: 20px;
      line-height: 1.6;
    }

    .cta-btn {
      display: inline-block;
      background: linear-gradient(135deg, #0E6973, #0A8A99);
      color: #ffffff;
      text-decoration: none;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.3px;
      padding: 14px 32px;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(14, 105, 115, 0.35);
    }

    .cta-btn-secondary {
      display: inline-block;
      margin-left: 12px;
      background: transparent;
      border: 1.5px solid #E27921;
      color: #E27921;
      text-decoration: none;
      font-size: 14px;
      font-weight: 600;
      padding: 13px 28px;
      border-radius: 12px;
    }

    /* ── FOOTER ── */
    .footer {
      background: #2B2D42;
      border-radius: 0 0 20px 20px;
      padding: 28px 48px;
      text-align: center;
    }

    .footer-logo {
      font-family: 'DM Serif Display', Georgia, serif;
      font-size: 18px;
      color: #ffffff;
      margin-bottom: 8px;
    }

    .footer-logo span { color: #E27921; }

    .footer p {
      font-size: 11px;
      color: #6B7380;
      line-height: 1.7;
    }

    .footer a {
      color: #9BA3AF;
      text-decoration: none;
    }

    .footer-divider {
      width: 40px;
      height: 2px;
      background: #E27921;
      margin: 14px auto;
      border-radius: 2px;
    }

    /* PREVIEW VARIABLE INJECTION (para demostración) */
    .var-name { /* reemplazar con el valor real desde el backend */ }
  </style>
</head>
<body>

<div class="email-wrapper">

  <!-- HEADER -->
  <div class="header">
    <div class="header-decoration"></div>
    <div class="header-decoration-2"></div>
    <div class="header-inner">

      <div class="logo-row">
        <div class="logo-icon">
          <!-- Ícono de brújula / avión simplificado en SVG inline -->
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13l1 4h4l-3.28 2.39L14 18l-2-3-2 3 1.28-4.61L8 11h4l1-4z" fill="white"/>
          </svg>
        </div>
        <span class="logo-text">Trip<span>GO</span></span>
      </div>

      <div class="badge">
        <span class="badge-dot"></span>
        Nuevo negocio interesado
      </div>

      <h1>¡Un negocio quiere<br>unirse a <em>TripGO</em>!</h1>

    </div>
  </div>

  <!-- ALERT BAND -->
  <div class="alert-band">
    <!-- SVG campana -->
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6V11c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
    </svg>
    <p>Se recibió una solicitud de contacto — Responde dentro de las próximas 24 hs</p>
  </div>

  <!-- BODY -->
  <div class="body-section">

    <div class="section-label">Datos del negocio</div>

    <div class="data-grid">
      <div class="data-card">
        <div class="card-label">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#9BA3AF"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          Nombre del negocio
        </div>
        <div class="card-value">${s(name)}</div>
      </div>

      <div class="data-card">
        <div class="card-label">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#9BA3AF"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          Correo electrónico
        </div>
        <a href="mailto:${s(email)}" class="card-value email-value">${s(email)}</a>
      </div>

      <div class="data-card full-width">
        <div class="card-label">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#9BA3AF"><path d="M21 6.5l-1.5-1.5-7 7-3.5-3.5L7.5 10l4 4 9.5-7.5z"/></svg>
          Descripción del negocio
        </div>
        <div class="message-box">
          <p>${s(message)}</p>
        </div>
      </div>
    </div>

    <!-- TIMESTAMP -->
    <div class="meta-row">
      <p>📅 Recibido el <strong>${s(dateTime)}</strong></p>
      <p>Desde <strong>tripgo.app/contacto</strong></p>
    </div>

  </div>

  <!-- CTA -->
  <div class="cta-section">
    <p>Recuerda revisar la solicitud y contactar al negocio<br>para iniciar el proceso de incorporación a TripGO.</p>
    <a href="mailto:${s(email)}" class="cta-btn">✉ Responder ahora</a>
    <a href="#" class="cta-btn-secondary">Ver panel admin</a>
  </div>

  <!-- FOOTER -->
  <div class="footer">
    <div class="footer-logo">Trip<span>GO</span></div>
    <div class="footer-divider"></div>
    <p>
      Este correo fue generado automáticamente por el formulario de contacto de TripGO.<br>
      <a href="#">Política de privacidad</a> · <a href="#">Soporte</a> · <a href="#">tripgo.app</a>
    </p>
    <br>
    <p style="font-size:10px; color:#444755;">© 2025 TripGO. Todos los derechos reservados.</p>
  </div>

</div>

</body>
</html>`;
}

/** Escapa caracteres HTML para prevenir XSS en el cuerpo del correo */
function escapeHtml(str = "") {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

module.exports = { buildContactEmailHtml };