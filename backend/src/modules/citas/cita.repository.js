const { getPool } = require('../../config/db');

// PUNTO 3: asignacion_citas — join con aspirantes y citas_matricula

async function findAll() {
  const pool = await getPool();
  const result = await pool.request().query(`
    SELECT ac.id_asignacion, ac.matriculo,
           a.id_aspirante, a.nombres, a.apellidos, a.email,
           cm.id_cita, cm.fecha, cm.hora_inicio, cm.hora_fin,
           c.id_carrera, c.nombre_carrera
    FROM asignacion_citas ac
    INNER JOIN aspirantes a       ON ac.id_aspirante = a.id_aspirante
    INNER JOIN citas_matricula cm ON ac.id_cita       = cm.id_cita
    INNER JOIN carreras c         ON cm.id_carrera    = c.id_carrera
    ORDER BY cm.fecha, cm.hora_inicio
  `);
  return result.recordset;
}

async function findById(id) {
  const pool = await getPool();
  const result = await pool.request()
    .input('id', id)
    .query(`
      SELECT ac.id_asignacion, ac.matriculo,
             a.id_aspirante, a.nombres, a.apellidos, a.email,
             cm.id_cita, cm.fecha, cm.hora_inicio, cm.hora_fin,
             c.id_carrera, c.nombre_carrera
      FROM asignacion_citas ac
      INNER JOIN aspirantes a       ON ac.id_aspirante = a.id_aspirante
      INNER JOIN citas_matricula cm ON ac.id_cita       = cm.id_cita
      INNER JOIN carreras c         ON cm.id_carrera    = c.id_carrera
      WHERE ac.id_asignacion = @id
    `);
  return result.recordset[0] || null;
}

// PUNTO 3: Listado completo de citas asignadas filtrado por carrera
async function findByCarrera(id_carrera) {
  const pool = await getPool();
  const result = await pool.request()
    .input('id_carrera', id_carrera)
    .query(`
      SELECT ac.id_asignacion, ac.matriculo,
             a.id_aspirante, a.nombres, a.apellidos, a.email,
             cm.id_cita, cm.fecha, cm.hora_inicio, cm.hora_fin,
             c.id_carrera, c.nombre_carrera
      FROM asignacion_citas ac
      INNER JOIN aspirantes a       ON ac.id_aspirante = a.id_aspirante
      INNER JOIN citas_matricula cm ON ac.id_cita       = cm.id_cita
      INNER JOIN carreras c         ON cm.id_carrera    = c.id_carrera
      WHERE c.id_carrera = @id_carrera
      ORDER BY cm.fecha, cm.hora_inicio
    `);
  return result.recordset;
}

async function create({ id_aspirante, id_cita }) {
  const pool = await getPool();
  const result = await pool.request()
    .input('id_aspirante', id_aspirante)
    .input('id_cita', id_cita)
    .query(`
      INSERT INTO asignacion_citas (id_aspirante, id_cita, matriculo)
      OUTPUT INSERTED.id_asignacion
      VALUES (@id_aspirante, @id_cita, NULL)
    `);
  return findById(result.recordset[0].id_asignacion);
}

async function updateMatriculo(id, matriculo) {
  const pool = await getPool();
  await pool.request()
    .input('id', id)
    .input('matriculo', matriculo ? 1 : 0)
    .query('UPDATE asignacion_citas SET matriculo = @matriculo WHERE id_asignacion = @id');
  return findById(id);
}

async function remove(id) {
  const pool = await getPool();
  const result = await pool.request()
    .input('id', id)
    .query('DELETE FROM asignacion_citas WHERE id_asignacion = @id');
  return result.rowsAffected[0] > 0;
}



// Agrega esta función al final del archivo, antes de module.exports

// Obtener horarios disponibles (citas_matricula que no están asignadas)
async function findHorariosDisponibles() {
  const pool = await getPool();
  const result = await pool.request().query(`
    SELECT 
      cm.id_cita,
      cm.fecha,
      cm.hora_inicio,
      cm.hora_fin,
      c.id_carrera,
      c.nombre_carrera,
      CASE 
        WHEN ac.id_asignacion IS NOT NULL THEN 'asignada'
        ELSE 'disponible'
      END as estado
    FROM citas_matricula cm
    INNER JOIN carreras c ON cm.id_carrera = c.id_carrera
    LEFT JOIN asignacion_citas ac ON cm.id_cita = ac.id_cita
    WHERE ac.id_asignacion IS NULL  -- Solo las no asignadas
    ORDER BY cm.fecha, cm.hora_inicio
  `);
  return result.recordset;
}

// Obtener horarios disponibles por carrera
async function findHorariosDisponiblesByCarrera(id_carrera) {
  const pool = await getPool();
  const result = await pool.request()
    .input('id_carrera', id_carrera)
    .query(`
      SELECT 
        cm.id_cita,
        cm.fecha,
        cm.hora_inicio,
        cm.hora_fin,
        c.id_carrera,
        c.nombre_carrera
      FROM citas_matricula cm
      INNER JOIN carreras c ON cm.id_carrera = c.id_carrera
      LEFT JOIN asignacion_citas ac ON cm.id_cita = ac.id_cita
      WHERE cm.id_carrera = @id_carrera AND ac.id_asignacion IS NULL
      ORDER BY cm.fecha, cm.hora_inicio
    `);
  return result.recordset;
}


module.exports = { 
    findAll,
    findById, 
    findByCarrera, 
    create, 
    updateMatriculo, 
    remove,
    findHorariosDisponibles,
    findHorariosDisponiblesByCarrera
};








