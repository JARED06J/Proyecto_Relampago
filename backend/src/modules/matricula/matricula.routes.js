// src/modules/matricula/matricula.routes.js
const express = require('express');
const router = express.Router();

const { consultarMasivo } = require('./matricula.controller');
const { filtrar } = require('./matricula.controller');

router.post('/consulta-email', consultarMasivo);
router.get('/', filtrar);

module.exports = router;