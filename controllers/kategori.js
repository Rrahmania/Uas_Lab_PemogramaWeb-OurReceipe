const pool = require("../db");

exports.listKategori = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM kategori ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};