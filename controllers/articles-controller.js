const {
    fetchArticleById, updateArticleById, fetchArticles
} = require("../models/articles-model");

const { checkUserExists } = require("../models/users-model");

const { checkTopicExists } = require("../models/topics-model");

exports.getArticleById = (req, res, next) => {
    fetchArticleById(req.params)
    .then((article) => {
       res.status(200).send({article: article[0]});
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
    updateArticleById(req.params, req.body)
    .then((article) => {
        res.status(200).send({article: article[0]})
    })
    .catch(next);
};

exports.getArticles = (req, res, next) => {
    checkUserExists(req.query)
    .then(() => {
        return checkTopicExists(req.query)
    })
    .then(() => {
        return fetchArticles(req.query)
    })
    .then((articles) => {
        res.status(200).send({articles});
    })
    .catch(next)
};
