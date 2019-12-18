const knex = require("../db/connection");

exports.fetchUserById = ({
        username
    }) => {
    if (Number(username)) {
        return Promise.reject({status: 400, msg: "Bad request"});
    }
    return knex
    .select("*")
    .from("users")
    .where("username", username)
    .then((user) => {
        if (!user.length) {
            return Promise.reject({status: 404, msg: "Path not found"});
        }
        return user;
    });
}