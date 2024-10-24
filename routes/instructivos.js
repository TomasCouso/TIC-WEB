const express = require("express");

const router = express.Router();

const {
  getInstructivos,
  getInstructivo,
  createInstructivo,
  updateInstructivo,
  deleteInstructivo,
} = require("../controllers/instructivos");

router.get("/", getInstructivos);

router.get("/:id", getInstructivo);

//estas 2 autorizadas y empleado o admin
router.post("/", createInstructivo);

router.put("/:id", updateInstructivo);

//esta autorizada y admin
router.delete("/:id", deleteInstructivo);

module.exports = router;
