const {
    fetchArticleById, updateArticleById
} = require("../models/articles-model");

exports.getArticleById = (req, res, next) => {
    fetchArticleById(req.params)
    .then((article) => {
       res.status(200).send({article});
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
    updateArticleById(req.params, req.body)
    .then((article) => {
        res.status(200).send({article})
    })
    .catch(next);
};
