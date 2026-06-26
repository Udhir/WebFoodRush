const jwt=require("jsonwebtoken");

const auth=async(req,res,next)=>{

try{

const token=req.headers.authorization;

if(!token){

return res.status(401).json({

message:"Login Required"

});

}

const verify=jwt.verify(

token.replace("Bearer ",""),

process.env.JWT_SECRET

);

req.user=verify;

next();

}
catch(err){

res.status(401).json({

message:"Invalid Token"

});

}

};

module.exports=auth;