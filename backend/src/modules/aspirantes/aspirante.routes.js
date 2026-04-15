const express = require('express');
const router = express.Router();
const ctrl = require('./aspirante.controller');

// POST /api/aspirantes/registro  → Registrar nuevo aspirante
router.post('/registro', ctrl.registrar);

// POST /api/aspirantes/login     → Iniciar sesión
router.post('/login', ctrl.login);

// GET /api/aspirantes/:id        → Ver datos de un aspirante
router.get('/:id', ctrl.obtener);

// PUT /api/aspirantes/:id        → Actualizar datos personales
router.put('/:id', ctrl.actualizar);

module.exports = router;