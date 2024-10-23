const express = require("express");

const router = express.Router();

const {
  getNoticias,
  getNoticia,
  createNoticia,
  updateNoticia,
  deleteNoticia,
} = require("../controllers/noticias");

router.get("/", getNoticias);

router.get("/:id", getNoticia);

//estas 2 autorizadas y empleado o admin
router.post("/", createNoticia);

router.put("/:id", updateNoticia);

//esta autorizada y admin
router.delete("/:id", deleteNoticia);

module.exports = router;
