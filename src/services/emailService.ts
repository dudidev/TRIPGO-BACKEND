const nodemailer = require("nodemailer");
const { buildContactEmailHtml } = require("../templates/contactEmail.template");
const { buildWelcomeEmailHtml } = require("../templates/welcomeEmail.template");

// ─── Transporter ──────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD, // 16 chars sin espacios
    },
});

// Verifica la conexión al arrancar el servidor
transporter.verify((error) => {
    if (error) {
        console.error(" [emailService] Fallo de conexión con Gmail:", error.message);
    } else {
        console.log(" [emailService] Conexión con Gmail OK");
    }
});

// ─── Helpers internos ─────────────────────────────────────────────────────────
function checkEnvVars(...keys) {
    keys.forEach((key) => {
        if (!process.env[key]) {
            throw new Error(`Variable de entorno requerida no definida: ${key}`);
        }
    });
}

function getFormattedDate() {
    return new Intl.DateTimeFormat("es-CO", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "America/Bogota",
    }).format(new Date());
}

function generateBusinessEmail(businessName) {
    if (!businessName) throw new Error("businessName es requerido");

    // Quita tildes
    const normalized = businessName
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    // Quita caracteres especiales y espacios
    const clean = normalized
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "");

    return `${clean}@tripgo.com`;
}

// ─── sendContactEmail ─────────────────────────────────────────────────────────
/**
 * Alerta interna: avisa al equipo TripGO que un negocio completó el formulario.
 * Destino: MAIL_RECIPIENT (correo interno de TripGO)
 */
async function sendContactEmail({ name, email, message }) {
    checkEnvVars("MAIL_USER", "MAIL_PASSWORD", "MAIL_RECIPIENT");

    console.log(`📧 [emailService] Alerta interna | negocio: "${name}"`);

    const dateTime = getFormattedDate();
    const html = buildContactEmailHtml({ name, email, message, dateTime });

    const info = await transporter.sendMail({
        from: `"TripGO App" <${process.env.MAIL_USER}>`,
        to: process.env.MAIL_RECIPIENT,
        replyTo: email,
        subject: `🔔 Nuevo negocio interesado: ${name}`,
        html,
        text: `Negocio: ${name}\nEmail: ${email}\nMensaje: ${message}\nFecha: ${dateTime}`,
    });

    console.log(`✅ [emailService] Alerta enviada | messageId: ${info.messageId}`);
    return info;
}

// ─── sendWelcomeEmail ─────────────────────────────────────────────────────────
/**
 * Correo de bienvenida: confirma la aceptación y entrega las credenciales al negocio.
 * Destino: email del negocio (quien llenó el formulario)
 *
 * @param {{
 *   businessName: string,   // nombre del negocio
 *   contactName:  string,   // nombre del contacto (opcional)
 *   email:        string,   // correo del negocio — AQUÍ se envía
 *   description:  string,   // descripción que ingresó en el form
 *   credPassword: string,   // contraseña temporal generada
 *   businessId:   string,   // ID del registro en tu BD
 * }} data
 */
async function sendWelcomeEmail({
    businessName,
    contactName,
    email,
    description,
    credPassword,
    businessId,
}) {
    checkEnvVars("MAIL_USER", "MAIL_PASSWORD");

    const credEmail = generateBusinessEmail(businessName);

    console.log(`🎉 [emailService] Bienvenida | negocio: "${businessName}" | para: ${email}`);

    const dateTime = getFormattedDate();
    const html = buildWelcomeEmailHtml({
        businessName,
        contactName,
        email,
        description,
        credEmail,
        credPassword,
        businessId,
        dateTime,
    });

    const info = await transporter.sendMail({
        from: `"TripGO" <${process.env.MAIL_USER}>`,
        to: email,   // ← va al correo del negocio
        subject: `🎉 ¡Bienvenido a TripGO, ${businessName}!`,
        html,
        text: [
            `¡Bienvenido a TripGO, ${businessName}!`,
            `Tu negocio fue aprobado. Estas son tus credenciales de acceso:`,
            `Email:      ${credEmail}`,
            `Contraseña: ${credPassword}`,
            `Ingresa en: https://tripgoquindio.vercel.app/login`,
            `ID de negocio: #${businessId}`,
            `Aprobado el: ${dateTime}`,
        ].join("\n"),
    });

    console.log(`✅ [emailService] Bienvenida enviada | messageId: ${info.messageId}`);
    return info;
}

module.exports = { sendContactEmail, sendWelcomeEmail };