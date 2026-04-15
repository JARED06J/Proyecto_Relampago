<<<<<<< HEAD
// src/modules/matricula/matricula.service.js
// matricula.service.js
const repository = require('./matricula.repository');

const consultarMasivo = async (emails) => {
    if (!Array.isArray(emails)) {
        throw new Error("El formato debe ser un arreglo de emails");
    }

    return await repository.consultarPorEmails(emails);
};

const filtrarPorEstado = async (matriculo) => {
    if (matriculo !== undefined) {
        const valor = parseInt(matriculo);

        if (valor !== 0 && valor !== 1) {
            throw new Error("El valor debe ser 0 o 1");
        }

        return await repository.filtrarPorEstado(valor);
    }

    return await repository.filtrarPorEstado();
};

module.exports = {
    consultarMasivo,
    filtrarPorEstado 
};
=======
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
>>>>>>> 952b4713e1c78fd3342135b0b25530836de5589e
