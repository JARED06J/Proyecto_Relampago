const aspiranteRepo = require('./aspirante.repository');

async function registrarAspirante(datos) {
  // Validar campos requeridos
  if (!datos.nombres || !datos.apellidos || !datos.email) {
    throw { status: 400, message: 'Nombres, apellidos y email son obligatorios' };
  }

  // Verificar que no exista ya ese email
  const existe = await aspiranteRepo.getAspiranteByEmail(datos.email);
  if (existe) throw { status: 409, message: 'Ya existe un aspirante con ese email' };

  return await aspiranteRepo.createAspirante(datos);
}

async function obtenerAspirante(id) {
  const aspirante = await aspiranteRepo.getAspiranteById(id);
  if (!aspirante) throw { status: 404, message: 'Aspirante no encontrado' };
  return aspirante;
}

async function actualizarAspirante(id, datos) {
  const aspirante = await aspiranteRepo.getAspiranteById(id);
  if (!aspirante) throw { status: 404, message: 'Aspirante no encontrado' };
  return await aspiranteRepo.updateAspirante(id, datos);
}

module.exports = { registrarAspirante, obtenerAspirante, actualizarAspirante };