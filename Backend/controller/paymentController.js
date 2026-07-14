const {

createPayment,
paymentHistory

}=require("../model/paymentModel");

const payCOD=async(req,res)=>{

const payment=

await createPayment(

req.user.id,

req.body.order_id,

req.body.amount,

"Cash On Delivery",

"Pending",

null

);

res.json({

message:"COD Selected",

payment

});

};

const payEsewa=async(req,res)=>{

const uuid=

Date.now().toString();

const payment=

await createPayment(

req.user.id,

req.body.order_id,

req.body.amount,

"eSewa",

"Pending",

uuid

);

res.json({

message:"Redirect to eSewa",

payment,

uuid

});

};

const history=async(req,res)=>{

const payments=

await paymentHistory(

req.user.id

);

res.json(payments);

};

module.exports={

payCOD,

payEsewa,

history

};