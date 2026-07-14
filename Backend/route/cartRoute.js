const express = require("express");

const router = express.Router();

const {
  addToCart,
  getCartItems,
  updateCartQuantity,
  deleteCartItem,
} = require("../controller/cartController");

const { verifyToken } = require("../middleware/verifyToken");

router.post("/add", verifyToken, addToCart);

router.get("/getCart/:id", verifyToken, getCartItems);

router.put("/update/:id", verifyToken, updateCartQuantity);

router.delete("/delete/:id", verifyToken, deleteCartItem);

module.exports = router;