const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.1",
  info: {
    title: "TripGO API",
    version: "2.0.0",
    description: "Documentación oficial del Backend de TripGO - Plataforma de turismo para el Quindío",
    contact: {
      name: "TripGO Team",
      email: "tripgoservice@gmail.com"
    },
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT"
    }
  },
  servers: [
    {
      url: process.env.NODE_ENV === "production"
        ? "https://tripgo-backend-arehbhbubshxdpg7.chilecentral-01.azurewebsites.net"
        : `http://localhost:${process.env.PORT || 4000}`,
      description: process.env.NODE_ENV === "production" ? "Producción (Azure)" : "Desarrollo Local"
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Token JWT obtenido al hacer login"
      }
    },
    schemas: {
      // ========== USUARIO ==========
      Usuario: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            description: "ID único del usuario",
            example: 1
          },
          nombre_usuario: {
            type: "string",
            description: "Nombre completo del usuario",
            example: "Juan Pérez"
          },
          correo_usuario: {
            type: "string",
            format: "email",
            description: "Correo electrónico del usuario",
            example: "juan@example.com"
          },
          fecha_registro: {
            type: "string",
            format: "date-time",
            description: "Fecha de registro del usuario",
            example: "2025-01-15T10:30:00Z"
          },
          rol: {
            type: "string",
            enum: ["usuario", "empresa"],
            description: "Rol del usuario en el sistema",
            example: "usuario"
          },
          foto_perfil: {
            type: "string",
            description: "URL de la foto de perfil (Cloudinary)",
            example: "https://res.cloudinary.com/.../image.jpg"
          }
        },
        required: ["nombre_usuario", "correo_usuario", "password_u"]
      },

      UsuarioRegistro: {
        type: "object",
        properties: {
          nombre_usuario: {
            type: "string",
            example: "Juan Pérez"
          },
          correo_usuario: {
            type: "string",
            format: "email",
            example: "juan@example.com"
          },
          password_u: {
            type: "string",
            format: "password",
            minLength: 6,
            example: "miPassword123"
          },
          rol: {
            type: "string",
            enum: ["usuario", "empresa"],
            default: "usuario",
            example: "usuario"
          }
        },
        required: ["nombre_usuario", "correo_usuario", "password_u"]
      },

      UsuarioLogin: {
        type: "object",
        properties: {
          correo_usuario: {
            type: "string",
            format: "email",
            example: "juan@example.com"
          },
          password_u: {
            type: "string",
            format: "password",
            example: "miPassword123"
          }
        },
        required: ["correo_usuario", "password_u"]
      },

      AuthResponse: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Inicio de sesión exitoso"
          },
          token: {
            type: "string",
            description: "Token JWT para autenticación",
            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          },
          user: {
            type: "object",
            properties: {
              id: { type: "integer", example: 1 },
              nombre_usuario: { type: "string", example: "Juan Pérez" },
              correo_usuario: { type: "string", example: "juan@example.com" },
              rol: { type: "string", example: "usuario" }
            }
          }
        }
      },

      // ========== ESTABLECIMIENTO ==========
      Establecimiento: {
        type: "object",
        properties: {
          id_establecimiento: {
            type: "integer",
            description: "ID único del establecimiento",
            example: 1
          },
          nombre_establecimiento: {
            type: "string",
            description: "Nombre del establecimiento",
            example: "Hotel Campestre La Bella"
          },
          direccion: {
            type: "string",
            description: "Dirección física del establecimiento",
            example: "Vía Armenia - Montenegro Km 5"
          },
          ubicacion: {
            type: "string",
            description: "Ubicación descriptiva o coordenadas",
            example: "Montenegro, Quindío"
          },
          latitud: {
            type: "number",
            format: "double",
            description: "Latitud GPS",
            example: 4.5639
          },
          longitud: {
            type: "number",
            format: "double",
            description: "Longitud GPS",
            example: -75.7847
          },
          horario_apertura: {
            type: "string",
            format: "time",
            description: "Hora de apertura",
            example: "08:00:00"
          },
          horario_cierre: {
            type: "string",
            format: "time",
            description: "Hora de cierre",
            example: "18:00:00"
          },
          estado: {
            type: "string",
            enum: ["activo", "inactivo"],
            description: "Estado del establecimiento",
            example: "activo"
          },
          descripcion: {
            type: "string",
            description: "Descripción detallada del establecimiento",
            example: "Hotel campestre con piscina y zonas verdes"
          },
          id_propietario: {
            type: "integer",
            description: "ID del usuario propietario",
            example: 5
          },
          telefono: {
            type: "string",
            description: "Teléfono de contacto",
            example: "3101234567"
          },
          correo: {
            type: "string",
            format: "email",
            description: "Correo electrónico del establecimiento",
            example: "info@hotelcampestre.com"
          },
          tipo: {
            type: "integer",
            description: "ID del tipo de establecimiento",
            example: 1
          },
          comentarios: {
            type: "string",
            description: "Comentarios o notas adicionales",
            example: "Parqueadero gratuito, WiFi incluido"
          }
        },
        required: ["nombre_establecimiento", "tipo"]
      },

      // ========== TIPO ==========
      Tipo: {
        type: "object",
        properties: {
          id_tipo: {
            type: "integer",
            description: "ID único del tipo",
            example: 1
          },
          nombre_tipo: {
            type: "string",
            description: "Nombre del tipo de establecimiento",
            example: "Hotel"
          }
        },
        required: ["nombre_tipo"]
      },

      // ========== SERVICIO ==========
      Servicio: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1
          },
          nombre_servicio: {
            type: "string",
            description: "Nombre del servicio",
            example: "WiFi Gratuito"
          },
          descripcion: {
            type: "string",
            description: "Descripción del servicio",
            example: "Internet inalámbrico de alta velocidad"
          },
          disponibilidad: {
            type: "boolean",
            description: "Disponibilidad del servicio",
            example: true
          }
        }
      },

      // ========== PLANEADOR ==========
      Planeador: {
        type: "object",
        properties: {
          id_planeador: {
            type: "integer",
            example: 1
          },
          nombre_plan: {
            type: "string",
            description: "Nombre del plan de viaje",
            example: "Viaje a Salento"
          },
          id_usuario: {
            type: "integer",
            description: "ID del usuario creador",
            example: 3
          },
          fecha: {
            type: "string",
            format: "date-time",
            description: "Fecha de creación del plan",
            example: "2025-01-20T10:00:00Z"
          },
          total_estimado: {
            type: "number",
            format: "double",
            description: "Total estimado del presupuesto",
            example: 500000
          }
        }
      },

      // ========== COMENTARIO ==========
      Comentario: {
        type: "object",
        properties: {
          id_comentario: {
            type: "integer",
            example: 1
          },
          contenido: {
            type: "string",
            description: "Contenido del comentario",
            example: "Excelente lugar, muy recomendado"
          },
          usuario_id: {
            type: "integer",
            description: "ID del usuario que comenta",
            example: 2
          },
          establecimiento_id: {
            type: "integer",
            description: "ID del establecimiento comentado",
            example: 5
          },
          fecha: {
            type: "string",
            format: "date-time",
            example: "2025-02-15T14:30:00Z"
          }
        }
      },

      // ========== CONTACTO ==========
      ContactoEmail: {
        type: "object",
        properties: {
          name: {
            type: "string",
            minLength: 2,
            description: "Nombre completo de quien contacta",
            example: "María González"
          },
          email: {
            type: "string",
            format: "email",
            description: "Email de contacto",
            example: "maria@example.com"
          },
          message: {
            type: "string",
            minLength: 10,
            description: "Mensaje del contacto",
            example: "Quisiera información sobre servicios disponibles"
          }
        },
        required: ["name", "email", "message"]
      },

      // ========== ERROR ==========
      Error: {
        type: "object",
        properties: {
          ok: {
            type: "boolean",
            example: false
          },
          message: {
            type: "string",
            description: "Mensaje descriptivo del error",
            example: "Error al procesar la solicitud"
          },
          error: {
            type: "string",
            description: "Detalle técnico del error (opcional)",
            example: "Database connection failed"
          }
        }
      },

      // ========== SUCCESS ==========
      Success: {
        type: "object",
        properties: {
          ok: {
            type: "boolean",
            example: true
          },
          message: {
            type: "string",
            description: "Mensaje de éxito",
            example: "Operación completada exitosamente"
          },
          data: {
            type: "object",
            description: "Datos adicionales (opcional)"
          }
        }
      }
    },

    responses: {
      Unauthorized: {
        description: "No autorizado - Token inválido o faltante",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error"
            },
            example: {
              ok: false,
              error: "Token requerido"
            }
          }
        }
      },
      Forbidden: {
        description: "Prohibido - Sin permisos suficientes",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error"
            },
            example: {
              ok: false,
              error: "Acceso solo para empresa"
            }
          }
        }
      },
      NotFound: {
        description: "Recurso no encontrado",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error"
            },
            example: {
              ok: false,
              message: "Recurso no encontrado"
            }
          }
        }
      },
      BadRequest: {
        description: "Solicitud inválida - Datos incorrectos",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error"
            },
            example: {
              ok: false,
              message: "Datos inválidos o incompletos"
            }
          }
        }
      },
      ServerError: {
        description: "Error interno del servidor",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error"
            },
            example: {
              ok: false,
              message: "Error interno del servidor"
            }
          }
        }
      }
    }
  },
  tags: [
    { name: "Auth", description: "Autenticación y autorización" },
    { name: "Usuarios", description: "Gestión de usuarios" },
    { name: "Establecimientos", description: "Gestión de establecimientos turísticos" },
    { name: "Tipos", description: "Tipos de establecimientos" },
    { name: "Servicios", description: "Servicios disponibles" },
    { name: "ServiciosEstablecimientos", description: "Relación servicios-establecimientos" },
    { name: "Planeador", description: "Planeación de viajes" },
    { name: "DetallesPlaneador", description: "Detalles del planeador" },
    { name: "Comentarios", description: "Comentarios de usuarios" },
    { name: "Visitas", description: "Registro de visitas" },
    { name: "Contacto", description: "Formulario de contacto" },
    { name: "Imágenes", description: "Gestión de imágenes (Cloudinary)" },
    { name: "Itinerario", description: "Envío de itinerarios por email" }
  ]
};

const options = {
  swaggerDefinition,
  apis: [
    "./src/routes/*.ts",
    "./src/controllers/*.ts"
  ]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;