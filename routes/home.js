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

module.exports = router;
