// Importamos express para crear nuestro servidor web
import express from 'express';
// Importamos dotenv para gestionar las variables de entorno
import dotenv from 'dotenv';
// Cargamos las variables de entorno del archivo .env
dotenv.config();

// Creamos una instancia de la aplicación Express
const app = express();
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

// Aplicamos el middleware de autenticación a todas las rutas
app.use(apiKeyAuth);

// ───── Almacenamiento en memoria ─────
// Array para almacenar las tareas en memoria
let tasks = [];  // { id, title, dueDate }
// Array para almacenar las metas en memoria
let goals = [];  // { id, title, dueDate }
// Contador para generar IDs únicos para tareas y metas
let counter_tasks = 1;  // para IDs simples en memoria
let counter_goals = 1;   // para IDs simples en memoria

// ───── Endpoints GET ─────
// Endpoint para obtener todas las tareas
app.get('/getTasks', (req, res) => res.json(tasks));
// Endpoint para obtener todas las metas
app.get('/getGoals', (req, res) => res.json(goals));

// ───── Endpoints POST ─────
/**
 * Endpoint para añadir una nueva tarea
 * Espera recibir título y fecha límite en el cuerpo de la solicitud
 */
app.post('/addTask', (req, res) => {
    // Extraemos el título y la fecha límite del cuerpo de la solicitud
    const { title, dueDate } = req.body;
    // Creamos un nuevo objeto de tarea con un ID único
    const newTask = { id: counter_tasks++, title, dueDate };
    // Añadimos la nueva tarea al array de tareas
    tasks.push(newTask);
    // Respondemos con la tarea creada y un código de estado 201 (creado)
    res.status(201).json(newTask);
});

/**
 * Endpoint para añadir una nueva meta
 * Espera recibir título y fecha límite en el cuerpo de la solicitud
 */
app.post('/addGoal', (req, res) => {
    // Extraemos el título y la fecha límite del cuerpo de la solicitud
    const { title, dueDate } = req.body;
    // Creamos un nuevo objeto de meta con un ID único
    const newGoal = { id: counter_goals++, title, dueDate };
    // Añadimos la nueva meta al array de metas
    goals.push(newGoal);
    // Respondemos con la meta creada y un código de estado 201 (creado)
    res.status(201).json(newGoal);
});

// ───── Endpoints DELETE (por ?id=) ─────
/**
 * Endpoint para eliminar una tarea por su ID
 * El ID se proporciona como parámetro de consulta en la URL
 */
app.delete('/removeTask/:id', (req, res) => {
    // Obtenemos el ID de los parámetros de ruta
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'ID is required' });
    }

    // Verificamos si la tarea existe antes de eliminarla
    const taskExists = tasks.some(t => t.id === Number(id));
    if (!taskExists) {
        return res.status(404).json({ error: `Task with id ${id} not found` });
    }

    // Filtramos el array de tareas para eliminar la tarea con el ID especificado
    tasks = tasks.filter(t => t.id !== Number(id));

    // Respondemos con un mensaje de confirmación
    res.json({ message: `Task ${id} deleted`, success: true });
});

/**
 * Endpoint para eliminar una meta por su ID
 * El ID se proporciona como parámetro de consulta en la URL
 */
app.delete('/removeGoal/:id', (req, res) => {
    // Obtenemos el ID de los parámetros de ruta
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'ID is required' });
    }

    // Verificamos si la meta existe antes de eliminarla
    const goalExists = goals.some(g => g.id === Number(id));
    if (!goalExists) {
        return res.status(404).json({ error: `Goal with id ${id} not found` });
    }

    // Filtramos el array de metas para eliminar la meta con el ID especificado
    goals = goals.filter(g => g.id !== Number(id));

    // Respondemos con un mensaje de confirmación
    res.json({ message: `Goal ${id} deleted`, success: true });
});

// ───── Arranque ─────
// Iniciamos el servidor en el puerto especificado y mostramos un mensaje en la consola
app.listen(PORT, () => console.log(`API ready on http://localhost:${PORT}`));
