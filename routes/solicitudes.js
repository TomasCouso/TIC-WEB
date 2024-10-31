const express = require("express");
const router = express.Router();

const { validarEmpleado } = require("../middlewares/validations");

const {
  getForm,
  getSolicitudes,
  getSolicitud,
  createSolicitud,
  updateSolicitud,
  deleteSolicitud,
} = require("../controllers/solicitudes");

router.get("/", getForm);

router.get("/listar", [validarEmpleado], getSolicitudes);

router.get("/:id", [validarEmpleado], getSolicitud);

router.post("/", createSolicitud);

router.put("/:id", [validarEmpleado], updateSolicitud);

router.delete("/:id", [validarEmpleado], deleteSolicitud);

module.exports = router;
