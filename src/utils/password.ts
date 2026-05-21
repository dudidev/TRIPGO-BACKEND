import bcrypt from "bcrypt";

const hashPassword = async (password: string) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password: string, hash: string) => {
    return bcrypt.compare(password, hash);
};

// ─── Contraseña temporal segura para negocios aprobados ──────────────────────
// Excluye caracteres ambiguos: 0/O, 1/I/l para evitar confusiones al leer
const generateSecurePassword = (length = 12): string => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
    return Array.from({ length }, () =>
        chars[Math.floor(Math.random() * chars.length)]
    ).join("");
};

export { hashPassword, comparePassword, generateSecurePassword }