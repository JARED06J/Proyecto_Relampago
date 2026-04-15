// app.js
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

// rutas
const matriculaRoutes = require('./src/modules/matricula/matricula.routes');
app.use('/api/matricula', matriculaRoutes);

module.exports = app;