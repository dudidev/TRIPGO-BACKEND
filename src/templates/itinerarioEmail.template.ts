// src/templates/itinerarioEmail.template.ts

type ItinerarioItem = {
    nombre: string;
    direccion?: string;
    imagenUrl?: string;
};

function buildItemRow(item: ItinerarioItem, index: number): string {
    const num = String(index + 1).padStart(2, "0");

    const imgBlock = item.imagenUrl
        ? `<img class="item-img" src="${item.imagenUrl}" alt="${item.nombre}" />`
        : `<div class="item-img-placeholder">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="rgba(255,255,255,0.75)"/>
        </svg>
      </div>`;

    const addressBlock = item.direccion
        ? `<div class="item-address">${item.direccion}</div>`
        : "";

    return `
    <div class="item-card">
      <div class="item-num">${num}</div>
      ${imgBlock}
      <div class="item-info">
        <div class="item-name">${item.nombre}</div>
        ${addressBlock}
      </div>
      <div class="item-dot"></div>
    </div>`;
}

function buildItinerarioEmailHtml({
    nombreUsuario,
    items,
    dateTime,
}: {
    nombreUsuario: string;
    items: ItinerarioItem[];
    dateTime: string;
}): string {
    const itemsHtml = items.map((item, i) => buildItemRow(item, i)).join("\n");
    const total = items.length;

    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tu itinerario TripGO</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background-color: #F2EFEA;
      font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper { max-width: 600px; margin: 40px auto; }

    /* HEADER */
    .header {
      background: #0C1B1F;
      border-radius: 20px 20px 0 0;
      padding: 44px 48px 40px;
      position: relative;
      overflow: hidden;
    }
    .header::before {
      content: '';
      position: absolute;
      top: -40px; right: -40px;
      width: 220px; height: 220px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(226,121,33,0.18) 0%, transparent 70%);
    }
    .header::after {
      content: '';
      position: absolute;
      bottom: 20px; left: -30px;
      width: 140px; height: 140px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(14,105,115,0.25) 0%, transparent 70%);
    }
    .logo-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 32px;
      position: relative;
      z-index: 2;
    }
    .logo-icon {
      width: 36px; height: 36px;
      background: #E27921;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .logo-text {
      font-family: 'DM Serif Display', Georgia, serif;
      font-size: 20px;
      color: #fff;
    }
    .logo-text span { color: #E27921; }
    .header-eyebrow {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: #E27921;
      margin-bottom: 12px;
      position: relative;
      z-index: 2;
    }
    .header h1 {
      font-family: 'DM Serif Display', Georgia, serif;
      font-size: 30px;
      color: #fff;
      font-weight: 400;
      line-height: 1.2;
      position: relative;
      z-index: 2;
    }
    .header h1 em { color: #F59A52; font-style: italic; }
    .header-sub {
      font-size: 13px;
      color: rgba(255,255,255,0.4);
      margin-top: 10px;
      font-weight: 300;
      position: relative;
      z-index: 2;
    }

    /* BODY */
    .body { background: #fff; padding: 40px 48px; }
    .greeting {
      font-size: 15px;
      color: #3D4148;
      line-height: 1.65;
      font-weight: 300;
      margin-bottom: 32px;
      padding-bottom: 28px;
      border-bottom: 1px solid #F0F0F0;
    }
    .greeting strong { font-weight: 600; color: #0C1B1F; }
    .section-label {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: #0E6973;
      margin-bottom: 18px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .section-label::after {
      content: '';
      flex: 1;
      height: 1px;
      background: linear-gradient(90deg, #0E697325, transparent);
    }

    /* SUMMARY */
    .summary-box {
      background: #0C1B1F;
      border-radius: 14px;
      padding: 20px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 32px;
    }
    .summary-stat { text-align: center; }
    .summary-val {
      font-family: 'DM Serif Display', Georgia, serif;
      font-size: 28px;
      color: #F59A52;
      line-height: 1;
    }
    .summary-val-sm {
      font-size: 12px;
      color: rgba(255,255,255,0.45);
      font-family: 'DM Sans', sans-serif;
      font-weight: 300;
      padding-top: 6px;
      line-height: 1.4;
    }
    .summary-lbl {
      font-size: 10px;
      color: rgba(255,255,255,0.35);
      font-weight: 500;
      letter-spacing: 0.8px;
      margin-top: 4px;
    }
    .summary-divider {
      width: 1px;
      height: 40px;
      background: rgba(255,255,255,0.07);
    }

    /* ITEMS */
    .item-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 32px;
    }
    .item-card {
      display: flex;
      align-items: center;
      gap: 14px;
      background: #F9F8F6;
      border: 1px solid #ECEAE6;
      border-radius: 14px;
      padding: 14px 18px;
    }
    .item-num {
      font-family: 'DM Serif Display', Georgia, serif;
      font-size: 24px;
      color: #E0DDD7;
      min-width: 26px;
      text-align: center;
      line-height: 1;
    }
    .item-img {
      width: 54px;
      height: 54px;
      border-radius: 10px;
      object-fit: cover;
      flex-shrink: 0;
    }
    .item-img-placeholder {
      width: 54px;
      height: 54px;
      border-radius: 10px;
      flex-shrink: 0;
      background: linear-gradient(135deg, #0E6973, #117A87);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .item-info { flex: 1; min-width: 0; }
    .item-name {
      font-size: 14px;
      font-weight: 600;
      color: #0C1B1F;
      margin-bottom: 3px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .item-address {
      font-size: 12px;
      color: #9BA3AF;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .item-dot {
      width: 7px; height: 7px;
      border-radius: 50%;
      background: #E27921;
      flex-shrink: 0;
      opacity: 0.35;
    }

    /* NOTE */
    .note {
      background: #FFF8F0;
      border-left: 3px solid #E27921;
      border-radius: 0 10px 10px 0;
      padding: 14px 18px;
      font-size: 13px;
      color: #6B5A45;
      line-height: 1.65;
      font-weight: 300;
    }

    /* CTA */
    .cta-section {
      background: #F9F8F6;
      border-top: 1px solid #ECEAE6;
      padding: 32px 48px;
      text-align: center;
    }
    .cta-section p { font-size: 13px; color: #9BA3AF; margin-bottom: 20px; line-height: 1.6; }
    .cta-btn {
      display: inline-block;
      background: #E27921;
      color: #fff;
      text-decoration: none;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.4px;
      padding: 13px 28px;
      border-radius: 10px;
    }

    /* FOOTER */
    .footer {
      background: #0C1B1F;
      border-radius: 0 0 20px 20px;
      padding: 24px 48px;
      text-align: center;
    }
    .footer-logo {
      font-family: 'DM Serif Display', Georgia, serif;
      font-size: 16px;
      color: rgba(255,255,255,0.5);
      margin-bottom: 10px;
    }
    .footer-logo span { color: #E27921; }
    .footer-line { width: 32px; height: 1px; background: #E27921; margin: 12px auto; opacity: 0.4; }
    .footer p { font-size: 11px; color: rgba(255,255,255,0.2); line-height: 1.7; }
    .footer a { color: rgba(255,255,255,0.3); text-decoration: none; }
  </style>
</head>
<body>
<div class="wrapper">

  <div class="header">
    <div class="logo-row">
      <div class="logo-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="white"/>
          <path d="M16.24 7.76C15.07 6.59 13.54 6 12 6v6l-4.24 4.24c2.34 2.34 6.14 2.34 8.49 0 2.34-2.34 2.34-6.14-.01-8.48z" fill="white"/>
        </svg>
      </div>
      <span class="logo-text">Trip<span>GO</span></span>
    </div>
    <div class="header-eyebrow">Tu itinerario</div>
    <h1>Todo listo,<br><em>${nombreUsuario}</em> 🗺️</h1>
    <p class="header-sub">Aquí tienes el resumen de los lugares que elegiste</p>
  </div>

  <div class="body">
    <p class="greeting">
      Hola <strong>${nombreUsuario}</strong>, preparamos tu itinerario personalizado con los lugares que seleccionaste en TripGO. Guarda este correo como referencia para tu próxima aventura.
    </p>

    <div class="summary-box">
      <div class="summary-stat">
        <div class="summary-val">${total}</div>
        <div class="summary-lbl">${total === 1 ? "Lugar" : "Lugares"}</div>
      </div>
      <div class="summary-divider"></div>
      <div class="summary-stat">
        <div class="summary-val-sm">${dateTime}</div>
        <div class="summary-lbl">Creado el</div>
      </div>
      <div class="summary-divider"></div>
      <div class="summary-stat">
        <div class="summary-val" style="font-size:13px; color:#4ADE80; font-family:'DM Sans',sans-serif; font-weight:600; padding-top:6px;">Activo</div>
        <div class="summary-lbl">Estado</div>
      </div>
    </div>

    <div class="section-label">Lugares seleccionados</div>

    <div class="item-list">
      ${itemsHtml}
    </div>

    <div class="note">
      💡 Los establecimientos serán notificados de tu interés. Pronto podrías recibir confirmaciones y detalles adicionales de cada lugar directamente en tu correo.
    </div>
  </div>

  <div class="cta-section">
    <p>¿Quieres explorar más destinos o ajustar tu itinerario?</p>
    <a href="https://tripgoquindio.vercel.app/principal" class="cta-btn">Volver a TripGO</a>
  </div>

  <div class="footer">
    <div class="footer-logo">Trip<span>GO</span></div>
    <div class="footer-line"></div>
    <p>
      Este correo fue enviado porque confirmaste un itinerario en TripGO.<br>
      <a href="#">Política de privacidad</a> · <a href="#">Soporte</a> · <a href="#">tripgo.app</a>
    </p>
    <br>
    <p style="font-size:10px; opacity:0.12;">© 2025 TripGO · Todos los derechos reservados.</p>
  </div>

</div>
</body>
</html>`;
}

module.exports = {buildItinerarioEmailHtml}