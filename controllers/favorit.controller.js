const pool = require("../db");

exports.tambahFavorit = async (req, res) => {
  const { user_id, resep_id } = req.body;
  if (!user_id || !resep_id) return res.status(400).json({ error: "Missing fields" });

  try {
    // ngecek dulu kalau sudah ada
    const cek = await pool.query("SELECT * FROM favorit WHERE user_id = $1 AND resep_id = $2", [user_id, resep_id]);
    if (cek.rows.length) return res.status(400).json({ error: "Already in favorites" });

    const result = await pool.query("INSERT INTO favorit (user_id, resep_id) VALUES ($1, $2) RETURNING *", [user_id, resep_id]);
    res.json({ message: "Added to favorites", data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listFavorit = async (req, res) => {
  const userId = req.params.userId;
  try {
    const result = await pool.query(`
      SELECT r.* FROM favorit f
      JOIN resep r ON f.resep_id = r.id
      WHERE f.user_id = $1
      ORDER BY f.id DESC
    `, [userId]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.hapusFavorit = async (req, res) => {
  const { user_id, resep_id } = req.body;
  try {
    const result = await pool.query("DELETE FROM favorit WHERE user_id = $1 AND resep_id = $2 RETURNING *", [user_id, resep_id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Favorite not found" });
    res.json({ message: "Removed", data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
