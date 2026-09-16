// 1. Requerir Express,  CORS, cookie-parser y express-validator
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { query, validationResult } = require('express-validator');
// Importa tu conexión a la base de datos MySQL (ajusta la ruta según tengas tu archivo db)
const db = require('./db'); 

// 2. CREAR LA INSTANCIA DE EXPRESS (¡Esto es lo que faltaba o estaba más abajo!)
const app = express();

// 3. Middlewares
app.use(cors({
    origin: function (origin, callback) {
        // Permite peticiones locales (Live Server, 127.0.0.1, localhost, etc.)
        return callback(null, true);
    },
    credentials: true // Indispensable para las cookies
}));

app.use(express.json());
app.use(cookieParser('mi_secreto_super_seguro')); // Middleware para parsear cookies

app.get('/', (req, res) => {
    res.send('🚀 Servidor Backend de AnyWhereFit funcionando correctamente.');
});

// ==========================================
// 1. RUTA PARA MANEJAR COOKIES (Preferencia de usuario)
// ==========================================

// Guardar la última preferencia del usuario en una cookie
app.get('/api/preferencias', (req, res) => {
    const { lugar } = req.query;

    if (lugar) {
        // Guardamos la cookie por 7 días
        res.cookie('ultima_categoria', lugar, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días en milisegundos
            httpOnly: false, // Accesible desde JavaScript si fuera necesario
            sameSite: 'lax'
        });
        return res.json({ status: 'ok', mensaje: `Preferencia '${lugar}' guardada en cookie` });
    }

    // Si no pasa 'lugar', devolvemos la cookie existente
    const ultimaCategoria = req.cookies.ultima_categoria || 'ninguna';
    res.json({ status: 'ok', ultimaCategoria });
});


// ==========================================
// 2. RUTA CON EXPRESS-VALIDATOR
// ==========================================

app.get('/api/rutinas/generar', [
    // Reglas de validación usando express-validator
    query('equipamiento')
        .notEmpty().withMessage('El campo equipamiento es obligatorio.')
        .isIn(['casa', 'gimnasio', 'aire_libre']).withMessage('Equipamiento no válido.'),
    query('dificultad')
        .notEmpty().withMessage('El campo dificultad es obligatorio.')
        .isIn(['principiante', 'intermedio', 'avanzado']).withMessage('Dificultad no válida.')
], async (req, res) => {

    // 1. Comprobar si hubo errores de validación
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            mensaje: 'Datos de entrada inválidos',
            errores: errores.array()
        });
    }

    // 2. Si la validación pasa, ejecutamos la consulta SQL
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
        res.status(500).json({ status: 'error', mensaje: 'Error interno en el servidor' });
    }
});

const PUERTO = 5000;
app.listen(PUERTO, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PUERTO}`);
})