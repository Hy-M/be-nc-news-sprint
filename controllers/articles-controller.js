const {
    fetchArticleById, updateArticleById
} = require("../models/articles-model");

exports.getArticleById = (req, res, next) => {
    const {
        article_id
    } = req.params;
    fetchArticleById(article_id)
    .then((response) => {
       res.status(200).send({article: response[0]});
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
    const { inc_votes } = req.body;
    const { article_id } = req.params;
    updateArticleById(article_id, inc_votes)
    .then((response) => {
        res.status(200).send({article: response[0]})
    })
    .catch(next);
};
