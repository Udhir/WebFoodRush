const router = require("express").Router();
const { verifyToken } = require("../middleware/verifyToken");
const { payCOD, payEsewa, payKhalti, history, updateStatus } = require("../controller/paymentController");

router.post("/cod", verifyToken, payCOD);
router.post("/esewa", verifyToken, payEsewa);
router.post("/khalti", verifyToken, payKhalti);
router.get("/history", verifyToken, history);
router.post("/update-status", verifyToken, updateStatus); 

module.exports = router;