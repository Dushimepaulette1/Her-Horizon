const express = require("express");
const { register, login } = require("../controllers/authController");
const authenticate = require("../middleware/auth");

const router = express.Router();

router.post("/register", authenticate, register);
router.post("/login", login);

module.exports = router;
