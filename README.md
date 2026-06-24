<div align="center">
  <img width="100%" src="https://capsule-render.vercel.app/api?type=waving&height=120&color=gradient&customColorList=2,12,24&reversal=true&text=VI-Trucking&fontColor=ffffff&fontSize=52&fontAlignY=35&desc=Express.js%20%7C%20TypeScript%20%7C%20PostgreSQL%20%7C%20Prisma%20%7C%20Docker&descAlignY=58&descSize=16" />
</div>

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com/?lines=Fullstack+Logistics+Management+System;Express.js+%2B+TypeScript+%2B+PostgreSQL;JWT+Auth+%2B+Role-based+Access+Control;Automatic+Trip+Cost+Calculation;Fully+Dockerized+%E2%80%94+One+Command+Setup&center=true&width=850&height=40&color=2563EB">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express-5.x-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white"/>
  <img src="https://img.shields.io/badge/Prisma-5.x-2D3748?style=for-the-badge&logo=prisma&logoColor=white"/>
  <img src="https://img.shields.io/badge/EJS-Templates-A91E50?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/JWT-Auth-F7B731?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/bcrypt-Hashing-6f42c1?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>
</p>

---

## Table of Contents

- [Overview](#overview)
- [Core Features](#core-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Roles and Permissions](#roles-and-permissions)
- [Database Models](#database-models)
- [Tariff Calculation Logic](#tariff-calculation-logic)
- [API Endpoints](#api-endpoints)
- [Web Routes](#web-routes)
- [Docker Setup](#docker-setup)
- [Environment Variables](#environment-variables)
- [Default Users](#default-users)
- [Useful Commands](#useful-commands)

---

## Overview

**VI-Trucking** is a fullstack logistics and transport management system built from scratch with **Express.js** and **TypeScript**. It is designed to manage trucks, drivers, branches, clients, trips, tariffs, and payments in a real-world trucking company.

The system exposes both a **REST API** and a **server-rendered EJS frontend** with a clean dashboard layout. It supports multi-branch operations, automatic trip cost calculation based on configurable tariffs, and role-based access control across four user types.

---

## Core Features

- JWT-based authentication with role-based access control
- Multi-branch support — drivers and vehicles belong to specific branches
- Driver and vehicle fleet management with km tracking and maintenance dates
- Client company management with revenue, order count, and truck tracking
- Trip creation with automatic cost calculation via tariff matching
- Cargo tracking per trip (type, weight, description)
- Payment records per trip
- Dashboard with real-time stats (vehicles, drivers, clients, trips)
- Full REST API + EJS server-rendered frontend with sidebar layout
- Fully Dockerized — one command to run everything

---

## Tech Stack

<p align="left">
  <img src="https://skillicons.dev/icons?i=ts,nodejs,express,postgres,prisma,docker,github,vscode" />
</p>

| Layer | Technology |
|---|---|
| Runtime | Node.js 20 |
| Language | TypeScript 5 |
| Backend Framework | Express.js 5 |
| ORM | Prisma 5 |
| Database | PostgreSQL 16 |
| Authentication | JWT (jsonwebtoken) + bcrypt |
| Frontend | EJS + express-ejs-layouts |
| Styling | Plain CSS with CSS variables |
| Cookie handling | cookie-parser |
| Containerization | Docker + Docker Compose |

---

## Architecture

```text
Browser
  │
  ├── HTTP requests  (Form submissions → EJS web routes)
  ├── HTTP requests  (JSON → REST API)
  ▼
Express.js Backend  (port 3000)
  │
  ├── Web routes     → EJS controllers → render HTML pages
  ├── API routes     → JSON controllers → return JSON
  ├── Middlewares    → JWT auth, role check, error handler
  └── Services       → business logic + Prisma queries
  │
  ▼
Prisma ORM
  │
  ▼
PostgreSQL 16  (port 5433 on host)
```

Both web and API layers share the same services and business logic. The EJS frontend uses cookie-based JWT auth, while the REST API uses Bearer token auth.

---

## Project Structure

```text
vi-trucking/
│
├── prisma/
│   └── schema.prisma              ← all database models
│
├── src/
│   ├── config/
│   │   ├── env.ts                 ← environment variables
│   │   └── constants.ts           ← roles, statuses, cargo types
│   │
│   ├── controllers/
│   │   ├── auth.controller.ts     ← API auth controller
│   │   ├── user.controller.ts
│   │   ├── branch.controller.ts
│   │   ├── driver.controller.ts
│   │   ├── vehicle.controller.ts
│   │   ├── client.controller.ts
│   │   ├── trip.controller.ts
│   │   ├── tariff.controller.ts
│   │   └── web/                   ← EJS web controllers
│   │       ├── auth.web.controller.ts
│   │       ├── dashboard.web.controller.ts
│   │       ├── users.web.controller.ts
│   │       ├── branches.web.controller.ts
│   │       ├── drivers.web.controller.ts
│   │       ├── vehicles.web.controller.ts
│   │       ├── clients.web.controller.ts
│   │       ├── trips.web.controller.ts
│   │       └── tariffs.web.controller.ts
│   │
│   ├── database/
│   │   ├── client.ts              ← Prisma client singleton
│   │   └── seed.ts                ← initial data seed
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.ts     ← JWT verification
│   │   ├── role.middleware.ts     ← role-based access
│   │   └── error.middleware.ts    ← global error handler
│   │
│   ├── routers/
│   │   ├── auth.router.ts
│   │   ├── user.router.ts
│   │   ├── branch.router.ts
│   │   ├── driver.router.ts
│   │   ├── vehicle.router.ts
│   │   ├── client.router.ts
│   │   ├── trip.router.ts
│   │   ├── tariff.router.ts
│   │   └── web/                   ← EJS web routers
│   │       ├── auth.web.router.ts
│   │       ├── dashboard.web.router.ts
│   │       └── ...
│   │
│   ├── services/
│   │   ├── auth.service.ts        ← login, register, JWT
│   │   ├── user.service.ts
│   │   ├── branch.service.ts
│   │   ├── driver.service.ts
│   │   ├── vehicle.service.ts
│   │   ├── client.service.ts
│   │   ├── trip.service.ts        ← tariff matching + cost calculation
│   │   └── tariff.service.ts      ← findMatchingTariff
│   │
│   ├── utils/
│   │   └── AppError.ts            ← custom error class
│   │
│   ├── app.ts                     ← Express app configuration
│   └── server.ts                  ← entry point
│
├── views/
│   ├── layouts/
│   │   ├── main.ejs               ← sidebar dashboard layout
│   │   └── empty.ejs              ← layout for login page
│   ├── partials/
│   │   ├── sidebar.ejs
│   │   └── flash.ejs
│   └── pages/
│       ├── auth/login.ejs
│       ├── dashboard/index.ejs
│       ├── users/
│       ├── branches/
│       ├── drivers/
│       ├── vehicles/
│       ├── clients/
│       ├── trips/
│       └── tariffs/
│
├── public/
│   └── css/style.css
│
├── .env.example
├── compose.yml
├── Dockerfile
├── prisma.config.ts
└── package.json
```

---

## Roles and Permissions

| Resource | SUPERADMIN | ADMIN | DRIVER | CLIENT |
|---|---|---|---|---|
| View dashboard | ✅ | ✅ | ✅ | ✅ |
| Manage users | ✅ | ✅ | ❌ | ❌ |
| Delete users | ✅ | ❌ | ❌ | ❌ |
| Manage branches | ✅ | ❌ | ❌ | ❌ |
| Manage drivers | ✅ | ✅ | ❌ | ❌ |
| Manage vehicles | ✅ | ✅ | ❌ | ❌ |
| Manage clients | ✅ | ✅ | ❌ | ❌ |
| Create trips | ✅ | ✅ | ❌ | ❌ |
| Update trip status | ✅ | ✅ | ✅ | ❌ |
| View trips | ✅ | ✅ | ✅ | ✅ |
| Delete trips | ✅ | ❌ | ❌ | ❌ |
| Manage tariffs | ✅ | ❌ | ❌ | ❌ |

---

## Database Models

<details>
<summary><strong>User</strong> — System user with role</summary>

| Field | Type | Description |
|---|---|---|
| id | Int | Primary key |
| name | String | Full name |
| email | String | Unique email |
| password | String | bcrypt hash |
| role | Role | SUPERADMIN / ADMIN / DRIVER / CLIENT |
| createdAt | DateTime | Creation timestamp |

</details>

<details>
<summary><strong>Branch</strong> — Company office / depot</summary>

| Field | Type | Description |
|---|---|---|
| id | Int | Primary key |
| name | String | Branch name |
| country | String | Country |
| city | String | City |
| address | String | Street address |
| createdAt | DateTime | Creation timestamp |

</details>

<details>
<summary><strong>Driver</strong> — Driver profile linked to a user</summary>

| Field | Type | Description |
|---|---|---|
| id | Int | Primary key |
| license | String | Unique license number |
| userId | Int | FK → User |

</details>

<details>
<summary><strong>Vehicle</strong> — Truck in the fleet</summary>

| Field | Type | Description |
|---|---|---|
| id | Int | Primary key |
| plate | String | Unique license plate |
| brand | String | Brand |
| model | String | Model |
| year | Int | Year |
| maxCapacityKg | Float | Max load in kg |
| totalKm | Float | Total km driven |
| totalTrips | Int | Total trips completed |
| lastMaintenance | DateTime? | Last maintenance date |
| licenseExpiryDate | DateTime? | License expiry |
| driverId | Int | FK → Driver |
| branchId | Int | FK → Branch |

</details>

<details>
<summary><strong>Client</strong> — Client company</summary>

| Field | Type | Description |
|---|---|---|
| id | Int | Primary key |
| companyName | String | Company name |
| industry | String | Business sector |
| country | String | Country |
| distanceFromBranchKm | Float | Distance from branch |
| totalOrders | Int | Total orders placed |
| totalTrucksSent | Int | Total trucks dispatched |
| totalRevenue | Float | Total revenue generated |
| userId | Int | FK → User |

</details>

<details>
<summary><strong>Tariff</strong> — Pricing rule for trip cost calculation</summary>

| Field | Type | Description |
|---|---|---|
| id | Int | Primary key |
| name | String | Descriptive name |
| country | String | Target country |
| minKm | Float | Minimum distance |
| maxKm | Float? | Maximum distance (null = no limit) |
| cargoType | CargoType | GENERAL / FRAGILE / PERISHABLE / HAZARDOUS / HEAVY |
| multiplier | Float | Cost multiplier |
| fixedAmount | Float | Fixed amount added on top |

</details>

<details>
<summary><strong>Trip</strong> — A transport job</summary>

| Field | Type | Description |
|---|---|---|
| id | Int | Primary key |
| origin | String | Departure location |
| destination | String | Arrival location |
| distanceKm | Float | Total distance |
| departureAt | DateTime | Departure date/time |
| status | TripStatus | PENDING / IN_PROGRESS / COMPLETED / CANCELLED |
| baseAmount | Float | Admin-entered base amount |
| finalCost | Float | Calculated: baseAmount × multiplier + fixedAmount |
| driverId | Int | FK → Driver |
| vehicleId | Int | FK → Vehicle |
| clientId | Int | FK → Client |
| branchId | Int | FK → Branch |
| tariffId | Int | FK → Tariff |

</details>

<details>
<summary><strong>Cargo</strong> — Load details for a trip</summary>

| Field | Type | Description |
|---|---|---|
| id | Int | Primary key |
| type | CargoType | Cargo category |
| weightKg | Float | Weight in kg |
| description | String? | Optional description |
| tripId | Int | FK → Trip (unique) |

</details>

<details>
<summary><strong>Payment</strong> — Payment record for a trip</summary>

| Field | Type | Description |
|---|---|---|
| id | Int | Primary key |
| amount | Float | Amount due |
| paid | Boolean | Payment status |
| paidAt | DateTime? | Payment date |
| tripId | Int | FK → Trip (unique) |

</details>

---

## Tariff Calculation Logic

When a trip is created, the system automatically finds the matching tariff based on:

- Destination **country**
- Trip **distance** (must fall within `minKm` and `maxKm`)
- **Cargo type**

The final cost is calculated as:

```
finalCost = baseAmount × multiplier + fixedAmount
```

Example:

```
baseAmount    = 5000
multiplier    = 1.3   (Local +100km tariff)
fixedAmount   = 800
finalCost     = 5000 × 1.3 + 800 = 7300
```

After trip creation, the system automatically updates:
- `Client.totalOrders += 1`
- `Client.totalTrucksSent += 1`
- `Client.totalRevenue += finalCost`
- `Vehicle.totalTrips += 1`
- `Vehicle.totalKm += distanceKm`

---

## API Endpoints

### Auth
```text
POST  /api/auth/login        → returns JWT token
POST  /api/auth/register     → creates a new user
```

### Users
```text
GET    /api/users            → list all users
GET    /api/users/:id        → get user by ID
POST   /api/users            → create user
PUT    /api/users/:id        → update user
DELETE /api/users/:id        → delete user (SUPERADMIN only)
```

### Branches
```text
GET    /api/branches         → list all branches
GET    /api/branches/:id     → get branch by ID
POST   /api/branches         → create branch (SUPERADMIN only)
PUT    /api/branches/:id     → update branch (SUPERADMIN only)
DELETE /api/branches/:id     → delete branch (SUPERADMIN only)
```

### Drivers
```text
GET    /api/drivers          → list all drivers
GET    /api/drivers/:id      → get driver by ID
POST   /api/drivers          → create driver
PUT    /api/drivers/:id      → update driver
DELETE /api/drivers/:id      → delete driver (SUPERADMIN only)
```

### Vehicles
```text
GET    /api/vehicles         → list all vehicles
GET    /api/vehicles/:id     → get vehicle by ID
POST   /api/vehicles         → create vehicle
PUT    /api/vehicles/:id     → update vehicle
DELETE /api/vehicles/:id     → delete vehicle (SUPERADMIN only)
```

### Clients
```text
GET    /api/clients          → list all clients
GET    /api/clients/:id      → get client by ID
POST   /api/clients          → create client
PUT    /api/clients/:id      → update client
DELETE /api/clients/:id      → delete client (SUPERADMIN only)
```

### Trips
```text
GET    /api/trips            → list all trips
GET    /api/trips/:id        → get trip by ID
POST   /api/trips            → create trip (calculates cost automatically)
PUT    /api/trips/:id/status → update trip status
DELETE /api/trips/:id        → delete trip (SUPERADMIN only)
```

### Tariffs
```text
GET    /api/tariffs          → list all tariffs
GET    /api/tariffs/:id      → get tariff by ID
POST   /api/tariffs          → create tariff (SUPERADMIN only)
PUT    /api/tariffs/:id      → update tariff (SUPERADMIN only)
DELETE /api/tariffs/:id      → delete tariff (SUPERADMIN only)
```

---

## Web Routes

| Route | Description |
|---|---|
| `/auth/login` | Login page |
| `/auth/logout` | Logout |
| `/dashboard` | Main dashboard with stats |
| `/users` | User list |
| `/users/new` | Create user form |
| `/users/:id/edit` | Edit user form |
| `/branches` | Branch list |
| `/branches/new` | Create branch form |
| `/drivers` | Driver list |
| `/drivers/new` | Create driver form |
| `/vehicles` | Vehicle fleet list |
| `/vehicles/new` | Register vehicle form |
| `/clients` | Client company list |
| `/clients/new` | Register client form |
| `/trips` | Trip list |
| `/trips/new` | Create trip form |
| `/tariffs` | Tariff configuration |
| `/tariffs/new` | Create tariff form |

---

## Docker Setup

The project runs with two containers:

| Container | Image | Port | Purpose |
|---|---|---|---|
| `vi-trucking-app-1` | node:20-alpine | 3000 | Express.js app |
| `vi-trucking-vi_trucking_db-1` | postgres:16-alpine | 5433 | PostgreSQL database |

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/vi-trucking.git
cd vi-trucking
```

### 2. Create the `.env` file

```bash
cp .env.example .env
```

Edit `.env`:

```env
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5433/vi_trucking
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=vi_trucking
JWT_SECRET=your_secret_key_here
```

### 3. Start the containers

```bash
docker compose up --build
```

### 4. Run migrations

```bash
npx prisma migrate dev --name init
```

### 5. Seed the database

```bash
npm run seed
```

### 6. Open the app

```text
http://localhost:3000
```

---

## Default Users

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

> [!NOTE]
> The seed command is idempotent. If a Superadmin already exists, it skips execution without duplicating data.

---

## Initial Data Loaded by Seed

The seed command creates the minimum required data for the system to work:

- 7 users across all roles
- 2 branches (Asunción and Ciudad del Este)
- 3 drivers with license numbers
- 3 vehicles with full specs (brand, model, year, capacity, km, maintenance dates)
- 2 client companies with industry, country, and revenue data
- 4 tariffs covering different distance ranges and cargo types
- 4 trips in different statuses (COMPLETED, IN_PROGRESS, PENDING) with cargo and payment records

---

## Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Port the Express app runs on |
| `DATABASE_URL` | PostgreSQL connection string |
| `POSTGRES_USER` | PostgreSQL username |
| `POSTGRES_PASSWORD` | PostgreSQL password |
| `POSTGRES_DB` | PostgreSQL database name |
| `JWT_SECRET` | Secret key for signing JWT tokens |

> [!WARNING]
> Never commit your real `.env` file to a public repository. Use `.env.example` to document required variables.

---

## Useful Commands

```bash
# Start with rebuild
docker compose up --build

# Start in detached mode
docker compose up --build -d

# Stop containers
docker compose down

# Remove containers and volumes (clean reset)
docker compose down -v

# Run database migrations
npx prisma migrate dev --name init

# Seed the database
npm run seed

# Open Prisma Studio (visual DB browser)
npx prisma studio

# Start local dev server (outside Docker)
npm run dev

# Build TypeScript
npm run build
```

---

## Common Issues

### `Can't reach database server`

Make sure `DATABASE_URL` uses the correct host:

- From your local machine: `127.0.0.1:5433`
- Inside Docker containers: `vi_trucking_db:5432`

The `compose.yml` overrides `DATABASE_URL` for the app container automatically.

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

This happens on Alpine-based Docker images. The `Dockerfile` must include:

```dockerfile
RUN apk add --no-cache openssl
```

---

## Security Notes

Before deploying to production:

- Never commit `.env` files
- Use a long random `JWT_SECRET`
- Change all default seed passwords
- Use HTTPS in production
- Rotate any credentials that were ever exposed

---

<div align="center">
  <h3>Built with Express.js, TypeScript, Prisma, PostgreSQL, and Docker — from scratch.</h3>
</div>

<div align="center">
  <img width="100%" src="https://capsule-render.vercel.app/api?type=waving&height=100&color=gradient&customColorList=2,12,24&section=footer" />
</div>