const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/verifyToken");
const { isAdmin } = require("../middleware/authMiddleware");
const { submitContact, getContacts, deleteContact } = require("../controller/contactController");

router.post("/submit", submitContact);
router.get("/getAll", verifyToken, isAdmin, getContacts);
router.delete("/deleteById/:id", verifyToken, isAdmin, deleteContact);

module.exports = router;
