require("dotenv").config();

const express = require("express");

const cors = require("cors");

const path = require("path");

const dashboardRoute = require("./routes/dashboardRoute");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/user", require("./route/userRoute"));

app.use("/api/category", require("./route/categoryRoute"));

app.use("/api/food", require("./route/foodRoute"));

app.use("/api/dashboard", dashboardRoute);



app.use(
"/api/cart",
require("./route/cartRoute")
);

app.use(
"/api/order",
require("./route/orderRoute")
);

app.use(
  "/api/dashboard",
  require("./route/dashboardRoute")
);

app.use(
"/api/profile",
require("./route/profileRoute")
);

app.use("/api/food", require("./routes/foodRoute"));




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});