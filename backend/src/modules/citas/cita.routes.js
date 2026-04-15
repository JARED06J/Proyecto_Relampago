const express = require('express');
const router = express.Router();
const ctrl = require('./cita.controller');

// Rutas para horarios disponibles (deben ir ANTES de las rutas con :id)
router.get('/disponibles', ctrl.getHorariosDisponibles);
router.get('/disponibles/carrera/:id_carrera', ctrl.getHorariosDisponiblesPorCarrera);

// Rutas existentes
router.get('/', ctrl.getAll);
router.get('/carrera/:id_carrera', ctrl.getByCarrera);
router.get('/:id', ctrl.getOne);
router.post('/', ctrl.create);
router.patch('/:id/matriculo', ctrl.updateMatriculo);
router.delete('/:id', ctrl.remove);

module.exports = router;