import express from 'express';
const router = express.Router();

// ───── Almacenamiento en memoria ─────
// Array para almacenar las tareas en memoria
let tasks = [];  // { id, title, dueDate }
// Contador para generar IDs únicos para tareas y metas
let counter_tasks = 1;  // para IDs simples en memoria


// ───── Endpoints GET ─────
// Endpoint para obtener todas las tareas
router.get('/getTasks', (req, res) => {
    try {
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
});

// ───── Endpoints POST ─────
/**
 * Endpoint para añadir una nueva tarea
 * Espera recibir título y fecha límite en el cuerpo de la solicitud
 */
router.post('/addTask', (req, res) => {
    try {
        // Extraemos el título y la fecha límite del cuerpo de la solicitud
        const { title, dueDate } = req.body;

        // Verificamos que se proporcionen tanto el título como la fecha límite
        if (!title || !dueDate) {
            return res.status(400).json({ error: 'Title and dueDate are required' });
        }

        // Creamos un nuevo objeto de tarea con un ID único
        const newTask = { id: counter_tasks++, title, dueDate };
        // Añadimos la nueva tarea al array de tareas
        tasks.push(newTask);
        // Respondemos con la tarea creada y un código de estado 201 (creado)
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ 
            error: 'Internal server error', 
            message: error.message 
        });
    }
});

// ───── Endpoints DELETE (por ?id=) ─────
/**
 * Endpoint para eliminar una tarea por su ID
 * El ID se proporciona como parámetro de consulta en la URL
 */
router.delete('/removeTask/:id', (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).json({ 
            error: 'Internal server error', 
            message: error.message 
        });
    }
});

// ───── Exportamos el router ─────
export default router;