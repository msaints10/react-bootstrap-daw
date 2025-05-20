// Importamos express para crear nuestro servidor web
import express from 'express';
// Importamos dotenv para gestionar las variables de entorno
import dotenv from 'dotenv';
// Importamos path para manejar rutas
import path from 'path';
import { fileURLToPath } from 'url';
// Importamos los routers para las tareas y metas
import indexRouter from '../routes/index.js';
import tasksRouter from '../routes/tasks.js';
import goalsRouter from '../routes/goals.js';

// Configuración para __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargamos las variables de entorno del archivo .env
dotenv.config();

// Creamos una instancia de la aplicación Express
const app = express();

// Configuración del motor de vistas
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

// Definimos el puerto donde se ejecutará el servidor, usando una variable de entorno o 3000 por defecto
const PORT = process.env.PORT || 3000;
// Obtenemos la clave secreta desde las variables de entorno
const SECRET_KEY = process.env.SECRET_KEY;

// Middleware para procesar el cuerpo de las solicitudes en formato JSON
app.use(express.json());          // Parsear JSON en peticiones

// ───── Middleware de autorización ─────
/**
 * Middleware para verificar la autenticación mediante API key
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 * @param {function} next - Función para continuar al siguiente middleware
 */
function apiKeyAuth(req, res, next) {
    // Obtenemos la clave API del encabezado Authorization
    const key = req.get('Authorization'); // Header: Authorization: 12345-abcde
    // Verificamos si la clave proporcionada coincide con la clave secreta
    if (key !== SECRET_KEY) {
        // Si no coincide, devolvemos un error 401 (no autorizado)
        return res.status(401).json({ error: 'Unauthorized - invalid or missing API key' });
    }
    // Si la verificación es exitosa, continuamos con la siguiente función
    next();
}

// ───── Rutas ─────
app.use('/', indexRouter); // Ruta principal de la API sin protección

// Aplicamos el middleware de autenticación solo a las rutas que queremos proteger
app.use('/tasks', apiKeyAuth, tasksRouter);
app.use('/goals', apiKeyAuth, goalsRouter);

// ───── Arranque ─────
// Iniciamos el servidor en el puerto especificado y mostramos un mensaje en la consola
app.listen(PORT, () => console.log(`API ready on http://localhost:${PORT}`));
