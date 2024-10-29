const express = require("express");
const router = express.Router();

const {
  validarAdmin,
  validarAuth,
} = require("../middlewares/validations");

const {
  getForm,
  getSolicitudes,
  getSolicitud,
  createSolicitud,
  updateSolicitud,
  deleteSolicitud,
} = require("../controllers/solicitudes");

router.get("/", getForm);

//verificar si del usuario
router.get("/listar", getSolicitudes);

router.get("/:id", validarAuth, getSolicitud);

router.post("/", createSolicitud);

//esta autorizada y empleado o admin
router.put("/:id", validarAuth, validarAdmin, updateSolicitud);

//esta autorizada y admin
router.delete("/:id", validarAuth, validarAdmin, deleteSolicitud);

module.exports = router;
