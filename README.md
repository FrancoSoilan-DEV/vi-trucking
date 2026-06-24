<div align="center">
  <img width="100%" src="https://capsule-render.vercel.app/api?type=waving&height=120&color=gradient&reversal=true&text=VI-Trucking&fontColor=ffffff&fontSize=40&fontAlignY=35&desc=Logistics%20%26%20Transport%20Management%20System%20%7C%20Express%20%7C%20PostgreSQL%20%7C%20Docker&descAlignY=55&descSize=18" />
</div>

<div align="center">

# VI-Trucking

**Docker-ready Express.js fullstack logistics management system for trucks, drivers, branches, clients, trips, tariffs, and real-time dashboards.**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org)
[![Prisma](https://img.shields.io/badge/Prisma-5.x-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://prisma.io)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com)
[![Node](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)

</div>

---

> [!IMPORTANT]
> ## First commands you should run
>
> After cloning the repository, start the containers:
>
> ```bash
> docker compose up --build
> ```
>
> Then in a separate terminal, run the migrations and seed:
>
> ```bash
> npx prisma migrate dev --name init
> npm run seed
> ```
>
> These steps create all database tables and load the initial data required for the system to work.

---

## About VI-Trucking

**VI-Trucking** is a fullstack logistics and transport management system built from scratch with **Express.js** and **TypeScript**. It is designed to manage trucks, drivers, branches, clients, trips, tariffs, and payments in a real-world trucking company.

The system includes:

- JWT-based authentication with role-based access control.
- Superadmin, Admin, Driver, and Client roles.
- Multi-branch support.
- Driver and vehicle fleet management.
- Client company management with revenue tracking.
- Trip creation with automatic cost calculation based on tariffs.
- Cargo tracking per trip.
- Payment records per trip.
- Dashboard with real-time statistics.
- Full REST API + EJS server-rendered frontend.

---

## Main technologies

| Technology | Use |
|---|---|
| Node.js 20 | Runtime |
| TypeScript 5 | Static typing |
| Express 5 | Backend framework |
| Prisma 5 | ORM |
| PostgreSQL 16 | Database |
| EJS + express-ejs-layouts | Server-rendered templates |
| JWT | Authentication |
| bcrypt | Password hashing |
| cookie-parser | Cookie management |
| Docker + Docker Compose | Containerization |

---

## Project structure

```text
vi-trucking/
│
├── prisma/
│   └── schema.prisma           # Database models
│
├── src/
│   ├── config/
│   │   ├── env.ts              # Environment variables
│   │   └── constants.ts        # Roles, statuses, cargo types
│   │
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── user.controller.ts
│   │   └── web/                # Web (EJS) controllers
│   │       ├── auth.web.controller.ts
│   │       ├── dashboard.web.controller.ts
│   │       └── ...
│   │
│   ├── database/
│   │   ├── client.ts           # Prisma client instance
│   │   └── seed.ts             # Initial data seed
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.ts  # JWT verification
│   │   ├── role.middleware.ts  # Role-based access
│   │   └── error.middleware.ts # Global error handler
│   │
│   ├── routers/
│   │   ├── auth.router.ts
│   │   └── web/                # Web (EJS) routers
│   │       ├── auth.web.router.ts
│   │       ├── dashboard.web.router.ts
│   │       └── ...
│   │
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── user.service.ts
│   │   ├── branch.service.ts
│   │   ├── driver.service.ts
│   │   ├── vehicle.service.ts
│   │   ├── client.service.ts
│   │   ├── trip.service.ts
│   │   └── tariff.service.ts
│   │
│   ├── utils/
│   │   └── AppError.ts         # Custom error class
│   │
│   ├── app.ts                  # Express app configuration
│   └── server.ts               # Entry point
│
├── views/
│   ├── layouts/
│   │   ├── main.ejs            # Main layout with sidebar
│   │   └── empty.ejs           # Layout for login page
│   ├── partials/
│   │   ├── sidebar.ejs
│   │   └── flash.ejs
│   └── pages/
│       ├── auth/
│       ├── dashboard/
│       ├── users/
│       ├── branches/
│       ├── drivers/
│       ├── vehicles/
│       ├── clients/
│       ├── trips/
│       └── tariffs/
│
├── public/
│   └── css/
│       └── style.css
│
├── .env.example
├── compose.yml
├── Dockerfile
├── prisma.config.ts
└── package.json
```

---

## Running the project with Docker

### 1. Clone the repository

```bash
git clone https://github.com/your-username/vi-trucking.git
cd vi-trucking
```

### 2. Create the `.env` file

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5433/vi_trucking
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=vi_trucking
JWT_SECRET=your_secret_key_here
```

### 3. Build and start the containers

```bash
docker compose up --build
```

### 4. Run migrations

```bash
npx prisma migrate dev --name init
```

### 5. Seed initial data

```bash
npm run seed
```

### 6. Open the system

```text
http://localhost:3000
```

---

## Default users created by the seed

| Role | Email | Password |
|---|---|---|
| Superadmin | `admin@vitrucking.com` | `admin123` |
| Admin | `carlos@vitrucking.com` | `admin123` |
| Driver 1 | `roberto@vitrucking.com` | `driver123` |
| Driver 2 | `miguel@vitrucking.com` | `driver123` |
| Driver 3 | `juan@vitrucking.com` | `driver123` |
| Client 1 | `ana@exportaciones.com` | `client123` |
| Client 2 | `pedro@constructora.com` | `client123` |

> [!WARNING]
> Change passwords after the first login, especially for the Superadmin account.

---

## Initial data loaded by the seed

The seed command creates the minimum required data for the system to work correctly.

It creates:

- 7 users across all roles.
- 2 branches (Asunción and Ciudad del Este).
- 3 drivers with licenses.
- 3 vehicles with full specs (brand, model, year, capacity, km, maintenance dates).
- 2 client companies with industry, country, and revenue data.
- 4 tariffs with multipliers and fixed amounts for different distances and cargo types.
- 4 trips in different statuses (COMPLETED, IN_PROGRESS, PENDING) with cargo and payment records.

> [!NOTE]
> The seed command checks for existing data before inserting. If a Superadmin already exists, it skips execution.

---

## Roles and permissions

| Role | Permissions |
|---|---|
| **SUPERADMIN** | Full access to everything |
| **ADMIN** | Manage drivers, vehicles, clients, trips per branch |
| **DRIVER** | View and update status of own trips |
| **CLIENT** | View status of own shipments |

---

## Tariff calculation logic

The system automatically calculates trip cost based on tariffs:

```
finalCost = baseAmount × multiplier + fixedAmount
```

The tariff is matched by:
- Destination country
- Trip distance (km range)
- Cargo type

---

## REST API Endpoints

### Auth
| Method | Route | Description |
|---|---|---|
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/register` | Register user |

### Resources
| Method | Route | Description |
|---|---|---|
| GET/POST | `/api/users` | List / create users |
| GET/PUT/DELETE | `/api/users/:id` | Get / update / delete user |
| GET/POST | `/api/branches` | List / create branches |
| GET/POST | `/api/drivers` | List / create drivers |
| GET/POST | `/api/vehicles` | List / create vehicles |
| GET/POST | `/api/clients` | List / create clients |
| GET/POST | `/api/trips` | List / create trips |
| PUT | `/api/trips/:id/status` | Update trip status |
| GET/POST | `/api/tariffs` | List / create tariffs |

---

## Web Routes (EJS)

| Route | Description |
|---|---|
| `/auth/login` | Login page |
| `/dashboard` | Main dashboard |
| `/users` | User management |
| `/branches` | Branch management |
| `/drivers` | Driver management |
| `/vehicles` | Vehicle fleet |
| `/clients` | Client companies |
| `/trips` | Trip management |
| `/tariffs` | Tariff configuration |

---

## Environment variables

```env
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5433/vi_trucking
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=vi_trucking
JWT_SECRET=your_secret_key_here
```

> [!WARNING]
> Never commit your real `.env` file to a public repository. Use `.env.example` to document required variables.

---

## Useful commands

Start the project:

```bash
docker compose up --build
```

Start in detached mode:

```bash
docker compose up --build -d
```

Stop containers:

```bash
docker compose down
```

Run migrations:

```bash
npx prisma migrate dev --name init
```

Run seed:

```bash
npm run seed
```

Open Prisma Studio (visual DB browser):

```bash
npx prisma studio
```

Reset local database:

```bash
docker compose down -v
docker compose up --build
npx prisma migrate dev --name init
npm run seed
```

---

## Common issues

### `Can't reach database server`

Make sure `DATABASE_URL` uses the correct host:

- From your machine (local dev): `127.0.0.1:5433`
- Inside Docker containers: `vi_trucking_db:5432`

The `compose.yml` sets the correct `DATABASE_URL` for the app container automatically via the `environment` override.

---

### `@prisma/client did not initialize yet`

Run:

```bash
npx prisma generate
```

Or rebuild the Docker image:

```bash
docker compose up --build
```

---

### `libssl.so.1.1: No such file or directory`

This happens on Alpine-based Docker images. The `Dockerfile` includes:

```dockerfile
RUN apk add --no-cache openssl
```

Make sure this line is present in your `Dockerfile`.

---

## Production safety

This repository is intended for local development and learning.

To avoid affecting production:

- Do not use production `.env` values.
- Do not connect this repository to a production deployment.
- Do not push real credentials.
- Do not commit local database data.

---

<div align="center">
  <h3>Built with Express.js, TypeScript, Prisma, PostgreSQL, and Docker — from scratch.</h3>
</div>

<div align="center">
  <img width="100%" src="https://capsule-render.vercel.app/api?type=waving&height=100&color=gradient&section=footer" />
</div>