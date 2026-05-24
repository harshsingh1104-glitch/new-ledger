const express = require("express");
const accountcontroller = require("../controllers/account.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// POST /api/account/
router.post("/", authMiddleware, accountcontroller.createAccount);

module.exports = router;