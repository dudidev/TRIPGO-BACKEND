import { Resend } from "resend";

// ─── Templates ────────────────────────────────────────────────────────────────
import buildContactEmailHtml from "../templates/contactEmail.template.js";
import buildWelcomeEmailHtml from "../templates/welcomeEmail.template.js";
import buildItinerarioEmailHtml from "../templates/itinerarioEmail.template.js";
import welcomeUserEmail from "../templates/welcomeUserEmail.template.js";
import passwordResetEmailTemplate from "../templates/passwordResetEmail.tmeplate.js";
import soporteEmailToTeamTemplate from "../templates/soporteEmailToTeam.template.js";
import soporteEmailToUserTemplate from "../templates/soporteEmailToUser.template.js";
import verificationCodeEmailTemplate from "../templates/verificationCodeEmail.template.js";

// ─── Cliente Resend ───────────────────────────────────────────────────────────
const resend = new Resend(process.env.RESEND_API_KEY);

// ─── Constantes de entorno ───────────────────────────────────────────────────
const FROM = process.env.MAIL_FROM ?? "TripGO <noreply@tripgoapp.com>";
const REPLY_TO = process.env.MAIL_REPLY_TO ?? "tripgoservice@gmail.com";
const RECIPIENT = process.env.MAIL_RECIPIENT ?? "tripgoservice@gmail.com";
const FRONTEND = process.env.FRONTEND_URL ?? "https://www.tripgoapp.com";

// ─── Helper: fecha formateada ─────────────────────────────────────────────────
function getFormattedDate(): string {
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

// ─── Helper: email de credenciales para negocio ───────────────────────────────
function generateBusinessEmail(businessName: string): string {
    if (!businessName) throw new Error("businessName es requerido");
    return businessName
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "") + "@tripgoapp.com";
}

// ─── Helper: envío con fallback de log ────────────────────────────────────────
async function send(payload: {
    from: string;
    to: string | string[];
    replyTo?: string;
    subject: string;
    html: string;
    text?: string;
}): Promise<void> {
    const { data, error } = await resend.emails.send(payload);

    if (error) {
        console.error("[emailService] Error Resend:", error);
        throw new Error(`Email no enviado: ${error.message}`);
    }

    console.log("[emailService] Enviado:", data?.id, "→", payload.to);
}

// ─── sendContactEmail ─────────────────────────────────────────────────────────
/**
 * Alerta interna: avisa al equipo TripGO que un negocio completó el formulario.
 */
async function sendContactEmail({
    name,
    email,
    message,
}: {
    name: string;
    email: string;
    message: string;
}): Promise<void> {
    const dateTime = getFormattedDate();
    const html = buildContactEmailHtml({ name, email, message, dateTime });

    await send({
        from: FROM,
        to: RECIPIENT,
        replyTo: email,
        subject: `Nuevo negocio interesado: ${name}`,
        html,
        text: `Negocio: ${name}\nEmail: ${email}\nMensaje: ${message}\nFecha: ${dateTime}`,
    });
}

// ─── sendWelcomeEmail ─────────────────────────────────────────────────────────
/**
 * Bienvenida al negocio aprobado con credenciales de acceso.
 */
async function sendWelcomeEmail({
    businessName,
    contactName,
    email,
    description,
    credPassword,
    businessId,
}: {
    businessName: string;
    contactName: string;
    email: string;
    description: string;
    credPassword: string;
    businessId: string;
}): Promise<void> {
    const credEmail = generateBusinessEmail(businessName);
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

    await send({
        from: FROM,
        to: email,
        replyTo: REPLY_TO,
        subject: `¡Bienvenido a TripGO, ${businessName}!`,
        html,
        text: [
            `¡Bienvenido a TripGO, ${businessName}!`,
            `Tu negocio fue aprobado. Estas son tus credenciales:`,
            `Email:      ${credEmail}`,
            `Contraseña: ${credPassword}`,
            `Ingresa en: ${FRONTEND}/empresa`,
            `ID de negocio: #${businessId}`,
            `Aprobado el: ${dateTime}`,
        ].join("\n"),
    });
}

// ─── sendUserWelcomeEmail ─────────────────────────────────────────────────────
/**
 * Bienvenida al turista recién registrado.
 */
async function sendUserWelcomeEmail(email: string, nombre: string): Promise<void> {
    const html = welcomeUserEmail(nombre);

    await send({
        from: FROM,
        to: email,
        replyTo: REPLY_TO,
        subject: `¡Bienvenido a TripGO, ${nombre}!`,
        html,
        text: `Hola ${nombre}, bienvenido a TripGO. Ingresa en: ${FRONTEND}`,
    });
}

// ─── sendItinerarioEmail ──────────────────────────────────────────────────────
/**
 * Resumen del itinerario generado por el usuario.
 */
