const express = require("express");
const router = express.Router();

const { validarAdmin } = require("../middlewares/validations");

const {
  getEmpleados,
  createEmpleado,
  getEmpleado,
  updateEmpleado,
  deleteEmpleado,
  getInfoEmpleado,
} = require("../controllers/empleados");

router.get("/info", getInfoEmpleado);
router.use("/materiales", require("./materiales"));
router.use("/pedidos", require("./pedidosMateriales"));
router.use("/categorias", require("./categorias"));

router.get("/", [validarAdmin], getEmpleados);
router.get("/:id", [validarAdmin], getEmpleado);
router.post("/", [validarAdmin], createEmpleado);
router.put("/:id", [validarAdmin], updateEmpleado);
router.delete("/:id", [validarAdmin], deleteEmpleado);

module.exports = router;
