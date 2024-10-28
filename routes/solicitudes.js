const express = require("express");
const router = express.Router();

const { validarAdmin, validarJwt, validarAuth } = require("../middlewares/validations");

const {
  getSolicitudes,
  getSolicitud,
  createSolicitud,
  updateSolicitud,
  deleteSolicitud,
} = require("../controllers/solicitudes");

router.get("/", validarJwt, validarAuth, getSolicitudes);

//verificar si del usuario
router.get("/:id", validarJwt, validarAuth, getSolicitud);

//esta autorizada
router.post("/", createSolicitud);

//esta autorizada y empleado o admin
router.put("/:id", validarJwt, validarAuth, validarAdmin, updateSolicitud);

//esta autorizada y admin
router.delete("/:id", validarJwt, validarAuth, validarAdmin, deleteSolicitud);

module.exports = router;
