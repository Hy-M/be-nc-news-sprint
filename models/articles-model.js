const knex = require("../db/connection");

exports.fetchArticleById = (article_id) => {
    return knex
        .select('articles.*')
        .from('articles')
        .count('comment_id as comment_count')
        .where('articles.article_id', article_id)
        .leftJoin('comments', 'comments.article_id', 'articles.article_id')
        .groupBy('articles.article_id')
    .then((article) => {
        article[0].comment_count = Number(article[0].comment_count);
        return article;
    })
};