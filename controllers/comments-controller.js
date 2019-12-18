const {
    insertCommentByArticleId,
    fetchCommentsByArticleId
} = require("../models/comments-model");

const {
    checkArticleExists
} = require("../models/articles-model");

exports.postCommentByArticleId = (req, res, next) => {
    checkArticleExists(req.params)
        .then(() => {
            return insertCommentByArticleId(req.params, req.body)
        })
        .then((comment) => {           
            res.status(201).send({
                comment
            });
        })
        .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
    fetchCommentsByArticleId(req.params, req.query)
        .then((comments) => {
            res.status(200).send({
                comments
            })
        })
        .catch(next);
};