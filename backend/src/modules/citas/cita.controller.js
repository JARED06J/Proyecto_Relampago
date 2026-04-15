const service = require('./cita.service');

async function getAll(req, res, next) {
  try { res.json(await service.listarCitas()); } catch (err) { next(err); }
}

async function getOne(req, res, next) {
  try { res.json(await service.obtenerCita(req.params.id)); } catch (err) { next(err); }
}

async function getByCarrera(req, res, next) {
  try { res.json(await service.listarCitasPorCarrera(req.params.id_carrera)); } catch (err) { next(err); }
}

async function create(req, res, next) {
  try {
    console.log('POST /api/citas body recibido:', JSON.stringify(req.body));
    res.status(201).json(await service.crearAsignacion(req.body));
  } catch (err) { next(err); }
}

async function updateMatriculo(req, res, next) {
  try { res.json(await service.actualizarMatriculo(req.params.id, req.body.matriculo)); } catch (err) { next(err); }
}

async function remove(req, res, next) {
  try { await service.eliminarAsignacion(req.params.id); res.json({ mensaje: 'Eliminado' }); } catch (err) { next(err); }
}

async function getHorariosDisponibles(req, res, next) {
  try {
    const horarios = await service.listarHorariosDisponibles();
    res.json(horarios);
  } catch (err) {
    next(err);
  }
}

async function getHorariosDisponiblesPorCarrera(req, res, next) {
  try {
    const horarios = await service.listarHorariosDisponiblesPorCarrera(req.params.id_carrera);
    res.json(horarios);
  } catch (err) {
    next(err);
  }
}

// EXPORTAR TODAS LAS FUNCIONES
module.exports = { 
    getAll, 
    getOne, 
    getByCarrera, 
    create, 
    updateMatriculo, 
    remove,
    getHorariosDisponibles,
    getHorariosDisponiblesPorCarrera
};