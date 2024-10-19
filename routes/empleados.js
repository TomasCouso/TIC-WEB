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

router.post("/login", login);

//desde aca necesita auth
router.get("/", getInfoEmpleado);

//desde aca para admin
router.get("/:id", getEmpleado);

router.get("/listar", getEmpleados);

router.post("/", createEmpleado);

router.put("/:id", updateEmpleado);

router.delete("/:id", deleteEmpleado);

//cargar las otras rutas
//router.use("/maquinas", require("../routes/maquinas"));
router.use("/materiales", require("../routes/materiales"));
router.use("/pedidos", require("../routes/pedidosMateriales"));

module.exports = router;
