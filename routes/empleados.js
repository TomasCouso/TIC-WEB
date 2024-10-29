const express = require("express");
const router = express.Router();

//IMPORTO MIDDLEWARES
const { validarAdmin} = require("../middlewares/validations");

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
//desde aca para admin
router.get("/listar", validarAdmin, getEmpleados);

router.get("/:id", validarAdmin, getEmpleado);

router.post("/", validarAdmin, createEmpleado);

router.put("/:id", validarAdmin, updateEmpleado);

router.delete("/:id", validarAdmin, deleteEmpleado);

module.exports = router;