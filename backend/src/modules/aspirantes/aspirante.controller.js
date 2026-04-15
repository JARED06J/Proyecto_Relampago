const aspiranteService = require('./aspirante.service');

async function registrar(req, res, next) {
  try {
    const aspirante = await aspiranteService.registrarAspirante(req.body);
    res.status(201).json(aspirante);
  } catch (err) { next(err); }
}

async function login(req, res, next) {
  try {
    const result = await aspiranteService.loginAspirante(req.body);
    res.json(result);
  } catch (err) { next(err); }
}

async function obtener(req, res, next) {
  try {
    const aspirante = await aspiranteService.obtenerAspirante(req.params.id);
    res.json(aspirante);
  } catch (err) { next(err); }
}

async function actualizar(req, res, next) {
  try {
    const aspirante = await aspiranteService.actualizarAspirante(req.params.id, req.body);
    res.json(aspirante);
  } catch (err) { next(err); }
}

module.exports = { registrar, login, obtener, actualizar };