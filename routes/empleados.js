const express = require("express");

const router = express.Router();

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
router.get("/", getInfoEmpleado);

//desde aca para admin
router.get("/listar", getEmpleados);

router.get("/:id", getEmpleado);

router.post("/", createEmpleado);

router.put("/:id", updateEmpleado);

router.delete("/:id", deleteEmpleado);

module.exports = router;
