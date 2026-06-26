const {
addCart,
getCart,
updateQuantity,
deleteCart
}=require("../model/cartmodel");

const add=async(req,res)=>{

await addCart(
req.user.id,
req.body.food_id
);

res.json({
message:"Added to cart"
});

};

const view=async(req,res)=>{

const cart=
await getCart(req.user.id);

res.json(cart);

};

const update=async(req,res)=>{

await updateQuantity(
req.params.id,
req.body.quantity
);

res.json({
message:"Updated"
});

};

const remove=async(req,res)=>{

await deleteCart(req.params.id);

res.json({
message:"Deleted"
});

};

module.exports={
add,
view,
update,
remove
};