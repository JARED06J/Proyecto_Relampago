const bcrypt = require('bcrypt');
const aspiranteRepo = require('./aspirante.repository');

async function registrarAspirante(datos) {
  const { nombre, apellidos, email, password, telefono, id_carrera_elegida } = datos;

  if (!nombre || !apellidos || !email || !password) {
    throw { status: 400, message: 'Nombre, apellidos, email y contraseña son obligatorios' };
  }

  if (password.length < 6) {
    throw { status: 400, message: 'La contraseña debe tener al menos 6 caracteres' };
  }

  const existe = await aspiranteRepo.getAspiranteByEmail(email);
  if (existe) throw { status: 409, message: 'Ya existe un aspirante con ese email' };

  const password_hash = await bcrypt.hash(password, 10);

  const aspirante = await aspiranteRepo.createAspirante({
    nombre,
    apellidos,
    email,
    telefono,
    id_carrera_elegida,
    password_hash
  });

  // No devolver el hash al cliente
  const { password_hash: _, ...aspiranteSinHash } = aspirante;
  return aspiranteSinHash;
}

async function loginAspirante({ email, password }) {
  if (!email || !password) {
    throw { status: 400, message: 'Email y contraseña son obligatorios' };
  }

  const aspirante = await aspiranteRepo.getAspiranteByEmail(email);
  if (!aspirante) {
    throw { status: 401, message: 'Credenciales incorrectas' };
  }

  const valido = await bcrypt.compare(password, aspirante.password_hash);
  if (!valido) {
    throw { status: 401, message: 'Credenciales incorrectas' };
  }

  // No devolver el hash al cliente
  const { password_hash: _, ...aspiranteSinHash } = aspirante;
  return { aspirante: aspiranteSinHash };
}

async function obtenerAspirante(id) {
  const aspirante = await aspiranteRepo.getAspiranteById(id);
  if (!aspirante) throw { status: 404, message: 'Aspirante no encontrado' };

  const { password_hash: _, ...aspiranteSinHash } = aspirante;
  return aspiranteSinHash;
}

async function actualizarAspirante(id, datos) {
  const aspirante = await aspiranteRepo.getAspiranteById(id);
  if (!aspirante) throw { status: 404, message: 'Aspirante no encontrado' };

  const actualizado = await aspiranteRepo.updateAspirante(id, datos);
  const { password_hash: _, ...aspiranteSinHash } = actualizado;
  return aspiranteSinHash;
}

module.exports = { registrarAspirante, loginAspirante, obtenerAspirante, actualizarAspirante };