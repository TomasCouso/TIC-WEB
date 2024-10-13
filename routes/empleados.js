const express = require("express");

const router = express.Router();

const {
  getTodos,
  crear,
  getPorId,
  actualizarPorId,
  eliminarPorId,
  verInfo,
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
router.get("/", verInfo);

//desde aca para admin
router.get("/:id", getPorId);

router.get("/listar", getTodos);

router.post("/", crear);

router.put("/:id", actualizarPorId);

router.delete("/:id", eliminarPorId);

//cargar las otras rutas
router.use("/materiales", require("../routes/materiales"));
router.use("/pedidos", require("../routes/pedidosMateriales"));

module.exports = router;
