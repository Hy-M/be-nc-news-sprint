const { verifyUserLogin } = require("../models/login-model");

exports.checkUserLogin = (req, res, next) => {
    verifyUserLogin(req.body)
    .then((token) => {
       res.status(200).send({ token });
     })
     .catch(next)
};