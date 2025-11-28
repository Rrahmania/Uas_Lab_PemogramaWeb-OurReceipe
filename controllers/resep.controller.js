const pool = require("../config/db");

// tambah resep
exports.createResep = async (req, res) => {
    const { nama_resep, deskripsi, kategori_id } = req.body;
    const gambar = req.file ? req.file.filename : null;

    try {
        const result = await pool.query(
            "INSERT INTO resep (nama_resep, deskripsi, kategori_id, gambar) VALUES ($1, $2, $3, $4) RETURNING *",
            [nama_resep, deskripsi, kategori_id, gambar]
        );

        res.status(201).json({
            message: "Resep berhasil ditambahkan",
            data: result.rows[0],
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error server" });
    }
};

// get semua resep
exports.getSemuaResep = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM resep ORDER BY id DESC");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: "Gagal mengambil data" });
    }
};
