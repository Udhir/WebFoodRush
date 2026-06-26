const router = require("express").Router();

const upload = require("../middleware/uploads");

const auth = require("../middleware/auth");

const admin = require("../middleware/admin");

const {

register,

login,

allUsers,

singleUser,

deleteUser,

updateUser

}=require("../controller/authController");

router.post(

"/register",

register

);

router.post(

"/login",

login

);

router.get(

"/users",

auth,

admin,

allUsers

);

router.get(

"/users/:id",

auth,

singleUser

);

router.put(

"/users/:id",

auth,

upload.single("image"),

updateUser

);

router.delete(

"/users/:id",

auth,

admin,

deleteUser

);

module.exports = router;