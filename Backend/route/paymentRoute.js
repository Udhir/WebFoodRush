const router = require("express").Router();
const { verifyToken } = require("../middleware/verifyToken");
const { payCOD, payEsewa, history } = require("../controller/paymentController");

router.post("/cod", verifyToken, payCOD);
router.post("/esewa", verifyToken, payEsewa);
router.get("/history", verifyToken, history);

module.exports = router;