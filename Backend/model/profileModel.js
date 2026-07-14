const pool = require("../database/db");

const getProfile = async (id) => {

    const result = await pool.query(

        "SELECT id,name,email,image FROM users WHERE id=$1",

        [id]

    );

    return result.rows[0];

};

const updateProfile = async (

    id,
    name,
    email,
    image

) => {

    const result = await pool.query(

        `UPDATE users
        SET name=$1,
            email=$2,
            image=$3
        WHERE id=$4
        RETURNING *`,

        [

            name,
            email,
            image,
            id

        ]

    );

    return result.rows[0];

};

module.exports={

getProfile,
updateProfile

};