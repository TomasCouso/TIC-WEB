const express = require("express");

const router = express.Router();

const {
  getSolicitudes,
  getSolicitud,
  createSolicitud,
  updateSolicitud,
  deleteSolicitud,
} = require("../controllers/solicitudes");

router.get("/", getSolicitudes);

//verificar si del usuario
router.get("/:id", getSolicitud);

//esta autorizada
router.post("/", createSolicitud);

//esta autorizada y empleado o admin
router.put("/:id", updateSolicitud);

//esta autorizada y admin
router.delete("/:id", deleteSolicitud);

module.exports = router;
