const { getConnection, sql } = require('../../config/db');

async function createAspirante({ nombre, apellidos, email, telefono, id_carrera_elegida, password_hash }) {
  const pool = await getConnection();
  const result = await pool.request()
    .input('nombre', sql.VarChar(100), nombre)
    .input('apellidos', sql.VarChar(100), apellidos)
    .input('email', sql.VarChar(150), email)
    .input('telefono', sql.VarChar(20), telefono || null)
    .input('id_carrera_elegida', sql.Int, id_carrera_elegida || null)
    .input('password_hash', sql.VarChar(255), password_hash)
    .query(`
      INSERT INTO admin_relampago.aspirantes 
        (nombre, apellidos, email, telefono, id_carrera_elegida, password_hash)
      OUTPUT INSERTED.*
      VALUES (@nombre, @apellidos, @email, @telefono, @id_carrera_elegida, @password_hash)
    `);
  return result.recordset[0];
}

async function getAspiranteById(id) {
  const pool = await getConnection();
  const result = await pool.request()
    .input('id', sql.Int, id)
    .query(`
      SELECT a.*, c.nombre_carrera
      FROM admin_relampago.aspirantes a
      LEFT JOIN admin_relampago.carreras c ON a.id_carrera_elegida = c.id_carrera
      WHERE a.id_aspirante = @id
    `);
  return result.recordset[0];
}

async function getAspiranteByEmail(email) {
  const pool = await getConnection();
  const result = await pool.request()
    .input('email', sql.VarChar(150), email)
    .query('SELECT * FROM admin_relampago.aspirantes WHERE email = @email');
  return result.recordset[0];
}

async function updateAspirante(id, { nombre, apellidos, email, telefono, id_carrera_elegida }) {
  const pool = await getConnection();
  const result = await pool.request()
    .input('id', sql.Int, id)
    .input('nombre', sql.VarChar(100), nombre)
    .input('apellidos', sql.VarChar(100), apellidos)
    .input('email', sql.VarChar(150), email)
    .input('telefono', sql.VarChar(20), telefono || null)
    .input('id_carrera_elegida', sql.Int, id_carrera_elegida || null)
    .query(`
      UPDATE admin_relampago.aspirantes
      SET nombre = @nombre, apellidos = @apellidos, email = @email,
          telefono = @telefono, id_carrera_elegida = @id_carrera_elegida
      OUTPUT INSERTED.*
      WHERE id_aspirante = @id
    `);
  return result.recordset[0];
}

module.exports = { createAspirante, getAspiranteById, getAspiranteByEmail, updateAspirante };