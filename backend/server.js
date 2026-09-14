// 1. Requerir Express y CORS
const express = require('express');
const cors = require('cors');
// Importa tu conexión a la base de datos MySQL (ajusta la ruta según tengas tu archivo db)
const db = require('./db'); 

// 2. CREAR LA INSTANCIA DE EXPRESS (¡Esto es lo que faltaba o estaba más abajo!)
const app = express();

// 3. Middlewares
app.use(cors()); // Permite peticiones desde el frontend
app.use(express.json()); // Permite procesar JSON en el cuerpo de las peticiones

// 4. Tus Endpoints / Rutas
app.get('/api/rutinas/generar', async (req, res) => {
    const { equipamiento, dificultad } = req.query;

    try {
        const [ejercicios] = await db.query(
            'SELECT * FROM ejercicios WHERE equipamiento = ? AND dificultad = ?',
            [equipamiento, dificultad]
        );

        res.json({
            status: 'ok',
            rutina: ejercicios
        });
    } catch (error) {
        console.error('Error al consultar MySQL:', error);
        res.status(500).json({ status: 'error', mensaje: 'Error al obtener la rutina' });
    }
});

// 5. Iniciar el servidor en el puerto 5000
const PUERTO = 5000;
app.listen(PUERTO, () => {
    console.log(`🚀 Servidor backend escuchando en http://localhost:${PUERTO}`);
});