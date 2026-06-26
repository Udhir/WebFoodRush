const router=require("express").Router();

const upload=require("../middleware/uploads");

const auth=require("../middleware/auth");

const admin=require("../middleware/admin");

const{

createFood,

fetchFoods,

fetchFood,

editFood,

removeFood,

search

}=require("../controller/foodController");

router.post(

"/add",

auth,

admin,

upload.single("image"),

createFood

);

router.get(

"/",

fetchFoods

);

router.get(

"/search/:name",

search

);

router.get(

"/:id",

fetchFood

);

router.put(

"/:id",

auth,

admin,

editFood

);

router.delete(

"/:id",

auth,

admin,

removeFood

);

module.exports=router;