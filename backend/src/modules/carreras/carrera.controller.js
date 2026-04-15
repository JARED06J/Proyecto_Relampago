const service = require('./carrera.service');

async function getAll(req, res, next) {
  try {
    const data = await service.listarCarreras();
    res.json(data);
  } catch (err) { next(err); }
}

async function getOne(req, res, next) {
  try {
    const data = await service.obtenerCarrera(req.params.id);
    res.json(data);
  } catch (err) { next(err); }
}

async function create(req, res, next) {
  try {
    const data = await service.crearCarrera(req.body);
    res.status(201).json(data);
  } catch (err) { next(err); }
}

async function update(req, res, next) {
  try {
    const data = await service.actualizarCarrera(req.params.id, req.body);
    res.json(data);
  } catch (err) { next(err); }
}

async function remove(req, res, next) {
  try {
    await service.eliminarCarrera(req.params.id);
    res.json({ mensaje: 'Carrera eliminada correctamente' });
  } catch (err) { next(err); }
}

module.exports = { getAll, getOne, create, update, remove };
