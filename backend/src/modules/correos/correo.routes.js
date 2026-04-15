const express = require('express');
const router = express.Router();
const ctrl = require('./correo.controller');

// PUNTO 1: Enviar correo manual personalizado
router.post('/enviar', ctrl.enviarManual);
// PUNTO 1: Envio masivo de correos de apertura de matricula
router.post('/masivo', ctrl.enviarMasivoMatricula);

module.exports = router;
