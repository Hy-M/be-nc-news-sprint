const knex = require("../db/connection");
const jwt = require("jsonwebtoken");
const { connection } = require("../knexfile");

exports.verifyUserLogin = ({ username }) => {    
    return knex
    .select('*')
    .from('users')
    .where('username', username)
    .then((user) => {
        if (!user.length) {
            return Promise.reject({ status: 401, msg: 'Username does not exists' });
        } else {
            const token = jwt.sign(
                { user: user.username, iat: Date.now() },
                connection.JWT_SECRET);
            return token;
        }
    })
}