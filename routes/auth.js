const express = require("express");
const router = express.Router();
const { loginMicrosoft, loginCallback } = require("../controllers/auth");

router.get("/microsoft", loginMicrosoft);
router.get("/microsoft/callback", loginCallback);

module.exports = router;
