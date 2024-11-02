const express = require("express");
const router = express.Router();

const {
  getCategorias,
  getCategoria,
  createCategoria,
  updateCategoria,
  deleteCategoria,
} = require("../controllers/categorias");

router.get("/", getCategorias);
router.get("/:id", getCategoria);
router.post("/", createCategoria);
router.put("/:id", updateCategoria);
router.delete("/:id", deleteCategoria);

module.exports = router;
