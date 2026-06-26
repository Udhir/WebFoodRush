const pool=require("../database/db");

const addFood=async(

name,
description,
price,
category,
image

)=>{

const result=await pool.query(

`
INSERT INTO foods
(
name,
description,
price,
category,
image_url
)

VALUES($1,$2,$3,$4,$5)

RETURNING *

`,

[
name,
description,
price,
category,
image
]

);

return result.rows[0];

};

const getFoods=async()=>{

const result=await pool.query(

`
SELECT *

FROM foods

ORDER BY id DESC

`

);

return result.rows;

};

const getFoodById=async(id)=>{

const result=await pool.query(

`
SELECT *

FROM foods

WHERE id=$1

`,

[id]

);

return result.rows[0];

};

const updateFood=async(

id,
name,
description,
price,
category

)=>{

const result=await pool.query(

`

UPDATE foods

SET

name=$1,

description=$2,

price=$3,

category=$4

WHERE id=$5

RETURNING *

`,

[
name,
description,
price,
category,
id
]

);

return result.rows[0];

};

const deleteFood=async(id)=>{

await pool.query(

`

DELETE FROM foods

WHERE id=$1

`,

[id]

);

};

const searchFood=async(name)=>{

const result=await pool.query(

`

SELECT *

FROM foods

WHERE name ILIKE $1

`,

["%"+name+"%"]

);

return result.rows;

};

module.exports={

addFood,

getFoods,

getFoodById,

updateFood,

deleteFood,

searchFood

};