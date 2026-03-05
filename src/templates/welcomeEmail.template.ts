/**
 * Genera el HTML del correo de bienvenida para el negocio aceptado en TripGO.
 * @param {{
 *   businessName: string,
 *   contactName:  string,
 *   email:        string,
 *   description:  string,
 *   credEmail:    string,
 *   credPassword: string,
 *   businessId:   string,
 *   dateTime:     string
 * }} data
 * @returns {string} HTML completo del correo
 */
function buildWelcomeEmailHtml({
    businessName,
    contactName,
    email,
    description,
    credEmail,
    credPassword,
    businessId,
    dateTime,
}) {
    const s = escapeHtml;

    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>¡Bienvenido a TripGO, ${s(businessName)}!</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#E8F0F1;font-family:'DM Sans',-apple-system,sans-serif;-webkit-font-smoothing:antialiased}
    .wrap{max-width:640px;margin:40px auto}
    /* Header */
    .hdr{background:linear-gradient(145deg,#0A4A53,#0E6973 45%,#1A8E9C);border-radius:24px 24px 0 0;overflow:hidden;position:relative}
    .dc1{position:absolute;top:-80px;right:-80px;width:320px;height:320px;border-radius:50%;background:rgba(226,121,33,.10)}
    .dc2{position:absolute;bottom:-100px;left:-60px;width:260px;height:260px;border-radius:50%;background:rgba(255,255,255,.04)}
    .dc3{position:absolute;top:60px;right:100px;width:80px;height:80px;border-radius:50%;border:1.5px solid rgba(245,154,82,.25)}
    .hi{padding:52px 52px 44px;position:relative;z-index:2}
    .logo-row{display:flex;align-items:center;gap:10px;margin-bottom:40px}
    .logo-icon{width:40px;height:40px;background:#E27921;border-radius:11px;display:flex;align-items:center;justify-content:center}
    .logo-text{font-family:'DM Serif Display',Georgia,serif;font-size:21px;color:#fff}
    .logo-text span{color:#E27921}
    .success-ring{width:72px;height:72px;border-radius:50%;background:rgba(18,145,107,.18);border:2px solid rgba(18,145,107,.45);display:flex;align-items:center;justify-content:center;margin-bottom:24px}
    .eyebrow{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#F59A52;margin-bottom:12px}
    .hdr h1{font-family:'DM Serif Display',Georgia,serif;font-size:34px;color:#fff;line-height:1.12;letter-spacing:-.4px;font-weight:400;margin-bottom:16px}
    .hdr h1 em{color:#F59A52;font-style:italic}
    .hdr-sub{font-size:14px;color:rgba(255,255,255,.70);line-height:1.65;max-width:420px;font-weight:300}
    /* Stats bar */
    .stats{background:#0A4A53;padding:20px 52px;display:flex}
    .stat{flex:1;text-align:center;padding:4px 0;border-right:1px solid rgba(255,255,255,.10)}
    .stat:last-child{border-right:none}
    .stat-n{font-family:'DM Serif Display',Georgia,serif;font-size:22px;color:#F59A52;line-height:1;margin-bottom:4px}
    .stat-l{font-size:10px;color:rgba(255,255,255,.45);letter-spacing:.8px;text-transform:uppercase}
    /* Body */
    .body{background:#fff;padding:48px 52px 36px}
    .sl{font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0E6973;margin-bottom:18px;display:flex;align-items:center;gap:8px}
    .sl::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,rgba(14,105,115,.25),transparent)}
    /* Greeting */
    .greet{background:linear-gradient(135deg,#F0FAFB,#EBF6F7);border:1px solid #D0EDF0;border-radius:16px;padding:24px 28px;margin-bottom:32px}
    .greet p{font-size:15px;color:#2B2D42;line-height:1.7;font-weight:300}
    .greet p strong{color:#0E6973;font-weight:600}
    /* Biz cards */
    .grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:36px}
    .card{background:#F8F9FA;border:1px solid #E8EAED;border-radius:14px;padding:16px 20px}
    .card.full{grid-column:1/-1}
    .cl{font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#9BA3AF;margin-bottom:6px}
    .cv{font-size:14px;font-weight:500;color:#2B2D42;line-height:1.45}
    .cv.hi-v{color:#0E6973;font-weight:600}
    .biz-desc{font-size:13.5px;color:#555E72;line-height:1.7;font-weight:300;font-style:italic;padding:12px 0 0;border-top:1px solid #E8EAED}
    /* Credentials */
    .cred-card{background:linear-gradient(145deg,#0A4A53,#0E6973);border-radius:20px;padding:32px 36px;position:relative;overflow:hidden;margin-bottom:36px}
    .cr-d1{position:absolute;top:-40px;right:-40px;width:180px;height:180px;border-radius:50%;background:rgba(226,121,33,.12)}
    .cr-d2{position:absolute;bottom:-50px;left:20px;width:130px;height:130px;border-radius:50%;background:rgba(255,255,255,.04)}
    .cred-hdr{display:flex;align-items:center;gap:12px;margin-bottom:28px;position:relative;z-index:2}
    .cred-ico{width:40px;height:40px;background:rgba(226,121,33,.25);border:1px solid rgba(226,121,33,.40);border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
    .cred-title{font-family:'DM Serif Display',Georgia,serif;font-size:18px;color:#fff;font-weight:400}
    .cred-sub{font-size:12px;color:rgba(255,255,255,.50);margin-top:2px}
    .cred-fields{display:flex;flex-direction:column;gap:14px;position:relative;z-index:2}
    .cred-field{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:14px 20px;display:flex;align-items:center;justify-content:space-between;gap:12px}
    .cf-left{display:flex;align-items:center;gap:10px}
    .cf-icon{width:32px;height:32px;background:rgba(255,255,255,.10);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
    .cf-label{font-size:10px;text-transform:uppercase;letter-spacing:1.2px;color:rgba(255,255,255,.45);margin-bottom:3px;font-weight:600}
    .cf-value{font-size:15px;color:#fff;font-weight:600}
    .cf-value.pwd{font-family:'Courier New',monospace;color:#F59A52;letter-spacing:2px;font-size:14px}
    .cred-warn{display:flex;align-items:flex-start;gap:10px;margin-top:20px;padding:14px 18px;background:rgba(226,121,33,.15);border:1px solid rgba(226,121,33,.30);border-radius:10px;position:relative;z-index:2}
    .cred-warn p{font-size:12px;color:#F59A52;line-height:1.55}
    .cred-warn p strong{font-weight:700}
    /* Steps */
    .steps{display:flex;flex-direction:column;gap:12px;margin-bottom:36px}
    .step{display:flex;align-items:flex-start;gap:14px;padding:16px 20px;background:#F8F9FA;border:1px solid #E8EAED;border-radius:14px}
    .step-n{width:28px;height:28px;background:#0E6973;color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0;margin-top:1px}
    .step-t{font-size:13px;font-weight:600;color:#2B2D42;margin-bottom:3px}
    .step-d{font-size:12.5px;color:#6B7280;line-height:1.55;font-weight:300}
    /* Meta */
    .meta{display:flex;align-items:center;justify-content:space-between;padding-top:20px;border-top:1px solid #F0F0F0}
    .meta p{font-size:11.5px;color:#B0B7C3}
    .meta strong{color:#6B7280}
    /* CTA */
    .cta{background:#F0FAFB;border-top:1px solid #D0EDF0;padding:36px 52px;text-align:center}
    .cta-ey{font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#0E6973;margin-bottom:10px}
    .cta p{font-size:14px;color:#555E72;margin-bottom:24px;line-height:1.6;font-weight:300}
    .btn-main{display:inline-block;background:linear-gradient(135deg,#E27921,#F0903A);color:#fff;text-decoration:none;font-size:14px;font-weight:700;letter-spacing:.4px;padding:15px 36px;border-radius:13px;box-shadow:0 6px 20px rgba(226,121,33,.40)}
    .btn-sec{display:block;font-size:12.5px;color:#0E6973;text-decoration:none;font-weight:500;margin-top:12px}
    /* Footer */
    .ftr{background:#1A1C2E;border-radius:0 0 24px 24px;padding:32px 52px;text-align:center}
    .fl{font-family:'DM Serif Display',Georgia,serif;font-size:19px;color:#fff;margin-bottom:4px}
    .fl span{color:#E27921}
    .ftag{font-size:11px;color:rgba(255,255,255,.30);letter-spacing:.5px;margin-bottom:16px}
    .fd{width:36px;height:2px;background:#E27921;margin:14px auto;border-radius:2px}
    .ftr p{font-size:11px;color:#444755;line-height:1.8}
    .ftr a{color:#6B7380;text-decoration:none}

    
  </style>
</head>
<body>
<div class="wrap">

  <div class="hdr">
    <div class="dc1"></div><div class="dc2"></div><div class="dc3"></div>
    <div class="hi">
      <div class="logo-row">
        <div class="logo-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13l1 4h4l-3.28 2.39L14 18l-2-3-2 3 1.28-4.61L8 11h4l1-4z" fill="white"/>
          </svg>
        </div>
        <span class="logo-text">Trip<span>GO</span></span>
      </div>
      <div class="success-ring">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
          <path d="M9 12l2 2 4-4" stroke="#12916B" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="12" cy="12" r="9" stroke="#12916B" stroke-width="1.5"/>
        </svg>
      </div>
      <div class="eyebrow">¡Solicitud aprobada!</div>
      <h1>Bienvenido a la<br>familia <em>TripGO</em>,<br>${s(businessName)}</h1>
      <p class="hdr-sub">Tu negocio fue revisado y aprobado. Ahora formas parte de la red que conecta viajeros con los mejores lugares del Quindío.</p>
    </div>
  </div>

  <div class="stats">
    <div class="stat"><div class="stat-n">+2.4K</div><div class="stat-l">Viajeros activos</div></div>
    <div class="stat"><div class="stat-n">140+</div><div class="stat-l">Negocios aliados</div></div>
    <div class="stat"><div class="stat-n">4.8★</div><div class="stat-l">Rating promedio</div></div>
  </div>

  <div class="body">

    <div class="greet">
      <p>Hola, <strong>${s(contactName || businessName)}</strong> 👋<br>
      Revisamos tu solicitud y nos alegra decirte que <strong>${s(businessName)}</strong> ya es parte de TripGO.
      A continuación encontrarás el resumen de tus datos registrados y tus credenciales de acceso.</p>
    </div>

    <div class="sl">Tu perfil en TripGO</div>
    <div class="grid">
      <div class="card">
        <div class="cl">Nombre registrado</div>
        <div class="cv hi-v">${s(businessName)}</div>
      </div>
      <div class="card">
        <div class="cl">Correo de contacto</div>
        <div class="cv">${s(email)}</div>
      </div>
      <div class="card full">
        <div class="cl">Descripción registrada</div>
        <p class="biz-desc">"${s(description)}"</p>
      </div>
    </div>

    <div class="sl">Tus credenciales de acceso</div>
    <div class="cred-card">
      <div class="cr-d1"></div><div class="cr-d2"></div>
      <div class="cred-hdr">
        <div class="cred-ico">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#F59A52">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
          </svg>
        </div>
        <div>
          <div class="cred-title">Acceso al Panel de Empresa</div>
          <div class="cred-sub">Ingresa en tripgo.app con estas credenciales</div>
        </div>
      </div>
      <div class="cred-fields">
        <div class="cred-field">
          <div class="cf-left">
            <div class="cf-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.6)"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            </div>
            <div>
              <div class="cf-label">Usuario / Email</div>
              <div class="cf-value">${s(credEmail)}</div>
            </div>
          </div>
        </div>
        <div class="cred-field">
          <div class="cf-left">
            <div class="cf-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.6)"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
            </div>
            <div>
              <div class="cf-label">Contraseña temporal</div>
              <div class="cf-value pwd">${s(credPassword)}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="cred-warn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#F59A52" style="flex-shrink:0;margin-top:1px"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
        <p><strong>Importante:</strong> Cambia esta contraseña en tu primer inicio de sesión. No la compartas con terceros.</p>
      </div>
    </div>

    <div class="sl">¿Qué sigue ahora?</div>
    <div class="steps">
      <div class="step">
        <div class="step-n">1</div>
        <div><div class="step-t">Ingresa al panel de empresa</div><div class="step-d">Usa tus credenciales en tripgo.app/empresa. Allí encontrarás tu perfil, estadísticas y configuración.</div></div>
      </div>
      <div class="step">
        <div class="step-n">2</div>
        <div><div class="step-t">Completa tu perfil de negocio</div><div class="step-d">Agrega fotos, horarios, categorías y descripción para que los viajeros te encuentren.</div></div>
      </div>
      <div class="step">
        <div class="step-n">3</div>
        <div><div class="step-t">Activa tu primera oferta</div><div class="step-d">Los negocios con ofertas activas reciben hasta 3× más visitas en su primera semana.</div></div>
      </div>
    </div>

    <div class="meta">
      <p>✅ Aprobado el <strong>${s(dateTime)}</strong></p>
      <p>ID de negocio: <strong>#${s(businessId)}</strong></p>
    </div>
  </div>

  <div class="cta">
    <div class="cta-ey">Listo para comenzar</div>
    <p>Tu panel de gestión está listo.<br>Inicia sesión y dale vida a tu negocio en TripGO.</p>
    <a href="https://tripgo.app/empresa" class="btn-main">→ Ingresar al Panel de Empresa</a>
    <a href="https://tripgo.app/soporte" class="btn-sec">¿Necesitas ayuda? Contacta a nuestro equipo →</a>
  </div>

  <div class="ftr">
    <div class="fl">Trip<span>GO</span></div>
    <div class="ftag">Conectando viajeros con experiencias reales</div>
    <div class="fd"></div>
    <p>Este correo fue enviado a <strong style="color:#6B7380">${s(email)}</strong> porque registraste tu negocio en TripGO.<br>
    <a href="#">Política de privacidad</a> · <a href="#">Soporte</a> · <a href="#">tripgo.app</a></p>
    <br>
    <p style="font-size:10px;color:#333645">© 2025 TripGO. Todos los derechos reservados.</p>
  </div>

</div>
</body>
</html>`;
}

function escapeHtml(str = "") {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

module.exports = { buildWelcomeEmailHtml };