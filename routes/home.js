const express = require("express");

const router = express.Router();

const { createEmpleado } = require("../controllers/empleados");

const { getIndex } = require("../controllers/home");

const {
  validarJwt,
  validarPrimerAdmin,
} = require("../middlewares/validations");

router.use("/noticias", require("./noticias"));

router.use("/instructivos", require("./instructivos"));

router.use("/solicitudes", [validarJwt], require("./solicitudes"));

router.get("/", getIndex);

router.post("/admin", validarPrimerAdmin, createEmpleado);

module.exports = router;
