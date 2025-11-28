const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const { tambahFavorit, listFavorit, hapusFavorit } = require("../controllers/favorit.controller");

router.post("/", auth, tambahFavorit);
router.get("/:userId", auth, listFavorit);
router.delete("/", auth, hapusFavorit);

module.exports = router;
