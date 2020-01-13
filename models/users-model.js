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
            return Promise.reject({status: 404, msg: "User not found"});
        }
        return user;
    });
}

exports.checkUserExists = ({author}) => {
    return knex
    .select('*')
    .from('users')
    .modify((query) => {
        if (author) query.where('username', author);
    })
    .then((user) => {
        if (!user.length) {            
            return Promise.reject({status: 404, msg: "User not found"})
        }
    })
};