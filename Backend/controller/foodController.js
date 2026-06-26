const{

addFood,

getFoods,

getFoodById,

updateFood,

deleteFood,

searchFood

}=require("../model/foodModel");

const createFood=async(req,res)=>{

try{

const{

name,

description,

price,

category

}=req.body;

const image=req.file.filename;

const food=await addFood(

name,

description,

price,

category,

image

);

res.status(201).json({

message:"Food Added",

food

});

}

catch(err){

res.status(500).json({

error:err.message

});

}

};

const fetchFoods=async(req,res)=>{

const foods=await getFoods();

res.json(foods);

};

const fetchFood=async(req,res)=>{

const food=await getFoodById(req.params.id);

res.json(food);

};

const editFood=async(req,res)=>{

const food=await updateFood(

req.params.id,

req.body.name,

req.body.description,

req.body.price,

req.body.category

);

res.json(food);

};

const removeFood=async(req,res)=>{

await deleteFood(req.params.id);

res.json({

message:"Food Deleted"

});

};

const search=async(req,res)=>{

const food=await searchFood(req.params.name);

res.json(food);

};

module.exports={

createFood,

fetchFoods,

fetchFood,

editFood,

removeFood,

search

};