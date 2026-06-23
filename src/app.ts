import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import path from 'path';
import { errorMiddleware } from './middlewares/error.middleware.js';

import authRouter from './routers/auth.router.js';
import userRouter from './routers/user.router.js';
import branchRouter from './routers/branch.router.js';
import driverRouter from './routers/driver.router.js';
import vehicleRouter from './routers/vehicle.router.js';
import clientRouter from './routers/client.router.js';
import tariffRouter from './routers/tariff.router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Archivos estáticos (CSS, JS, imágenes)
app.use(express.static(path.join(__dirname, '../public')));

// Parsear JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de prueba — Hola Mundo
app.get('/', (req, res) => {
  res.render('pages/home', { title: 'VI-Trucking', message: '¡Hola Mundo!' });
});

// Error middleware — siempre al final
app.use(errorMiddleware);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/branches', branchRouter);
app.use('/api/drivers', driverRouter);
app.use('/api/vehicles', vehicleRouter);
app.use('/api/clients', clientRouter);
app.use('/api/tariffs', tariffRouter);

export default app;