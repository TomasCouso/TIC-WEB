const express = require("express");

const router = express.Router();

const { existeToken, esEmpleado } = require("../middlewares/validations");

const {
  loginMicrosoft,
  loginCallback,
  getUserData,
  logout,
} = require("../controllers/auth");

router.get("/microsoft", loginMicrosoft);

router.get("/microsoft/callback", loginCallback);

router.get("/logout", logout);

router.get("/me", [existeToken, esEmpleado], getUserData);

module.exports = router;
