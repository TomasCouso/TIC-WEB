const express = require("express");
const router = express.Router();

//IMPORTO MIDDLEWARES
const { validarAdmin, validarJwt, validarAuth } = require("../middlewares/validations");

const {
  getEmpleados,
  createEmpleado,
  getEmpleado,
  updateEmpleado,
  deleteEmpleado,
  getInfoEmpleado,
} = require("../controllers/empleados");

const { login } = require("../controllers/auth");

/*middlewares 
{
    auth?
    administrador?
    activo?
}*/

//cargar las otras rutas
//router.use("/maquinas", require("../routes/maquinas"));
router.use("/materiales", require("./materiales"));
router.use("/pedidos", require("./pedidosMateriales"));

//desde aca necesita auth
router.get("/", validarJwt, validarAuth, getInfoEmpleado);

//desde aca para admin
router.get("/listar", validarJwt, validarAuth, validarAdmin, getEmpleados);

router.get("/:id", validarJwt, validarAuth, validarAdmin, getEmpleado);

router.post("/", validarJwt, validarAuth, validarAdmin, createEmpleado);

router.put("/:id", validarJwt, validarAuth, validarAdmin, updateEmpleado);

router.delete("/:id", validarJwt, validarAuth, validarAdmin, deleteEmpleado);

module.exports = router;
