const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploads");

const {
  addFood,
  getFoods,
  getFoodByID,
  deleteFood,
  updateFood,
} = require("../controller/foodController");

const { verifyToken } = require("../middleware/verifyToken");
const { isAdmin } = require("../middleware/authMiddleware");

router.post(
  "/create",
  verifyToken,
  isAdmin,
  upload.single("image"),
  addFood
);

router.get("/getAll", getFoods);

router.get("/getById/:id", getFoodByID);

router.put(
  "/updateById/:id",
  verifyToken,
  isAdmin,
  upload.single("image"),
  updateFood
);

router.delete(
  "/deleteById/:id",
  verifyToken,
  isAdmin,
  deleteFood
);

module.exports = router;