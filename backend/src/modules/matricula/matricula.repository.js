const consultarPorEmails = async (emails) => {
    const placeholders = emails.map(() => '?').join(', ');

    const query = `
        SELECT 
        a.id_aspirante, a.nombres, a.email, ac.matriculo
        FROM aspirantes a
        JOIN asignacion_citas ac ON a.id_aspirante = ac.id_aspirante
    `;

    return db
}