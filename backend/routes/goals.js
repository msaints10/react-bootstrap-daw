import express from 'express';
import Goal from '../models/goals.js';

const router = express.Router();

// ───── Endpoints GET ─────
// Endpoint para obtener todas las metas
router.get('/getGoals', async (req, res) => {
    try {
        const goals = await Goal.find().sort({ createdAt: -1 });
        res.status(200).json(goals);
    } catch (error) {
        res.status(500).json({ 
            error: 'Internal server error', 
            message: error.message 
        });
    }
});

// ───── Endpoints POST ─────
/**
 * Endpoint para añadir una nueva meta
 * Espera recibir name, description y dueDate en el cuerpo de la solicitud
 */
router.post('/addGoal', async (req, res) => {
    try {
        // Extraemos los datos del cuerpo de la solicitud
        const { name, description, dueDate } = req.body;

        // Verificamos si se proporcionaron todos los campos requeridos
        if (!name || !description || !dueDate) {
            return res.status(400).json({
                error: 'Name, description and dueDate are required fields'
            });
        }

        // Creamos una nueva meta usando el modelo
        const newGoal = new Goal({
            name,
            description,
            dueDate: new Date(dueDate)
        });

        // Guardamos la meta en la base de datos
        const savedGoal = await newGoal.save();
        
        // Respondemos con la meta creada y un código de estado 201 (creado)
        res.status(201).json(savedGoal);
    } catch (error) {
        res.status(500).json({ 
            error: 'Internal server error', 
            message: error.message 
        });
    }
});

// ───── Endpoints DELETE ─────
/**
 * Endpoint para eliminar una meta por su ID
 * El ID se proporciona como parámetro de ruta en la URL
 */
router.delete('/removeGoal/:id', async (req, res) => {
    try {
        // Obtenemos el ID de los parámetros de ruta
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'ID is required' });
        }

        // Buscamos y eliminamos la meta por ID
        const deletedGoal = await Goal.findByIdAndDelete(id);

        if (!deletedGoal) {
            return res.status(404).json({ 
                error: `Goal with id ${id} not found` 
            });
        }

        // Respondemos con un mensaje de confirmación
        res.json({ 
            message: `Goal ${id} deleted successfully`, 
            success: true,
            deletedGoal 
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