import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);




import express from 'express';
import path from 'path';

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

export default app;