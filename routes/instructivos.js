const express = require("express");
const router = express.Router();

const {
  getInstructivos,
  getInstructivo,
  createInstructivo,
  updateInstructivo,
  deleteInstructivo,
} = require("../controllers/instructivos");

const {
  validarJwt,
  validarAdmin,
  validarEmpleado,
} = require("../middlewares/validations");

router.get("/", getInstructivos);
router.get("/:id", getInstructivo);
router.post("/", [validarJwt, validarEmpleado], createInstructivo);
router.put("/:id", [validarJwt, validarEmpleado], updateInstructivo);
router.delete("/:id", [validarJwt, validarAdmin], deleteInstructivo);

module.exports = router;
