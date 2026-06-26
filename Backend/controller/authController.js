const bcrypt = require("bcrypt");

const JWT = require("jsonwebtoken");

const {

createUser,

existingUser,

getAllUser,

getUserById,

deleteUserById,

updateById

}=require("../model/userModel");


// REGISTER

const register = async(req,res)=>{

try{

const {

name,

email,

password

}=req.body;

if(!name || !email || !password){

return res.status(400).json({

message:"All fields required"

});

}

const userExist = await existingUser(email);

if(userExist){

return res.status(400).json({

message:"Email already exists"

});

}

const hashPassword = await bcrypt.hash(password,10);

const user = await createUser(

name,

email,

hashPassword

);

res.status(201).json({

message:"Account Created",

user

});

}
catch(err){

res.status(500).json({

error:err.message

});

}

};


// LOGIN

const login = async(req,res)=>{

try{

const {

email,

password

}=req.body;

const user = await existingUser(email);

if(!user){

return res.status(404).json({

message:"User not found"

});

}

const match = await bcrypt.compare(

password,

user.password

);

if(!match){

return res.status(400).json({

message:"Wrong Password"

});

}

const token = JWT.sign(

{

id:user.id,

email:user.email,

role:user.role

},

process.env.JWT_SECRET,

{

expiresIn:"1d"

}

);

const {

password:pwd,

...safeUser

}=user;

res.status(200).json({

message:"Login Successful",

token,

user:safeUser

});

}
catch(err){

res.status(500).json({

error:err.message

});

}

};


// ALL USERS

const allUsers = async(req,res)=>{

const users = await getAllUser();

res.json(users);

};


// USER BY ID

const singleUser = async(req,res)=>{

const user = await getUserById(req.params.id);

res.json(user);

};


// DELETE

const deleteUser = async(req,res)=>{

await deleteUserById(req.params.id);

res.json({

message:"Deleted"

});

};


// UPDATE

const updateUser = async(req,res)=>{

const image = req.file ? req.file.filename : null;

const hash = await bcrypt.hash(req.body.password,10);

const user = await updateById(

req.params.id,

req.body.name,

req.body.email,

hash,

image

);

res.json(user);

};


module.exports={

register,

login,

allUsers,

singleUser,

deleteUser,

updateUser

};