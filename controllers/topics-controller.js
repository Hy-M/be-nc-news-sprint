const { fetchTopics } = require("../models/topics-model");

exports.getTopics = (req, res, next) => {
    console.log("in the controller");
    fetchTopics()
    .then((response) => {
       res.status(200).send(response);  
    })
    .catch(next);
}