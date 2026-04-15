const express = require('express');
const cors = require('cors');
const errorMiddleware = require('./middleware/error.middleware');

const carreraRoutes = require('./modules/carreras/carrera.routes');
const aspiranteRoutes = require('./modules/aspirantes/aspirante.routes');
const matriculaRoutes = require('./modules/matricula/matricula.routes');
const citaRoutes = require('./modules/citas/cita.routes');
const correoRoutes = require('./modules/correos/correo.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/carreras', carreraRoutes);
app.use('/api/aspirantes', aspiranteRoutes);
app.use('/api/matriculas', matriculaRoutes);
app.use('/api/citas', citaRoutes);
app.use('/api/correos', correoRoutes);     // PUNTO 1: Correos

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

app.use(errorMiddleware);

module.exports = app;
