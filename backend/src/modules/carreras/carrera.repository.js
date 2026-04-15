const { getPool } = require('../../config/db');

async function findAll() {
  const pool = await getPool();
  const result = await pool.request().query(
    'SELECT id_carrera, nombre_carrera FROM carreras ORDER BY nombre_carrera'
  );
  return result.recordset;
}

async function findById(id) {
  const pool = await getPool();
  const result = await pool.request()
    .input('id', id)
    .query('SELECT id_carrera, nombre_carrera FROM carreras WHERE id_carrera = @id');
  return result.recordset[0] || null;
}

async function create({ nombre_carrera }) {
  const pool = await getPool();
  const result = await pool.request()
    .input('nombre_carrera', nombre_carrera)
    .query(`INSERT INTO carreras (nombre_carrera) OUTPUT INSERTED.id_carrera VALUES (@nombre_carrera)`);
  return findById(result.recordset[0].id_carrera);
}

async function update(id, { nombre_carrera }) {
  const pool = await getPool();
  await pool.request()
    .input('id', id)
    .input('nombre_carrera', nombre_carrera)
    .query('UPDATE carreras SET nombre_carrera = @nombre_carrera WHERE id_carrera = @id');
  return findById(id);
}

async function remove(id) {
  const pool = await getPool();
  const result = await pool.request()
    .input('id', id)
    .query('DELETE FROM carreras WHERE id_carrera = @id');
  return result.rowsAffected[0] > 0;
}

module.exports = { findAll, findById, create, update, remove };
