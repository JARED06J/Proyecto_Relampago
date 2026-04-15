/**
 * Formatea una fecha a string legible
 */
function formatDate(date) {
  if (!date) return null;
  return new Date(date).toLocaleString('es-CR', {
    timeZone: 'America/Costa_Rica',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Valida que una fecha de inicio sea anterior a una de fin
 */
function validarRangoFechas(fechaInicio, fechaFin) {
  const inicio = new Date(fechaInicio);
  const fin = new Date(fechaFin);
  if (isNaN(inicio.getTime()) || isNaN(fin.getTime())) {
    throw new Error('Fechas invalidas');
  }
  if (inicio >= fin) {
    throw new Error('La fecha de inicio debe ser anterior a la fecha de fin');
  }
  return true;
}

module.exports = { formatDate, validarRangoFechas };
