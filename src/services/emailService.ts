import nodemailer from "nodemailer";
import buildContactEmailHtml from "../templates/contactEmail.template.js";
import buildWelcomeEmailHtml from "../templates/welcomeEmail.template.js";
import buildItinerarioEmailHtml from "../templates/itinerarioEmail.template.js";
import welcomeUserEmail from "../templates/welcomeUserEmail.template.js";

// ─── Transporter ──────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
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
function checkEnvVars(...keys: string[]
) {
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

function generateBusinessEmail(businessName: string) {
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
async function sendContactEmail({ name, email, message }: { name: string; email: string; message: string }) {
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
} : {
    businessName: string,
    contactName:  string,
    email:        string,
    description:  string,
    credPassword: string,
    businessId:   string,
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

const sendUserWelcomeEmail = async (email: string, nombre: string) => {
    const htmlContent = welcomeUserEmail(nombre);

    await transporter.sendMail({
        from: `"TripGO - Bienvenida" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "🎉 ¡Bienvenido a TripGO! Tu aventura comienza ahora",
        html: htmlContent
    });

    console.log(`✅ Email de bienvenida enviado a: ${email}`);
    // No lanzamos error para que no falle el registro si falla el email
}

// ─── sendItinerarioEmail ───────────────────────────────────────────────────────
/**
 * Envía el resumen del itinerario al correo del usuario turista.
 *
 * @param {{
 *   email:  string,                          // correo del usuario autenticado
 *   nombre: string,                          // nombre del usuario
 *   items:  Array<{                          // lugares seleccionados
 *     nombre:     string,
 *     direccion?: string,
 *     imagenUrl?: string,
 *   }>
 * }} data
 */
async function sendItinerarioEmail({ email, nombre, items }: { email: string; nombre: string; items: Array<{ nombre: string; direccion?: string; imagenUrl?: string }> }) {
    checkEnvVars("MAIL_USER", "MAIL_PASSWORD");

    console.log(`🗺️  [emailService] Itinerario | usuario: "${nombre}" | destino: ${email} | lugares: ${items.length}`);

    const dateTime = getFormattedDate();
    const html = buildItinerarioEmailHtml({ nombreUsuario: nombre, items, dateTime });

    const info = await transporter.sendMail({
        from: `"TripGO" <${process.env.MAIL_USER}>`,
        to: email,
        subject: `🗺️ Tu itinerario en TripGO está listo`,
        html,
        text: [
            `Hola ${nombre}, aquí está tu itinerario de TripGO:`,
            "",
            ...items.map((item, i) => `${i + 1}. ${item.nombre}${item.direccion ? ` — ${item.direccion}` : ""}`),
            "",
            `Creado el: ${dateTime}`,
            `Visita: https://tripgoquindio.vercel.app/principal`,
        ].join("\n"),
    });

    console.log(`✅ [emailService] Itinerario enviado | messageId: ${info.messageId}`);
    return info;
}


export { sendContactEmail, sendWelcomeEmail, sendUserWelcomeEmail, sendItinerarioEmail };