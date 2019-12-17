const articlesRouter = require("express").Router();
const {
    getArticleById
} = require("../controllers/articles-controller.js");
const {
    handle405
} = require("../errors/errors");

articlesRouter
    .route('/:article_id')
    .get(getArticleById)
    .delete(handle405);

module.exports = articlesRouter;