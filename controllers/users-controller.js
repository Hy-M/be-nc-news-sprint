const { fetchUserById } = require("../models/users-model");

exports.getUserById = (req, res, next) => {
    const { username } = req.params;
    fetchUserById(username)
    .then((response) => {        
        res.status(200).send({user: response[0]});
    })
    .catch(next);
}