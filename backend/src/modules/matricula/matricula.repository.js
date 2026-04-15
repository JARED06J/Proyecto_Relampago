<<<<<<< HEAD
// src/modules/matricula/matricula.repository.js
const { pool, poolConnect, sql } = require('../../config/db');
=======
const { getPool } = require('../../config/db');

// PUNTO 2: tabla citas_matricula — fecha, hora_inicio, hora_fin

async function findAll() {
  const pool = await getPool();
  const result = await pool.request().query(`
    SELECT cm.id_cita, cm.fecha, cm.hora_inicio, cm.hora_fin,
           cm.id_carrera, c.nombre_carrera
    FROM citas_matricula cm
    INNER JOIN carreras c ON cm.id_carrera = c.id_carrera
    ORDER BY cm.fecha, cm.hora_inicio
  `);
  return result.recordset;
}

async function findById(id) {
  const pool = await getPool();
  const result = await pool.request()
    .input('id', id)
    .query(`
      SELECT cm.id_cita, cm.fecha, cm.hora_inicio, cm.hora_fin,
             cm.id_carrera, c.nombre_carrera
      FROM citas_matricula cm
      INNER JOIN carreras c ON cm.id_carrera = c.id_carrera
      WHERE cm.id_cita = @id
    `);
  return result.recordset[0] || null;
}

async function findByCarrera(id_carrera) {
  const pool = await getPool();
  const result = await pool.request()
    .input('id_carrera', id_carrera)
    .query(`
      SELECT cm.id_cita, cm.fecha, cm.hora_inicio, cm.hora_fin,
             cm.id_carrera, c.nombre_carrera
      FROM citas_matricula cm
      INNER JOIN carreras c ON cm.id_carrera = c.id_carrera
      WHERE cm.id_carrera = @id_carrera
      ORDER BY cm.fecha, cm.hora_inicio
    `);
  return result.recordset;
}

// PUNTO 2: Crear slot con fecha, hora_inicio y hora_fin
async function create({ id_carrera, fecha, hora_inicio, hora_fin }) {
  const pool = await getPool();
  const result = await pool.request()
    .input('id_carrera', id_carrera)
    .input('fecha', fecha)
    .input('hora_inicio', hora_inicio)
    .input('hora_fin', hora_fin)
    .query(`
      INSERT INTO citas_matricula (id_carrera, fecha, hora_inicio, hora_fin)
      OUTPUT INSERTED.id_cita
      VALUES (@id_carrera, @fecha, @hora_inicio, @hora_fin)
    `);
  return findById(result.recordset[0].id_cita);
}

// PUNTO 2: Actualizar fecha, hora_inicio y hora_fin
async function update(id, { id_carrera, fecha, hora_inicio, hora_fin }) {
  const pool = await getPool();
  await pool.request()
    .input('id', id)
    .input('id_carrera', id_carrera)
    .input('fecha', fecha)
    .input('hora_inicio', hora_inicio)
    .input('hora_fin', hora_fin)
    .query(`
      UPDATE citas_matricula
      SET id_carrera = @id_carrera,
          fecha      = @fecha,
          hora_inicio = @hora_inicio,
          hora_fin    = @hora_fin
      WHERE id_cita = @id
    `);
  return findById(id);
}

async function remove(id) {
  const pool = await getPool();
  const result = await pool.request()
    .input('id', id)
    .query('DELETE FROM citas_matricula WHERE id_cita = @id');
  return result.rowsAffected[0] > 0;
}
>>>>>>> 952b4713e1c78fd3342135b0b25530836de5589e

const consultarPorEmails = async (emails) => {
    await poolConnect;

    if (!emails || emails.length === 0) {
        throw new Error("Debe enviar al menos un email");
    }

    const request = pool.request();

    emails.forEach((email, index) => {
        request.input(`email${index}`, sql.VarChar, email);
    });

    const condiciones = emails
        .map((_, index) => `a.email = @email${index}`)
        .join(' OR ');

    const query = `
        SELECT 
            a.id_aspirante, 
            a.nombre, 
            a.email,
            CASE 
                WHEN ac.matriculo = 1 THEN 'MATRICULADO'
                ELSE 'NO MATRICULADO'
            END AS estado
        FROM aspirantes a
        LEFT JOIN asignacion_citas ac 
            ON a.id_aspirante = ac.id_aspirante
        WHERE ${condiciones}
    `;

<<<<<<< HEAD
    const result = await request.query(query);

    return result.recordset;
};

const filtrarPorEstado = async (matriculo) => {
    await poolConnect;

    const request = pool.request();

    let query = `
        SELECT 
            a.id_aspirante,
            a.nombre,
            a.email,
            CASE 
                WHEN ac.matriculo = 1 THEN 'MATRICULADO'
                ELSE 'NO MATRICULADO'
            END AS estado
        FROM aspirantes a
        LEFT JOIN asignacion_citas ac 
            ON a.id_aspirante = ac.id_aspirante
    `;

    if (matriculo !== undefined) {
        request.input('matriculo', sql.Bit, matriculo);
        query += ` WHERE ac.matriculo = @matriculo`;
    }

    const result = await request.query(query);

    return result.recordset;
};

module.exports = {
    consultarPorEmails,
    filtrarPorEstado
};
=======
    return db
}
module.exports = { findAll, findById, findByCarrera, create, update, remove, consultarPorEmails };
>>>>>>> 952b4713e1c78fd3342135b0b25530836de5589e
