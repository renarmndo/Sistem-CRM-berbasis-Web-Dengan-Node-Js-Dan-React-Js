const express = require("express");
const { login, logout } = require("../controllers/authController");

const router = express.Router();

// Rute publik
router.post("/login", login);
router.post("/logout", logout);

// Contoh rute yang memerlukan autentikasi

module.exports = router;
