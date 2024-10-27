const express = require("express");

const router = express.Router();

const { loginMicosft, loginCallback } = require("../controllers/auth");

router.get("/microsoft", loginMicosft);

router.get("/microsoft/callback", loginCallback);

module.exports = router;
