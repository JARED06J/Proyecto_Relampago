const correoService = require('./correo.service');

async function enviarManual(req, res, next) {
  try {
    await correoService.enviarCorreoPersonalizado(req.body);
    res.json({ mensaje: 'Correo enviado correctamente' });
  } catch (err) { next(err); }
}

async function enviarMasivoMatricula(req, res, next) {
  try {
    const { matricula, destinatarios } = req.body;
    if (!matricula || !destinatarios || !destinatarios.length) {
      return res.status(400).json({ error: 'matricula y destinatarios son requeridos' });
    }
    await correoService.notificarAperturaMatricula(matricula, destinatarios);
    res.json({ mensaje: `Correos enviados a ${destinatarios.length} destinatarios` });
  } catch (err) { next(err); }
}

module.exports = { enviarManual, enviarMasivoMatricula };
