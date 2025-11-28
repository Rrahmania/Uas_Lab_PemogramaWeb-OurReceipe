const express = require("express");
const router = express.Router();
const { listKategori } = require("../controllers/kategori.controller");

router.get("/", listKategori);

module.exports = router;
