const { getConnection, sql } = require('../../config/db');

async function createAspirante({ nombres, apellidos, email, telefono, id_carrera_elegida }) {
  const pool = await getConnection();
  const result = await pool.request()
    .input('nombres', sql.VarChar(100), nombres)
    .input('apellidos', sql.VarChar(100), apellidos)
    .input('email', sql.VarChar(150), email)
    .input('telefono', sql.VarChar(20), telefono || null)
    .input('id_carrera_elegida', sql.Int, id_carrera_elegida || null)
    .query(`
      INSERT INTO admin_relampago.aspirantes (nombres, apellidos, email, telefono, id_carrera_elegida)
      OUTPUT INSERTED.*
      VALUES (@nombres, @apellidos, @email, @telefono, @id_carrera_elegida)
    `);
  return result.recordset[0];
}

async function getAspiranteById(id) {
  const pool = await getConnection();
  const result = await pool.request()
    .input('id', sql.Int, id)
    .query('SELECT * FROM admin_relampago.aspirantes WHERE id_aspirante = @id');
  return result.recordset[0];
}

async function getAspiranteByEmail(email) {
  const pool = await getConnection();
  const result = await pool.request()
    .input('email', sql.VarChar(150), email)
    .query('SELECT * FROM admin_relampago.aspirantes WHERE email = @email');
  return result.recordset[0];
}

async function updateAspirante(id, { nombres, apellidos, email, telefono, id_carrera_elegida }) {
  const pool = await getConnection();
  const result = await pool.request()
    .input('id', sql.Int, id)
    .input('nombres', sql.VarChar(100), nombres)
    .input('apellidos', sql.VarChar(100), apellidos)
    .input('email', sql.VarChar(150), email)
    .input('telefono', sql.VarChar(20), telefono || null)
    .input('id_carrera_elegida', sql.Int, id_carrera_elegida || null)
    .query(`
      UPDATE admin_relampago.aspirantes
      SET nombres = @nombres, apellidos = @apellidos, email = @email,
          telefono = @telefono, id_carrera_elegida = @id_carrera_elegida
      OUTPUT INSERTED.*
      WHERE id_aspirante = @id
    `);
  return result.recordset[0];
}

module.exports = { createAspirante, getAspiranteById, getAspiranteByEmail, updateAspirante };