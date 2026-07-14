const express = require("express");

const router = express.Router();

const {
  placeOrder,
  getOrders,
  myOrders,
  changeStatus,
  deleteOrder,
} = require("../controller/orderController");

const { verifyToken } = require("../middleware/verifyToken");
const { isAdmin } = require("../middleware/authMiddleware");

router.post("/create", verifyToken, placeOrder);

router.get("/myOrders/:id", verifyToken, myOrders);

router.get("/getAll", verifyToken, isAdmin, getOrders);

router.put("/status/:id", verifyToken, isAdmin, changeStatus);

router.delete("/delete/:id", verifyToken, isAdmin, deleteOrder);

module.exports = router;