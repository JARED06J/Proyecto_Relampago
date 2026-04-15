const nodemailer = require('nodemailer');
const { templateCitaAsignada, templateAperturaMatricula } = require('./correo.utils');

// Si no hay credenciales configuradas devuelve null → modo consola (igual que AcordesAcademy)
function crearTransportador() {
  const user = process.env.MAIL_USER;
  const pass = process.env.MAIL_PASS;
  if (!user || !pass || user.includes('tu_correo')) return null;

  return nodemailer.createTransport({
    host: process.env.MAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.MAIL_PORT) || 587,
    secure: parseInt(process.env.MAIL_PORT) === 465,
    auth: { user, pass },
  });
}

async function enviarCorreo({ to, subject, html }) {
  const transporter = crearTransportador();

  // Sin credenciales → imprime en consola (modo desarrollo)
  if (!transporter) {
    console.log('\n========== [MAILER DEV] ==========');
    console.log(`Para:    ${to}`);
    console.log(`Asunto:  ${subject}`);
    console.log('(Configura MAIL_USER y MAIL_PASS en .env para envío real)');
    console.log('===================================\n');
    return { messageId: 'dev-mode' };
  }

  // Con credenciales → envío real
  const info = await transporter.sendMail({
    from: process.env.MAIL_FROM || process.env.MAIL_USER,
    to, subject, html,
  });
  console.log(`Correo enviado a ${to}: ${info.messageId}`);
  return info;
}

// PUNTO 1: Notificar cita asignada al aspirante
async function notificarCitaAsignada(asignacion) {
  const { subject, html } = templateCitaAsignada(asignacion);
  return enviarCorreo({ to: asignacion.email, subject, html });
}

// PUNTO 1: Correo masivo de apertura de matricula
async function notificarAperturaMatricula(matricula, destinatarios = []) {
  const { subject, html } = templateAperturaMatricula(matricula);
  if (!destinatarios.length) return;
  return Promise.all(destinatarios.map(email => enviarCorreo({ to: email, subject, html })));
}

// PUNTO 1: Correo personalizado manual
async function enviarCorreoPersonalizado({ to, subject, html }) {
  if (!to || !subject || !html) {
    const err = new Error('to, subject y html son requeridos'); err.status = 400; throw err;
  }
  return enviarCorreo({ to, subject, html });
}

module.exports = { notificarCitaAsignada, notificarAperturaMatricula, enviarCorreoPersonalizado };
