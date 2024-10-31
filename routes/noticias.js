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
  esEmpleado,
} = require("../middlewares/validations");

router.get("/", [esEmpleado], getNoticias);

router.get("/:id", [esEmpleado], getNoticia);

router.post("/", [validarJwt, validarEmpleado], createNoticia);

router.put("/:id", [validarJwt, validarEmpleado], updateNoticia);

router.delete("/:id", [validarJwt, validarAdmin], deleteNoticia);

module.exports = router;
