const pool=require("../database/db");

const createPayment=async(

user_id,
order_id,
amount,
payment_method,
payment_status,
transaction_uuid

)=>{

const result=

await pool.query(

`

INSERT INTO payments(

user_id,
order_id,
amount,
payment_method,
payment_status,
transaction_uuid

)

VALUES(

$1,$2,$3,$4,$5,$6

)

RETURNING *

`,

[
user_id,
order_id,
amount,
payment_method,
payment_status,
transaction_uuid
]

);

return result.rows[0];

};

const paymentHistory=async(user_id)=>{

const result=

await pool.query(

`

SELECT *

FROM payments

WHERE user_id=$1

ORDER BY created_at DESC

`,

[user_id]

);

return result.rows;

};

module.exports={

createPayment,

paymentHistory

};