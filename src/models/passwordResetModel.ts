export interface ForgotPasswordDTO {
    correo_usuario: string;
}

export interface ResetPasswordDTO {
    token: string;
    nueva_password: string;
}

export interface ValidateTokenDTO {
    token: string;
}