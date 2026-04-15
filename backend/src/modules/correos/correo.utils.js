function templateCitaAsignada(asignacion) {
  const fecha = asignacion.fecha ? new Date(asignacion.fecha).toLocaleDateString('es-CR') : '—';
  const horaI = asignacion.hora_inicio ? String(asignacion.hora_inicio).slice(0,5) : '—';
  const horaF = asignacion.hora_fin   ? String(asignacion.hora_fin).slice(0,5)   : '—';
  return {
    subject: `Cita de Matrícula Asignada - ${asignacion.nombre_carrera}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
        <h2 style="color:#1e40af;">Cita de Matrícula Asignada</h2>
        <p>Estimado/a <strong>${asignacion.nombres} ${asignacion.apellidos}</strong>,</p>
        <p>Se le ha asignado una cita de matrícula:</p>
        <table style="width:100%;border-collapse:collapse;margin:16px 0;">
          <tr style="background:#f3f4f6;">
            <td style="padding:10px;border:1px solid #e5e7eb;"><strong>Carrera</strong></td>
            <td style="padding:10px;border:1px solid #e5e7eb;">${asignacion.nombre_carrera}</td>
          </tr>
          <tr>
            <td style="padding:10px;border:1px solid #e5e7eb;"><strong>Fecha</strong></td>
            <td style="padding:10px;border:1px solid #e5e7eb;">${fecha}</td>
          </tr>
          <tr style="background:#f3f4f6;">
            <td style="padding:10px;border:1px solid #e5e7eb;"><strong>Horario</strong></td>
            <td style="padding:10px;border:1px solid #e5e7eb;">${horaI} - ${horaF}</td>
          </tr>
        </table>
        <p>Por favor preséntese puntualmente.</p>
        <p style="color:#6b7280;font-size:12px;">Correo automático, no responder.</p>
      </div>`,
  };
}

function templateAperturaMatricula(matricula) {
  return {
    subject: `Matrícula Abierta - ${matricula.nombre_carrera || 'Todas las carreras'}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
        <h2 style="color:#1e40af;">Proceso de Matrícula Abierto</h2>
        <p>El proceso de matrícula ha sido habilitado.</p>
        <p style="color:#6b7280;font-size:12px;">Correo automático, no responder.</p>
      </div>`,
  };
}

module.exports = { templateCitaAsignada, templateAperturaMatricula };
