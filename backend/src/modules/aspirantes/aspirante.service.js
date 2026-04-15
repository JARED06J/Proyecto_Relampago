const repo = require('./aspirante.repository');

async function listarAspirantes() { return repo.findAll(); }

async function obtenerAspirante(id) {
  const a = await repo.findById(id);
  if (!a) { const err = new Error('Aspirante no encontrado'); err.status = 404; throw err; }
  return a;
}

async function crearAspirante(datos) {
  const { nombres, apellidos, email } = datos;
  if (!nombres || !apellidos || !email) {
    const err = new Error('nombres, apellidos y email son requeridos'); err.status = 400; throw err;
  }
  const existe = await repo.findByEmail(email);
  if (existe) { const err = new Error('Ya existe un aspirante con ese email'); err.status = 409; throw err; }
  return repo.create(datos);
}

async function actualizarAspirante(id, datos) {
  await obtenerAspirante(id);
  return repo.update(id, datos);
}

async function eliminarAspirante(id) {
  await obtenerAspirante(id);
  return repo.remove(id);
}

module.exports = { listarAspirantes, obtenerAspirante, crearAspirante, actualizarAspirante, eliminarAspirante };
