const nodemailer = require("nodemailer");
const { buildContactEmailHtml } = require("../templates/contactEmail.template");

// ─── Transporter ───────────────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        // ⚠️ IMPORTANTE: debe ser las 16 letras del App Password SIN espacios
        // Correcto:   abcdefghijklmnop
        // Incorrecto: abcd efgh ijkl mnop
        pass: process.env.MAIL_PASSWORD,
    },
});

// ─── Verify al arrancar el servidor ───────────────────────────────────────────
// Esto detecta problemas de credenciales ANTES de que llegue el primer correo.
// Verás el resultado en consola al iniciar el servidor con `npm run dev`.
transporter.verify((error, success) => {
    if (error) {
        console.error("❌ [emailService] Fallo de conexión con Gmail:");
        console.error("   →", error.message);
        console.error("   Verifica MAIL_USER y MAIL_PASSWORD en tu .env");
        console.error("   App Password debe ser 16 caracteres sin espacios.");
    } else {
        console.log("✅ [emailService] Conexión con Gmail OK — listo para enviar correos");
    }
});

// ─── Función principal ────────────────────────────────────────────────────────
/**
 * Envía el correo de alerta al equipo TripGO.
 * @param {{ name: string, email: string, message: string }} data
 */
async function sendContactEmail({ name, email, message }) {
    console.log(`📧 [emailService] Preparando correo | negocio: "${name}" | email: ${email}`);

    // Fecha formateada en español / zona Colombia
    const dateTime = new Intl.DateTimeFormat("es-CO", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "America/Bogota",
    }).format(new Date());

    const htmlBody = buildContactEmailHtml({ name, email, message, dateTime });

    const mailOptions = {
        from: `"TripGO App" <${process.env.MAIL_USER}>`,
        to: process.env.MAIL_RECIPIENT,
        replyTo: email,
        subject: `🔔 Nuevo negocio interesado: ${name}`,
        html: htmlBody,
        text: [
            "NUEVO NEGOCIO INTERESADO - TRIPGO",
            "─────────────────────────────────",
            `Negocio : ${name}`,
            `Email   : ${email}`,
            `Mensaje : ${message}`,
            `Fecha   : ${dateTime}`,
        ].join("\n"),
    };

    // Validación de variables de entorno antes de intentar enviar
    if (!process.env.MAIL_USER || !process.env.MAIL_PASSWORD) {
        const err = new Error("MAIL_USER o MAIL_PASSWORD no están definidos en .env");
        console.error("❌ [emailService]", err.message);
        throw err;
    }

    if (!process.env.MAIL_RECIPIENT) {
        const err = new Error("MAIL_RECIPIENT no está definido en .env");
        console.error("❌ [emailService]", err.message);
        throw err;
    }

    try {
        const info = await transporter.sendMail(mailOptions);
        // messageId confirma que Gmail aceptó el correo
        console.log(`✅ [emailService] Correo aceptado por Gmail`);
        console.log(`   messageId : ${info.messageId}`);
        console.log(`   para      : ${process.env.MAIL_RECIPIENT}`);
        return info;
    } catch (error) {
        // Acá caerás si el App Password está mal, si Gmail bloqueó el intento, etc.
        console.error("❌ [emailService] Error al enviar con Nodemailer:");
        console.error("   código  :", error.code);
        console.error("   mensaje :", error.message);
        throw error; // propaga al errorHandler de Express
    }
}

module.exports = { sendContactEmail };