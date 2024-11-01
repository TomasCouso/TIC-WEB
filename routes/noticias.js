const express = require("express");

const router = express.Router();

const {
  getNoticias,
  getNoticia,
  createNoticia,
  updateNoticia,
  deleteNoticia,
} = require("../controllers/noticias");

const {
  validarAdmin,
  validarJwt,
  validarEmpleado,
} = require("../middlewares/validations");

router.get("/", getNoticias);

router.get("/:id", getNoticia);

router.post("/", [validarJwt, validarEmpleado], createNoticia);

router.put("/:id", [validarJwt, validarEmpleado], updateNoticia);

router.delete("/:id", [validarJwt, validarAdmin], deleteNoticia);

module.exports = router;
