const router = require("express").Router();
const { forgotPassword, newPassword } = require("../controller/authController");

router.post("/forgot", forgotPassword);
router.post("/reset", newPassword);

module.exports = router;