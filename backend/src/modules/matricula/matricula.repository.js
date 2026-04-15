// src/modules/matricula/matricula.repository.js
const { pool, poolConnect, sql } = require('../../config/db');

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