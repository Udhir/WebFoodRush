require("dotenv").config();

const express=require("express");

const cors=require("cors");

// filepath: c:\FoodRush\WebFoodRush\Backend\server.js
const authRoute = require("./route/authRoute");
const foodRoute = require("./route/foodRoute");
const cartRoute = require("./route/cartRoute");

const app=express();

app.use(cors());

app.use(express.json());

app.use("/uploads",express.static("uploads"));

app.use("/api/auth",authRoute);

app.use("/api/foods",foodRoute);



app.listen(process.env.PORT,()=>{

console.log(

`Server Running on ${process.env.PORT}`

);

});

module.exports = app;