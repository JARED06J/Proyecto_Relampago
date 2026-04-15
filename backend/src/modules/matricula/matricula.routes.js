<<<<<<< HEAD
// src/modules/matricula/matricula.routes.js
const express = require('express');
const router = express.Router();

const { consultarMasivo } = require('./matricula.controller');
const { filtrar } = require('./matricula.controller');

router.post('/consulta-email', consultarMasivo);
router.get('/', filtrar);

module.exports = router;
=======
const express = require('express');
const router = express.Router();
const ctrl = require('./matricula.controller');

router.get('/', ctrl.getAll);
router.get('/carrera/:id_carrera', ctrl.getByCarrera);
router.get('/:id', ctrl.getOne);
router.post('/', ctrl.create);          // PUNTO 2: Crear con fecha, hora_inicio, hora_fin
router.put('/:id', ctrl.update);        // PUNTO 2: Actualizar fechas/horas
router.delete('/:id', ctrl.remove);

module.exports = router;
>>>>>>> 952b4713e1c78fd3342135b0b25530836de5589e
