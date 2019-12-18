const knex = require("../db/connection");

exports.insertCommentByArticleId = (article_id, username, body) => {           
   article_id = Number(article_id);   
   return knex
   .insert([{ author: username, article_id, body}])
   .into('comments')
   .returning('*');
}

exports.fetchCommentsByArticleId = (article_id, sort_by = 'created_at', order_by = "asc") => {
   return knex
   .select('author', 'body', 'created_at', 'votes', 'comment_id')
   .from('comments')
   .where('article_id', article_id)
   .orderBy(sort_by, order_by)
}