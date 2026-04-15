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