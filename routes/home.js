const express = require("express");
const router = express.Router();
const { getIndex } = require("../controllers/home");
const { validarJwt } = require("../middlewares/validations");

router.use("/noticias", require("./noticias"));
router.use("/instructivos", require("./instructivos"));
//debe iniciar sesion para acceder a esta ruta
router.use("/solicitudes", [validarJwt], require("./solicitudes"));
router.get("/", getIndex);

module.exports = router;
