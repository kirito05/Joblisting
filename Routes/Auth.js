const express = require("express");
const router = express.Router();
const authController = require("../Controller/user");

router.post("/register",authController.userRegistration);
router.post("/login",authController.userLogin)


module.exports = router;