const express = require('express');
const router = express.Router();

const {
    consultarMasivo,
    filtrar,
    obtenerPorCarrera,
    getAll,
    getOne,
    getByCarrera,
    create,
    update,
    remove,
    enviarCorreos
} = require('./matricula.controller');


router.post('/consulta-email', consultarMasivo);
router.get('/', filtrar);
router.post('/enviar-correos', enviarCorreos);

router.get('/matriculados/carrera/:idCarrera', obtenerPorCarrera);

router.get('/citas', getAll);
router.get('/citas/:id', getOne);
router.get('/citas/carrera/:id_carrera', getByCarrera);
router.post('/citas', create);
router.put('/citas/:id', update);
router.delete('/citas/:id', remove);

module.exports = router;