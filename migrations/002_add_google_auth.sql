-- 002_add_google_auth.sql

ALTER TABLE usuarios
ADD COLUMN google_id VARCHAR(255) NULL,
ADD COLUMN auth_provider ENUM('local', 'google') DEFAULT 'local';