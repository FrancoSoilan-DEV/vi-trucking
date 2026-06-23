import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/error.middleware.js';

// API Routers
import authRouter from './routers/auth.router.js';
import userRouter from './routers/user.router.js';
import branchRouter from './routers/branch.router.js';
import driverRouter from './routers/driver.router.js';
import vehicleRouter from './routers/vehicle.router.js';
import clientRouter from './routers/client.router.js';
import tariffRouter from './routers/tariff.router.js';
import tripRouter from './routers/trip.router.js';
import expressLayouts from 'express-ejs-layouts';

// Web Routers
import authWebRouter from './routers/web/auth.web.router.js';
import dashboardWebRouter from './routers/web/dashboard.web.router.js';
import usersWebRouter from './routers/web/users.web.router.js';
import branchesWebRouter from './routers/web/branches.web.router.js';
import driversWebRouter from './routers/web/drivers.web.router.js';
import vehiclesWebRouter from './routers/web/vehicles.web.router.js';
import clientsWebRouter from './routers/web/clients.web.router.js';
import tripsWebRouter from './routers/web/trips.web.router.js';
import tariffsWebRouter from './routers/web/tariffs.web.router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

app.use(expressLayouts);
app.set('layout', 'layouts/main');
// Archivos estáticos
app.use(express.static(path.join(process.cwd(), 'public')));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Redirigir raíz al login
app.get('/', (req, res) => res.redirect('/auth/login'));

// Web Routes
app.use('/auth', authWebRouter);
app.use('/dashboard', dashboardWebRouter);
app.use('/users', usersWebRouter);
app.use('/branches', branchesWebRouter);
app.use('/drivers', driversWebRouter);
app.use('/vehicles', vehiclesWebRouter);
app.use('/clients', clientsWebRouter);
app.use('/trips', tripsWebRouter);
app.use('/tariffs', tariffsWebRouter);

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/branches', branchRouter);
app.use('/api/drivers', driverRouter);
app.use('/api/vehicles', vehicleRouter);
app.use('/api/clients', clientRouter);
app.use('/api/tariffs', tariffRouter);
app.use('/api/trips', tripRouter);

// Error middleware — siempre al final
app.use(errorMiddleware);

export default app;