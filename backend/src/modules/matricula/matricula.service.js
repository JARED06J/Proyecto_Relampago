// src/modules/matricula/matricula.service.js

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

const obtenerPorCarrera = async (idCarrera) => {
    if (!idCarrera) {
        throw new Error("Debe enviar el id de la carrera");
    }

    return await repository.obtenerMatriculadosPorCarrera(idCarrera);
};

const listarCitasMatricula = async () => {
    return await repository.findAll();
};

const obtenerCitaMatricula = async (id) => {
    const m = await repository.findById(id);
    if (!m) {
        const err = new Error('Cita de matrícula no encontrada');
        err.status = 404;
        throw err;
    }
    return m;
};

const listarPorCarrera = async (idCarrera) => {
    return await repository.findByCarrera(idCarrera);
};

const crearCitaMatricula = async (datos) => {
    const { id_carrera, fecha, hora_inicio, hora_fin } = datos;

    if (!id_carrera || !fecha || !hora_inicio || !hora_fin) {
        throw new Error('Todos los campos son requeridos');
    }

    if (hora_inicio >= hora_fin) {
        throw new Error('hora_inicio debe ser menor que hora_fin');
    }

    return await repository.create(datos);
};

const actualizarCitaMatricula = async (id, datos) => {
    await obtenerCitaMatricula(id);

    const { id_carrera, fecha, hora_inicio, hora_fin } = datos;

    if (!id_carrera || !fecha || !hora_inicio || !hora_fin) {
        throw new Error('Todos los campos son requeridos');
    }

    if (hora_inicio >= hora_fin) {
        throw new Error('hora_inicio debe ser menor que hora_fin');
    }

    return await repository.update(id, datos);
};

const eliminarCitaMatricula = async (id) => {
    await obtenerCitaMatricula(id);
    return await repository.remove(id);
};


const enviarCorreos = async ({ tipo, valor, asunto, mensaje }) => {
    let destinatarios = [];

    if (!asunto || !mensaje) {
        throw new Error("Asunto y mensaje son requeridos");
    }

    switch (tipo) {
        case 'carrera':
            destinatarios = await repository.obtenerMatriculadosPorCarrera(valor);
            break;

        case 'estado':
            destinatarios = await repository.filtrarPorEstado(valor);
            break;

        case 'emails':
            destinatarios = await repository.consultarPorEmails(valor);
            break;

        default:
            throw new Error("Tipo inválido (carrera, estado, emails)");
    }

    // 🔥 Simulación de envío
    const enviados = destinatarios.map(d => ({
        email: d.email,
        estado: "ENVIADO"
    }));

    console.log("📨 Correos enviados:");
    enviados.forEach(e => console.log(`✔ ${e.email}`));

    return {
        total: enviados.length,
        enviados
    };
};

module.exports = {
    consultarMasivo,
    filtrarPorEstado,
    obtenerPorCarrera,
    enviarCorreos,

    listarCitasMatricula,
    obtenerCitaMatricula,
    listarPorCarrera,
    crearCitaMatricula,
    actualizarCitaMatricula,
    eliminarCitaMatricula
};