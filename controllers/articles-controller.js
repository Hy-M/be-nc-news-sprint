const {
    fetchArticleById
} = require("../models/articles-model");

exports.getArticleById = (req, res, next) => {
    const {
        article_id
    } = req.params;
    fetchArticleById(article_id)
    .then((response) => {
       res.status(200).send(response);
    })
    .catch(next)
};