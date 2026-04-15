const express = require('express');
const router = express.Router();
const ctrl = require('./cita.controller');

router.get('/', ctrl.getAll);
router.get('/carrera/:id_carrera', ctrl.getByCarrera);   // PUNTO 3
router.get('/:id', ctrl.getOne);
router.post('/', ctrl.create);
router.patch('/:id/matriculo', ctrl.updateMatriculo);
router.delete('/:id', ctrl.remove);



router.get('/disponibles', ctrl.getHorariosDisponibles);
router.get('/disponibles/carrera/:id_carrera', ctrl.getHorariosDisponiblesPorCarrera);


router.get('/', ctrl.getAll);
router.get('/carrera/:id_carrera', ctrl.getByCarrera);
router.get('/:id', ctrl.getOne);
router.post('/', ctrl.create);
router.patch('/:id/matriculo', ctrl.updateMatriculo);
router.delete('/:id', ctrl.remove);

module.exports = router;
