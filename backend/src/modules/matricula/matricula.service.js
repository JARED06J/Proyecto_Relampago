const repo = require('./matricula.repository');

async function listarCitasMatricula() { return repo.findAll(); }

async function obtenerCitaMatricula(id) {
  const m = await repo.findById(id);
  if (!m) { const err = new Error('Cita de matricula no encontrada'); err.status = 404; throw err; }
  return m;
}

async function listarPorCarrera(id_carrera) {
  return repo.findByCarrera(id_carrera);
}

// PUNTO 2: Crear slot con fecha y horas
async function crearCitaMatricula(datos) {
  const { id_carrera, fecha, hora_inicio, hora_fin } = datos;
  if (!id_carrera || !fecha || !hora_inicio || !hora_fin) {
    const err = new Error('id_carrera, fecha, hora_inicio y hora_fin son requeridos');
    err.status = 400; throw err;
  }
  if (hora_inicio >= hora_fin) {
    const err = new Error('hora_inicio debe ser anterior a hora_fin');
    err.status = 400; throw err;
  }
  return repo.create(datos);
}

// PUNTO 2: Actualizar fecha y horas de la cita
async function actualizarCitaMatricula(id, datos) {
  await obtenerCitaMatricula(id);
  const { id_carrera, fecha, hora_inicio, hora_fin } = datos;
  if (!id_carrera || !fecha || !hora_inicio || !hora_fin) {
    const err = new Error('id_carrera, fecha, hora_inicio y hora_fin son requeridos');
    err.status = 400; throw err;
  }
  if (hora_inicio >= hora_fin) {
    const err = new Error('hora_inicio debe ser anterior a hora_fin');
    err.status = 400; throw err;
  }
  return repo.update(id, datos);
}

async function eliminarCitaMatricula(id) {
  await obtenerCitaMatricula(id);
  return repo.remove(id);
}

module.exports = {
  listarCitasMatricula, obtenerCitaMatricula, listarPorCarrera,
  crearCitaMatricula, actualizarCitaMatricula, eliminarCitaMatricula
};
