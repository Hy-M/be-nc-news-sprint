const knex = require("../db/connection");

exports.insertCommentByArticleId = (article_id, username, body) => {           
   article_id = Number(article_id);   
   return knex
   .insert([{ author: username, article_id, body}])
   .into('comments')
   .returning('*');
}