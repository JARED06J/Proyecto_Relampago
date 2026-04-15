const express = require('express');
const router = express.Router();
const ctrl = require('./aspirante.controller');

// POST /api/aspirantes        → Registrar aspirante (nombres, apellidos, email, telefono, id_carrera_elegida)
router.post('/', ctrl.crear);

// GET /api/aspirantes/:id     → Ver datos de un aspirante
router.get('/:id', ctrl.obtener);

// PUT /api/aspirantes/:id     → Actualizar datos personales y carrera elegida
router.put('/:id', ctrl.actualizar);

module.exports = router;