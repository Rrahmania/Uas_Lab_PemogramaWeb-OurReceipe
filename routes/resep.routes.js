const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const {
  listResep,
  getResep,
  tambahResep,
  updateResep,
  deleteResep
} = require("../controllers/resep.controller");

router.get("/", listResep);
router.get("/:id", getResep);
router.post("/", auth, tambahResep);
router.put("/:id", auth, updateResep);
router.delete("/:id", auth, deleteResep);

module.exports = router;
