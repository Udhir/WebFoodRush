const {

getProfile,
updateProfile

}=require("../model/profileModel");

const profile=async(req,res)=>{

try{

const user=await getProfile(req.params.id);

res.json({

user

});

}catch(e){

res.status(500).json({

message:e.message

});

}

};

const update=async(req,res)=>{

try{

const{id}=req.params;

const{name,email}=req.body;

const image=req.file?req.file.filename:null;

const user=await updateProfile(

id,
name,
email,
image

);

res.json({

message:"Profile Updated",

user

});

}catch(e){

res.status(500).json({

message:e.message

});

}

};

module.exports={

profile,
update

};