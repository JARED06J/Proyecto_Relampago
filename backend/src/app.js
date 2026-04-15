const express = require('express');
const cors = require('cors');
const path = require('path'); 
const errorMiddleware = require('./middleware/error.middleware');

const carreraRoutes = require('./modules/carreras/carrera.routes');
const aspiranteRoutes = require('./modules/aspirantes/aspirante.routes');
const matriculaRoutes = require('./modules/matricula/matricula.routes');
const citaRoutes = require('./modules/citas/cita.routes');
const correoRoutes = require('./modules/correos/correo.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  

// ==================== SERVIR FRONTEND ====================
// Servir archivos estáticos del frontend (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../../frontend')));

// Rutas principales del frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/login-aspirante.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/login-aspirante.html'));
});

app.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/registro-aspirante.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dashboard-aspirante.html'));
});
// ==================== FIN FRONTEND ====================

// ==================== RUTAS API ====================
app.use('/api/carreras', carreraRoutes);
app.use('/api/aspirantes', aspiranteRoutes);
app.use('/api/matriculas', matriculaRoutes);
app.use('/api/citas', citaRoutes);
app.use('/api/correos', correoRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date() });
});
// ==================== FIN RUTAS API ====================

// ==================== RUTA 404 ====================
// Para manejar rutas no encontradas (API)
app.use('/api/*', (req, res) => {
    res.status(404).json({ message: 'Ruta API no encontrada' });
});


app.use(errorMiddleware);

module.exports = app;