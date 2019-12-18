const articlesRouter = require("express").Router();
const {
    getArticleById, patchArticleById
} = require("../controllers/articles-controller.js");
const { postCommentByArticleId } = require("../controllers/comments-controller");
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

module.exports = articlesRouter;