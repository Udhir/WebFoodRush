const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploads");

const {
  verifyToken,
} = require("../middleware/verifyToken");

const {
  isAdmin,
} = require("../middleware/authMiddleware");

const {
  addCategory,
  getCategories,
  getCategoryByIDDB,
  deleteCategoryIDDB,
  updateCategoryIDDB,
} = require("../controller/categoryController");

router.post(
  "/create",
  verifyToken,
  isAdmin,
  upload.single("image"),
  addCategory
);

router.get(
  "/getAll",
  getCategories
);

router.get(
  "/getById/:id",
  getCategoryByIDDB
);

router.delete(
  "/deleteById/:id",
  verifyToken,
  isAdmin,
  deleteCategoryIDDB
);

router.put(
  "/updateById/:id",
  verifyToken,
  isAdmin,
  upload.single("image"),
  updateCategoryIDDB
);

module.exports = router;