const service = require('./aspirante.service');

async function getAll(req, res, next) {
  try { res.json(await service.listarAspirantes()); }
  catch (err) { next(err); }
}

async function getOne(req, res, next) {
  try { res.json(await service.obtenerAspirante(req.params.id)); }
  catch (err) { next(err); }
}

async function create(req, res, next) {
  try { res.status(201).json(await service.crearAspirante(req.body)); }
  catch (err) { next(err); }
}

async function update(req, res, next) {
  try { res.json(await service.actualizarAspirante(req.params.id, req.body)); }
  catch (err) { next(err); }
}

async function remove(req, res, next) {
  try {
    await service.eliminarAspirante(req.params.id);
    res.json({ mensaje: 'Aspirante eliminado correctamente' });
  } catch (err) { next(err); }
}

module.exports = { getAll, getOne, create, update, remove };
