const express = require("express");
const registerUser = require("../controllers/registerUser");
const checkEmail = require("../controllers/checkEmail");
const verifyPassword = require("../controllers/verifyPassword");
const userDetails = require("../controllers/userDetails");
const logout = require("../controllers/logout");
const updateUserDetails = require("../controllers/updateUserData");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/check-email").post(checkEmail);
router.route("/verify-password").post(verifyPassword);
router.route("/user-details").get(userDetails);
router.route("/logout").get(logout);
router.route("/update-user").post(updateUserDetails);

module.exports = router;
