const express = require('express');
const router = express.Router();
const ctrl = require('./carrera.controller');

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

// GET /api/carreras → Obtener todas las carreras
router.get('/', async (req, res, next) => {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .query('SELECT id_carrera, nombre_carrera FROM admin_relampago.carreras ORDER BY nombre_carrera');
    res.json(result.recordset);
  } catch (err) { next(err); }
});
 




module.exports = router;
