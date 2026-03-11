import bcrypt from "bcrypt";

const hashPassword = async (password: string) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password: string, hash: string) => {
    return bcrypt.compare(password, hash);
};

export {hashPassword, comparePassword}