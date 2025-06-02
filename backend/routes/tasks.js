import express from 'express';
import Task from '../models/tasks.js';

const router = express.Router();

// ───── Endpoints GET ─────
// Endpoint para obtener todas las tareas
router.get('/getTasks', async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
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
 * Espera recibir name, description y dueDate en el cuerpo de la solicitud
 */
router.post('/addTask', async (req, res) => {
    try {
        // Extraemos los datos del cuerpo de la solicitud
        const { name, description, dueDate } = req.body;

        // Verificamos que se proporcionen todos los campos requeridos
        if (!name || !description || !dueDate) {
            return res.status(400).json({ 
                error: 'Name, description and dueDate are required' 
            });
        }

        // Creamos una nueva tarea usando el modelo
        const newTask = new Task({
            name,
            description,
            dueDate: new Date(dueDate)
        });

        // Guardamos la tarea en la base de datos
        const savedTask = await newTask.save();
        
        // Respondemos con la tarea creada y un código de estado 201 (creado)
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({ 
            error: 'Internal server error', 
            message: error.message 
        });
    }
});

// ───── Endpoints DELETE ─────
/**
 * Endpoint para eliminar una tarea por su ID
 * El ID se proporciona como parámetro de ruta en la URL
 */
router.delete('/removeTask/:id', async (req, res) => {
    try {
        // Obtenemos el ID de los parámetros de ruta
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'ID is required' });
        }

        // Buscamos y eliminamos la tarea por ID
        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ 
                error: `Task with id ${id} not found` 
            });
        }

        // Respondemos con un mensaje de confirmación
        res.json({ 
            message: `Task ${id} deleted successfully`, 
            success: true,
            deletedTask 
        });
    } catch (error) {
        res.status(500).json({ 
            error: 'Internal server error', 
            message: error.message 
        });
    }
});

// ───── Exportamos el router ─────
export default router;