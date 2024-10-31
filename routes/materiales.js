const express = require("express");

const router = express.Router();

const {
  getMateriales,
  getMaterial,
  createMaterial,
  updateMaterial,
  deleteMaterial,
} = require("../controllers/materiales");

router.get("/", getMateriales);

router.get("/:id", getMaterial);

router.post("/", createMaterial);

router.put("/:id", updateMaterial);

router.delete("/:id", deleteMaterial);

module.exports = router;
