const {
    insertCommentByArticleId,
    fetchCommentsByArticleId
} = require("../models/comments-model");

const {
    checkArticleExists
} = require("../models/articles-model");

exports.postCommentByArticleId = (req, res, next) => {
    const {
        article_id
    } = req.params;
    const {
        username,
        body
    } = req.body;
    Promise.all([insertCommentByArticleId(article_id, username, body), checkArticleExists(article_id)])
        .then(([comment]) => {
            res.status(201).send({
                comment: comment[0]
            });
        })
        .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
    const { article_id } = req.params;
    const { sort_by, order_by } = req.query;    
    fetchCommentsByArticleId(article_id, sort_by, order_by)
        .then((response) => {
            res.status(200).send({comments: response})
        })
};