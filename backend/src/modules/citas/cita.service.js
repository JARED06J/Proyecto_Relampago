const repo = require('./cita.repository');
const correoService = require('../correos/correo.service');

async function listarCitas() { return repo.findAll(); }

async function obtenerCita(id) {
  const c = await repo.findById(id);
  if (!c) { const err = new Error('Asignacion no encontrada'); err.status = 404; throw err; }
  return c;
}

// PUNTO 3: Listado de citas asignadas por carrera
async function listarCitasPorCarrera(id_carrera) {
  if (!id_carrera) { const err = new Error('Se requiere id_carrera'); err.status = 400; throw err; }
  return repo.findByCarrera(id_carrera);
}

async function crearAsignacion(datos) {
  const { id_aspirante, id_cita } = datos;
  if (!id_aspirante || !id_cita) {
    const err = new Error('id_aspirante e id_cita son requeridos'); err.status = 400; throw err;
  }
  const asignacion = await repo.create(datos);
  try { await correoService.notificarCitaAsignada(asignacion); }
  catch (e) { console.error('Error correo cita:', e.message); }
  return asignacion;
}

async function actualizarMatriculo(id, matriculo) {
  await obtenerCita(id);
  return repo.updateMatriculo(id, matriculo);
}

async function eliminarAsignacion(id) {
  await obtenerCita(id);
  return repo.remove(id);
}

module.exports = { listarCitas, obtenerCita, listarCitasPorCarrera, crearAsignacion, actualizarMatriculo, eliminarAsignacion };
