const pool = require("../database/db");

// Create User
const createUser = async (
    name,
    email,
    password
) => {

    const result = await pool.query(

        `
        INSERT INTO users
        (
            name,
            email,
            password
        )

        VALUES($1,$2,$3)

        RETURNING *
        `,

        [
            name,
            email,
            password
        ]

    );

    return result.rows[0];

};

// Existing User

const existingUser = async(email)=>{

    const result = await pool.query(

        `
        SELECT *
        FROM users
        WHERE email=$1
        `,

        [email]

    );

    return result.rows[0];

};

// All Users

const getAllUser = async()=>{

    const result = await pool.query(

        `
        SELECT *
        FROM users
        ORDER BY id DESC
        `

    );

    return result.rows;

};

// User By ID

const getUserById = async(id)=>{

    const result = await pool.query(

        `
        SELECT *
        FROM users
        WHERE id=$1
        `,

        [id]

    );

    return result.rows[0];

};

// Delete User

const deleteUserById = async(id)=>{

    await pool.query(

        `
        DELETE FROM users
        WHERE id=$1
        `,

        [id]

    );

};

// Update User

const updateById = async(

id,
name,
email,
password,
image

)=>{

const result = await pool.query(

`
UPDATE users

SET

name=$1,

email=$2,

password=$3,

image=$4

WHERE id=$5

RETURNING *

`,

[
name,
email,
password,
image,
id
]

);

return result.rows[0];

};

module.exports={

createUser,

existingUser,

getAllUser,

getUserById,

deleteUserById,

updateById

};