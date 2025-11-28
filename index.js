// index.js
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const authRoutes = require("./routes/auth.routes");
const kategoriRoutes = require("./routes/kategori.routes");
const resepRoutes = require("./routes/resep.routes");
const favoritRoutes = require("./routes/favorit.routes");

app.use("/api/auth", authRoutes);
app.use("/api/kategori", kategoriRoutes);
app.use("/api/resep", resepRoutes);
app.use("/api/favorit", favoritRoutes);

// optional upload endpoint
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file" });
  res.json({ path: `/uploads/${req.file.filename}`, originalname: req.file.originalname });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
