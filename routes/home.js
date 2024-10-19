const express = require("express");

const router = express.Router();

const { login } = require("../controllers/auth");

const { getIndex } = require("../controllers/home");

const {
  getNoticias,
  createNoticia,
  updateNoticia,
  deleteNoticia,
} = require("../controllers/noticias");

const {
  getInstructivos,
  createInstructivo,
  updateInstructivo,
  deleteInstructivo,
} = require("../controllers/instructivos");

router.get("/", getIndex);

//Seria login para poder hacer solicitudes
router.get("/login", login);

//Rutas para noticias
router.get("/noticias", getNoticias);

//estas 2 autorizadas y empleado o admin
router.post("/noticias", createNoticia);

router.put("/noticias/:id", authenticate, updateNoticia);

//esta autorizada y admin
router.delete("/noticias/:id", authenticate, deleteNoticia);

// Rutas para instructivos
router.get("/instructivos", getInstructivos);

//estas 2 autorizadas y empleado o admin
router.post("/instructivos", authenticate, createInstructivo);

router.put("/instructivos/:id", authenticate, updateInstructivo);

//esta autorizada y admin
router.delete("/instructivos/:id", deleteInstructivo);

module.exports = router;
/*const { getNoticias, createNoticia, updateNoticia, deleteNoticia } = require('../controllers/noticias');
const { getInstructivos, createInstructivo, updateInstructivo, deleteInstructivo } = require('../controllers/instructivos');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');


module.exports = router; */
