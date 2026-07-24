  const express = require("express");
  const cors = require("cors");
  const dotenv = require("dotenv");
  const path = require("path");

  dotenv.config();

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));

  app.use("/api/auth", require("./route/authRoute"));
  app.use("/api/user", require("./route/userRoute"));
  app.use("/api/food", require("./route/foodRoute"));
  app.use("/api/category", require("./route/categoryRoute"));
  app.use("/api/cart", require("./route/cartRoute"));
  app.use("/api/order", require("./route/orderRoute"));
  app.use("/api/payment", require("./route/paymentRoute"));
  app.use("/api/dashboard", require("./route/dashboardRoute"));
  app.use("/api/contact", require("./route/contactRoute"));

  app.get("/", (req, res) => res.send("FoodRush API is running"));

  const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;