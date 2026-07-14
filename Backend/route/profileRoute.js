const express=require("express");

const router=express.Router();

const upload=require("../middleware/uploads");

const{

profile,
update

}=require("../controller/profileController");

router.get(

"/get/:id",

profile

);

router.put(

"/update/:id",

upload.single("image"),

update

);

module.exports=router;