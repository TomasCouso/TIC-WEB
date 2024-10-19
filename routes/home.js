const express = require("express");

const router = express.Router();

const { login } = require("../controllers/auth");

const { getIndex } = require("../controllers/home");

const {
  getNoticias,
  getNoticia,
  createNoticia,
  updateNoticia,
  deleteNoticia,
} = require("../controllers/noticias");

const {
  getInstructivos,
  getInstructivo,
  createInstructivo,
  updateInstructivo,
  deleteInstructivo,
} = require("../controllers/instructivos");

//TODO
const {
  getSolicitudes,
  getSolicitud,
  createSolicitud,
  updateSolicitud,
  deleteSolicitud,
} = require("../controllers/solicitudes");

router.get("/", getIndex);

//Seria login para poder hacer solicitudes
router.get("/login", login);

//Rutas para noticias
router.get("/noticias", getNoticias);

router.get("/noticias/:id", getNoticia);

//estas 2 autorizadas y empleado o admin
router.post("/noticias", createNoticia);

router.put("/noticias/:id", updateNoticia);

//esta autorizada y admin
router.delete("/noticias/:id", deleteNoticia);

// Rutas para instructivos
router.get("/instructivos", getInstructivos);

router.get("/instructivos/:id", getInstructivo);

//estas 2 autorizadas y empleado o admin
router.post("/instructivos", createInstructivo);

router.put("/instructivos/:id", updateInstructivo);

//esta autorizada y admin
router.delete("/instructivos/:id", deleteInstructivo);

//Rutas para solicitudes
router.get("/solicitudes", getSolicitudes);

//verificar si del usuario
router.get("/solicitudes/:id", getSolicitud);

//esta autorizada
router.post("/solicitudes", createSolicitud);

//esta autorizada y empleado o admin
router.put("/solicitudes/:id", updateSolicitud);

//esta autorizada y admin
router.delete("/solicitudes/:id", deleteSolicitud);

module.exports = router;
