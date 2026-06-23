# 🚛 VI-Trucking

Sistema de gestión logística y transporte desarrollado con **Express.js**, **TypeScript**, **Prisma** y **PostgreSQL**.

![Dashboard](https://img.shields.io/badge/Status-En%20desarrollo-yellow)
![Node](https://img.shields.io/badge/Node-20-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Express](https://img.shields.io/badge/Express-5.x-lightgrey)
![Prisma](https://img.shields.io/badge/Prisma-5.x-purple)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)

---

## ✨ Funcionalidades

- 🔐 Autenticación con JWT y roles (Superadmin, Admin, Conductor, Cliente)
- 🏢 Gestión de sedes
- 🧑‍✈️ Gestión de conductores
- 🚛 Gestión de flota de vehículos
- 🏭 Gestión de clientes (empresas)
- 🗺️ Creación y seguimiento de viajes
- 💰 Sistema de tarifas con multiplicadores automáticos
- 📊 Dashboard con estadísticas en tiempo real

---

## 🛠️ Stack tecnológico

| Tecnología | Uso |
|---|---|
| Express 5 | Framework backend |
| TypeScript | Tipado estático |
| Prisma 5 | ORM |
| PostgreSQL 16 | Base de datos |
| EJS | Motor de plantillas |
| JWT | Autenticación |
| bcrypt | Encriptación de contraseñas |
| Docker | Contenedores |

---

## 🚀 Instalación y uso

### Requisitos
- Node.js 20+
- Docker y Docker Compose

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/vi-trucking.git
cd vi-trucking
```

### 2. Configurar variables de entorno
```bash
cp .env.example .env
```

Editar `.env` con tus valores:
```env
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5433/vi_trucking
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=vi_trucking
JWT_SECRET=tu_clave_secreta
```

### 3. Levantar con Docker
```bash
docker compose up --build
```

### 4. Correr migraciones
```bash
npx prisma migrate dev --name init
```

### 5. Cargar datos iniciales
```bash
npm run seed
```

### 6. Acceder al sistema

| Campo | Valor |
|---|---|
| URL | http://localhost:3000 |
| Email | admin@vitrucking.com |
| Contraseña | admin123 |

> ⚠️ Cambiá la contraseña después del primer login.

---

## 📁 Estructura del proyecto

```
vi-trucking/
├── prisma/
│   └── schema.prisma        # Modelos de la DB
├── src/
│   ├── config/              # Variables de entorno y constantes
│   ├── controllers/         # Controllers API y web
│   │   └── web/             # Controllers para vistas EJS
│   ├── database/            # Cliente Prisma y seed
│   ├── middlewares/         # Auth, roles y errores
│   ├── models/              # Interfaces TypeScript
│   ├── routers/             # Rutas API y web
│   │   └── web/             # Routers para vistas
│   ├── services/            # Lógica de negocio
│   ├── utils/               # AppError y utilidades
│   ├── app.ts               # Configuración de Express
│   └── server.ts            # Punto de entrada
├── views/                   # Templates EJS
│   ├── layouts/
│   ├── pages/
│   └── partials/
├── public/                  # CSS, JS e imágenes
├── .env.example
├── compose.yml
├── Dockerfile
└── package.json
```

---

## 🔑 Roles del sistema

| Rol | Permisos |
|---|---|
| **SUPERADMIN** | Acceso total al sistema |
| **ADMIN** | Gestión de conductores, vehículos, clientes y viajes |
| **DRIVER** | Ver y actualizar estado de sus viajes |
| **CLIENT** | Ver el estado de sus envíos |

---

## 📡 API Endpoints

### Auth
| Método | Ruta | Descripción |
|---|---|---|
| POST | /api/auth/login | Iniciar sesión |
| POST | /api/auth/register | Registrar usuario |

### Recursos
| Método | Ruta | Descripción |
|---|---|---|
| GET | /api/users | Listar usuarios |
| GET | /api/branches | Listar sedes |
| GET | /api/drivers | Listar conductores |
| GET | /api/vehicles | Listar vehículos |
| GET | /api/clients | Listar clientes |
| GET | /api/trips | Listar viajes |
| GET | /api/tariffs | Listar tarifas |

---

## 👨‍💻 Desarrollado por

**Franco** — Aprendiendo Express.js desde cero 🚀