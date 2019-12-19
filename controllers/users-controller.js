const { fetchUserById } = require("../models/users-model");

exports.getUserById = (req, res, next) => {
    fetchUserById(req.params)
    .then((user) => {        
        res.status(200).send({ user: user[0] });
    })
    .catch(next);
}