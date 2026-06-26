const pool = require("../database/db");

// Add to cart
const addCart = async (user_id, food_id) => {

    const existing = await pool.query(
        "SELECT * FROM cart WHERE user_id=$1 AND food_id=$2",
        [user_id, food_id]
    );

    if (existing.rows.length > 0) {

        await pool.query(
            "UPDATE cart SET quantity=quantity+1 WHERE user_id=$1 AND food_id=$2",
            [user_id, food_id]
        );

    } else {

        await pool.query(
            "INSERT INTO cart(user_id,food_id,quantity) VALUES($1,$2,1)",
            [user_id, food_id]
        );

    }

};

const getCart = async (user_id) => {

    const result = await pool.query(

`
SELECT
cart.id,
foods.name,
foods.price,
foods.image_url,
cart.quantity
FROM cart
JOIN foods
ON foods.id=cart.food_id
WHERE cart.user_id=$1
`,

[user_id]

);

return result.rows;

};

const updateQuantity = async(id, quantity)=>{

await pool.query(

"UPDATE cart SET quantity=$1 WHERE id=$2",

[quantity,id]

);

};

const deleteCart = async(id)=>{

await pool.query(

"DELETE FROM cart WHERE id=$1",

[id]

);

};

module.exports={
addCart,
getCart,
updateQuantity,
deleteCart
};