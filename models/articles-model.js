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
            if (!article[0]) {
                return Promise.reject({
                    status: 404,
                    msg: "Path not found"
                })
            } else {
                article[0].comment_count = Number(article[0].comment_count);
                return article;
            }
        })
};

exports.updateArticleById = (article_id, inc_votes = 0) => {
    return knex
    .select('*')
    .from('articles')
    .where('article_id', article_id)
    .increment('votes', inc_votes)
    .returning('*')
    .then((article) => {
        if (!article.length) {            
            return Promise.reject({status: 404, msg: "Path not found"});
        }
        else return article;
    })
}

exports.checkArticleExists = (article_id) => {
    return knex
    .select('*')
    .from('articles')
    .where('article_id', article_id)
    .then((article) => {
        if (!article.length) {
            return Promise.reject({status: 404, msg: "Path not found"})
        }
    })
}