CREATE TABLE solicitudes_onboarding (
    id_solicitud INT AUTO_INCREMENT PRIMARY KEY,
    nombre_establecimiento VARCHAR(255) NOT NULL,
    nombre_contacto VARCHAR(255) NOT NULL,
    correo_contacto VARCHAR(255) NOT NULL,
    telefono_contacto VARCHAR(50),
    descripcion TEXT NOT NULL,
    id_tipo INT NULL,
		  FOREIGN KEY (id_tipo)
			REFERENCES tipos(id_tipo),
    estado ENUM(
        'pendiente',
        'en_revision',
        'aprobado',
        'rechazado'
    ) NOT NULL DEFAULT 'pendiente',
    token_formulario VARCHAR(255) UNIQUE NOT NULL,
    token_expiracion DATETIME NOT NULL,
    datos_completos JSON NULL,
    fotos JSON NULL,
    servicios JSON NULL,
    id_usuario INT NULL,
		FOREIGN KEY (id_usuario)
		REFERENCES usuarios(id),
    id_establecimiento INT NULL,
		FOREIGN KEY (id_establecimiento)
		REFERENCES establecimiento(id_establecimiento),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_onboarding_token
ON solicitudes_onboarding(token_formulario);

CREATE INDEX idx_onboarding_estado
ON solicitudes_onboarding(estado);

CREATE INDEX idx_onboarding_correo
ON solicitudes_onboarding(correo_contacto);