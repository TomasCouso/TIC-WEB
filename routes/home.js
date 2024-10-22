const express = require("express");

const router = express.Router();

const { login } = require("../controllers/auth");

const { getIndex } = require("../controllers/home");

router.use("/noticias", require("./noticias"));
router.use("/instructivos", require("./instructivos"));
router.use("/solicitudes", require("./solicitudes"));

router.get("/", getIndex);

//Seria login para poder hacer solicitudes
router.get("/login", login);

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
