const articlesRouter = require("express").Router();
const {
    getArticleById,
    patchArticleById,
    getArticles
} = require("../controllers/articles-controller.js");
const {
    postCommentByArticleId,
    getCommentsByArticleId
} = require("../controllers/comments-controller");
const {
    handle405
} = require("../errors/errors");

articlesRouter
    .route('/:article_id')
    .get(getArticleById)
    .patch(patchArticleById)
    .all(handle405)

articlesRouter
    .route('/:article_id/comments')
    .post(postCommentByArticleId)
    .get(getCommentsByArticleId)

articlesRouter
    .route('/')
    .get(getArticles)

module.exports = articlesRouter;