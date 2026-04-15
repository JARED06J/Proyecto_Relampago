const { getPool } = require('../../config/db');

async function findAll() {
  const pool = await getPool();
  const result = await pool.request().query(`
    SELECT a.id_aspirante, a.nombres, a.apellidos, a.email, a.telefono,
           a.id_carrera_elegida, c.nombre_carrera
    FROM aspirantes a
    LEFT JOIN carreras c ON a.id_carrera_elegida = c.id_carrera
    ORDER BY a.apellidos, a.nombres
  `);
  return result.recordset;
}

async function findById(id) {
  const pool = await getPool();
  const result = await pool.request()
    .input('id', id)
    .query(`
      SELECT a.id_aspirante, a.nombres, a.apellidos, a.email, a.telefono,
             a.id_carrera_elegida, c.nombre_carrera
      FROM aspirantes a
      LEFT JOIN carreras c ON a.id_carrera_elegida = c.id_carrera
      WHERE a.id_aspirante = @id
    `);
  return result.recordset[0] || null;
}

async function findByEmail(email) {
  const pool = await getPool();
  const result = await pool.request()
    .input('email', email)
    .query('SELECT * FROM aspirantes WHERE email = @email');
  return result.recordset[0] || null;
}

async function create({ nombres, apellidos, email, telefono, id_carrera_elegida }) {
  const pool = await getPool();
  const result = await pool.request()
    .input('nombres', nombres)
    .input('apellidos', apellidos)
    .input('email', email)
    .input('telefono', telefono || null)
    .input('id_carrera_elegida', id_carrera_elegida || null)
    .query(`
      INSERT INTO aspirantes (nombres, apellidos, email, telefono, id_carrera_elegida)
      OUTPUT INSERTED.id_aspirante
      VALUES (@nombres, @apellidos, @email, @telefono, @id_carrera_elegida)
    `);
  return findById(result.recordset[0].id_aspirante);
}

async function update(id, { nombres, apellidos, email, telefono, id_carrera_elegida }) {
  const pool = await getPool();
  await pool.request()
    .input('id', id)
    .input('nombres', nombres)
    .input('apellidos', apellidos)
    .input('email', email)
    .input('telefono', telefono || null)
    .input('id_carrera_elegida', id_carrera_elegida || null)
    .query(`
      UPDATE aspirantes
      SET nombres=@nombres, apellidos=@apellidos, email=@email,
          telefono=@telefono, id_carrera_elegida=@id_carrera_elegida
      WHERE id_aspirante=@id
    `);
  return findById(id);
}

async function remove(id) {
  const pool = await getPool();
  const result = await pool.request()
    .input('id', id)
    .query('DELETE FROM aspirantes WHERE id_aspirante = @id');
  return result.rowsAffected[0] > 0;
}

module.exports = { findAll, findById, findByEmail, create, update, remove };
