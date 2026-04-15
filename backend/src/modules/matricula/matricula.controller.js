<<<<<<< HEAD
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
=======
const service = require('./matricula.service');

async function getAll(req, res, next) {
  try { res.json(await service.listarCitasMatricula()); } catch (err) { next(err); }
}
async function getOne(req, res, next) {
  try { res.json(await service.obtenerCitaMatricula(req.params.id)); } catch (err) { next(err); }
}
async function getByCarrera(req, res, next) {
  try { res.json(await service.listarPorCarrera(req.params.id_carrera)); } catch (err) { next(err); }
}
async function create(req, res, next) {
  try { res.status(201).json(await service.crearCitaMatricula(req.body)); } catch (err) { next(err); }
}
async function update(req, res, next) {
  try { res.json(await service.actualizarCitaMatricula(req.params.id, req.body)); } catch (err) { next(err); }
}
async function remove(req, res, next) {
  try { await service.eliminarCitaMatricula(req.params.id); res.json({ mensaje: 'Eliminado' }); } catch (err) { next(err); }
}

module.exports = { getAll, getOne, getByCarrera, create, update, remove };
>>>>>>> 952b4713e1c78fd3342135b0b25530836de5589e
