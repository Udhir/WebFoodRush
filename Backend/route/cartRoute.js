const router=require("express").Router();

const auth=require("../middleware/auth");

const{
add,
view,
update,
remove
}=require("../controller/cartcontroller");

router.post("/add",auth,add);

router.get("/",auth,view);

router.put("/:id",auth,update);

router.delete("/:id",auth,remove);

module.exports=router;