const CitaModel = {
  tabla: 'citas',
  campos: ['id', 'aspirante_id', 'carrera_id', 'matricula_id', 'fecha_hora', 'estado', 'notas', 'created_at'],
  estados: ['pendiente', 'confirmada', 'cancelada'],
};

module.exports = CitaModel;
