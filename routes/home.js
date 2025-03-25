const express = require("express");

const router = express.Router();

const {
  createEmpleadoAdmin,
  existeAdmin,
} = require("../controllers/empleados");

const { getIndex, getEmpleados, getEmpleado } = require("../controllers/home");

const {
  validarJwt,
  validarPrimerAdmin,
} = require("../middlewares/validations");

router.use("/noticias", require("./noticias"));

router.use("/instructivos", require("./instructivos"));

router.use("/solicitudes", [validarJwt], require("./solicitudes"));

router.get("/", getIndex);

router.get("/empleados", getEmpleados);

router.get("/empleados/:id", getEmpleado);

router.get("/admin", existeAdmin);

router.post("/admin", validarPrimerAdmin, createEmpleadoAdmin);

module.exports = router;
