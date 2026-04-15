const repo = require('./carrera.repository');

async function listarCarreras() {
  return repo.findAll();
}

async function obtenerCarrera(id) {
  const c = await repo.findById(id);
  if (!c) { const err = new Error('Carrera no encontrada'); err.status = 404; throw err; }
  return c;
}

async function crearCarrera(datos) {
  if (!datos.nombre_carrera) { const err = new Error('nombre_carrera es requerido'); err.status = 400; throw err; }
  return repo.create(datos);
}

async function actualizarCarrera(id, datos) {
  await obtenerCarrera(id);
  return repo.update(id, datos);
}

async function eliminarCarrera(id) {
  await obtenerCarrera(id);
  return repo.remove(id);
}

module.exports = { listarCarreras, obtenerCarrera, crearCarrera, actualizarCarrera, eliminarCarrera };
