const router=require("express").Router();

const auth=require("../middleware/authMiddleware");

const{

payCOD,
payEsewa,
history

}=require("../controller/paymentController");

router.post(

"/cod",

auth,

payCOD

);

router.post(

"/esewa",

auth,

payEsewa

);

router.get(

"/history",

auth,

history

);

module.exports=router;