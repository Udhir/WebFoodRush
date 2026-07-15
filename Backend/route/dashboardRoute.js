const express = require("express");
const router = express.Router();

const { dashboard } = require("../controller/dashboardController");
const { verifyToken } = require("../middleware/verifyToken");
const { isAdmin } = require("../middleware/authMiddleware");

router.get("/stats", verifyToken, isAdmin, dashboard);

module.exports = router;