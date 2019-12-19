const {
    insertCommentByArticleId,
    fetchCommentsByArticleId,
    updateCommentById,
    removeCommentById
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
                comment: comment[0]
            });
        })
        .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
    checkArticleExists(req.params)
        .then(() => {
            return fetchCommentsByArticleId(req.params, req.query)
        })
        .then((comments) => {
            res.status(200).send({
                comments
            })
        })
        .catch(next);
};

exports.patchCommentById = (req, res, next) => {
    updateCommentById(req.params, req.body)
        .then((comment) => {
            res.status(200).send({
                comment: comment[0]
            });
        })
        .catch(next)
};

exports.deleteCommentById = (req, res, next) => {
    removeCommentById(req.params)
        .then(() => {
            res.sendStatus(204);
        })
        .catch(next);
};