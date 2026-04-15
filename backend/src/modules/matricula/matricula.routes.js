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
