import express from 'express';
const router = express.Router();

// ───── Almacenamiento en memoria ─────
// Array para almacenar las metas en memoria
let goals = [];  // { id, title, dueDate }
// Contador para generar IDs únicos para tareas y metas
let counter_goals = 1;   // para IDs simples en memoria


// ───── Endpoints GET ─────
// Endpoint para obtener todas las metas
router.get('/getGoals', (req, res) => {
    try {
        res.status(200).json(goals);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
});

// ───── Endpoints POST ─────
/**
 * Endpoint para añadir una nueva meta
 * Espera recibir título y fecha límite en el cuerpo de la solicitud
 */
router.post('/addGoal', (req, res) => {
    try {
        // Extraemos el título y la fecha límite del cuerpo de la solicitud
        const { title, dueDate } = req.body;

        // Verificamos si se proporcionaron todos los campos requeridos
        if (!title || !dueDate) {
            return res.status(400).json({ 
                error: 'Title and dueDate are required fields'
            });
        }

        // Creamos un nuevo objeto de meta con un ID único
        const newGoal = { id: counter_goals++, title, dueDate };
        // Añadimos la nueva meta al array de metas
        goals.push(newGoal);
        // Respondemos con la meta creada y un código de estado 201 (creado)
        res.status(201).json(newGoal);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
});

// ───── Endpoints DELETE (por ?id=) ─────
/**
 * Endpoint para eliminar una meta por su ID
 * El ID se proporciona como parámetro de consulta en la URL
 */
router.delete('/removeGoal/:id', (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
});

// ───── Exportamos el router ─────
export default router;