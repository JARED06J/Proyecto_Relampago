// src/modules/matricula/matricula.controller.js
const service = require('./matricula.service');

const consultarMasivo = async (req, res) => {
    try {
        const { emails } = req.body;

        const data = await service.consultarMasivo(emails);

        res.json({
            ok: true,
            data
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            message: error.message
        });
    }
};
const filtrar = async (req, res) => {
    try {
        const { matriculo } = req.query;

        const data = await service.filtrarPorEstado(matriculo);

        res.json({
            ok: true,
            data
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            message: error.message
        });
    }
};
module.exports = {
    consultarMasivo,
    filtrar
};