// app.js
const express = require('express');
const app = express();

app.use(express.json());

// rutas
const matriculaRoutes = require('./src/modules/matricula/matricula.routes');
app.use('/api/matricula', matriculaRoutes);

module.exports = app;