const router = require("express").Router();
const { verifyToken } = require("../middleware/verifyToken");
const { payCOD, payEsewa, payKhalti, history } = require("../controller/paymentController");

router.post("/cod", verifyToken, payCOD);
router.post("/esewa", verifyToken, payEsewa);
router.post("/khalti", verifyToken, payKhalti);
router.get("/history", verifyToken, history);

module.exports = router;