async function sendItinerarioEmail({
    email,
    nombre,
    items,
}: {
    email: string;
    nombre: string;
    items: Array<{
        nombre: string;
        direccion?: string;
        imagenUrl?: string;
        productos?: { nombre: string; precio: number; categoria: string }[];
    }>;
}): Promise<void> {
    const dateTime = getFormattedDate();
    const html = buildItinerarioEmailHtml({ nombreUsuario: nombre, items, dateTime });

    const textLines = items.map((item, i) => {
        const lineas = [`${i + 1}. ${item.nombre}${item.direccion ? ` — ${item.direccion}` : ""}`];
        if (item.productos?.length) {
            item.productos.forEach(p =>
                lineas.push(`   • ${p.nombre}: $${p.precio.toLocaleString("es-CO")} COP`)
            );
            const total = item.productos.reduce((acc, p) => acc + p.precio, 0);
            lineas.push(`   Total: $${total.toLocaleString("es-CO")} COP`);
        }
        return lineas.join("\n");
    });

    await send({
        from: FROM,
        to: email,
        replyTo: REPLY_TO,
        subject: `Tu itinerario en TripGO está listo`,
        html,
        text: [
            `Hola ${nombre}, aquí está tu itinerario de TripGO:`,
            "",
            ...textLines,
            "",
            `Creado el: ${dateTime}`,
            `Visita: ${FRONTEND}/principal`,
        ].join("\n"),
    });
}

// ─── sendPasswordResetEmail ───────────────────────────────────────────────────
/**
 * Enlace de recuperación de contraseña (expira en 1 hora).
 */
async function sendPasswordResetEmail(
    email: string,
    nombre: string,
    resetToken: string
): Promise<void> {
    const resetLink = `${FRONTEND}/reset-password?token=${resetToken}`;
    const html = passwordResetEmailTemplate(nombre, resetToken);

    await send({
        from: FROM,
        to: email,
        subject: `Recupera tu contraseña de TripGO`,
        html,
        text: [
            `Hola ${nombre},`,
            `Solicitaste restablecer tu contraseña de TripGO.`,
            `Usa este enlace (válido por 1 hora):`,
            resetLink,
            `Si no fuiste tú, ignora este correo.`,
        ].join("\n"),
    });
}

// ─── sendSoporteToTeam ────────────────────────────────────────────────────────
/**
 * Notificación interna: nuevo ticket de soporte recibido.
 */
async function sendSoporteToTeam(datos: {
    nombreUsuario: string;
    emailUsuario: string;
    idUsuario: number;
    categoria: string;
    prioridad: string;
    asunto: string;
    descripcion: string;
    fechaHora: string;
}): Promise<void> {
    const html = soporteEmailToTeamTemplate(datos);

    await send({
        from: FROM,
        to: RECIPIENT,
        replyTo: datos.emailUsuario,
        subject: `[Soporte] ${datos.prioridad.toUpperCase()} — ${datos.asunto}`,
        html,
        text: [
            `Usuario: ${datos.nombreUsuario} (${datos.emailUsuario})`,
            `ID: #${datos.idUsuario}`,
            `Categoría: ${datos.categoria} | Prioridad: ${datos.prioridad}`,
            `Asunto: ${datos.asunto}`,
            `Descripción: ${datos.descripcion}`,
            `Fecha: ${datos.fechaHora}`,
        ].join("\n"),
    });
}

// ─── sendSoporteToUser ────────────────────────────────────────────────────────
/**
 * Confirmación al usuario: su ticket fue recibido.
 */
async function sendSoporteToUser(datos: {
    nombreUsuario: string;
    emailUsuario: string;
    asunto: string;
    prioridad: string;
}): Promise<void> {
    const html = soporteEmailToUserTemplate({
        nombreUsuario: datos.nombreUsuario,
        asunto: datos.asunto,
        prioridad: datos.prioridad,
    });

    await send({
        from: FROM,
        to: datos.emailUsuario,
        replyTo: REPLY_TO,
        subject: `Recibimos tu solicitud de soporte — TripGO`,
        html,
        text: [
            `Hola ${datos.nombreUsuario},`,
            `Recibimos tu solicitud: "${datos.asunto}".`,
            `Te responderemos según la prioridad (${datos.prioridad}) de tu caso.`,
            `Equipo TripGO`,
        ].join("\n"),
    });
}

// ─── sendVerificationEmail ────────────────────────────────────────────────────
/**
 * Código de verificación de 6 dígitos para confirmar el correo al registrarse.
 */
async function sendVerificationEmail(email: string, nombre: string, code: string): Promise<void> {
    const html = verificationCodeEmailTemplate(nombre, code);

    await send({
        from: FROM,
        to: email,
        subject: `${code} es tu código de verificación — TripGO`,
        html,
        text: [
            `Hola ${nombre},`,
            `Tu código de verificación de TripGO es: ${code}`,
            `Válido por 15 minutos. No lo compartas con nadie.`,
            `Si no creaste una cuenta, ignora este correo.`,
        ].join("\n"),
    });
}

// ─── Exports ──────────────────────────────────────────────────────────────────
export {
    sendContactEmail,
    sendWelcomeEmail,
    sendUserWelcomeEmail,
    sendItinerarioEmail,
    sendPasswordResetEmail,
    sendSoporteToTeam,
    sendSoporteToUser,
    sendVerificationEmail,
};