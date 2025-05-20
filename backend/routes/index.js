import express from 'express';
const router = express.Router();

// Retornamos la vista de documentación usando Pug
router.get('/', (req, res) => {
    res.status(200).render('docs');
});

// Exportamos el router para usarlo en otros módulos
export default router;