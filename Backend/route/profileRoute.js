const express=require("express");

const router=express.Router();

const upload=require("../middleware/uploads");

const {verifyToken}=require("../middleware/verifyToken");
const{

profile,
update

}=require("../controller/profileController");

router.get(

"/get/:id",
verifyToken,

profile

);

router.put(

"/update/:id",

upload.single("image"),

verifyToken,

update

);

module.exports=router;