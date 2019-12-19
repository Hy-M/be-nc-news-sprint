const knex = require("../db/connection");

exports.insertCommentByArticleId = ({
   article_id
}, {
   username,
   body
}) => {
   article_id = Number(article_id);
   return knex
      .insert([{
         author: username,
         article_id,
         body
      }])
      .into('comments')
      .returning('*');
}

exports.fetchCommentsByArticleId = ({
   article_id
}, {
   sort_by = 'created_at',
   order_by = "asc"
}) => {
   const validOrderBys = ['asc', 'desc'];
   const validSortBys = ['author', 'body', 'created_at', 'votes', 'comment_id'];
   if (validSortBys.includes(sort_by) && validOrderBys.includes(order_by)) {
      return knex
         .select('author', 'body', 'created_at', 'votes', 'comment_id')
         .from('comments')
         .where('article_id', article_id)
         .orderBy(sort_by, order_by)
         .then((comments) => {
            if (!comments.length) {
               return Promise.reject({
                  status: 404,
                  msg: "Path not found"
               })
            } else {
               return comments;
            }
         })
   } else {
      return Promise.reject({
         status: 400,
         msg: "Bad request"
      });
   }

}

exports.updateCommentById = ({comment_id}, {inc_votes = 0}) => {
   return knex
   .select('*')
   .from('comments')
   .where('comment_id', comment_id)
   .increment('votes', inc_votes)
   .returning('*')
   .then((comment) => {
      if(!comment.length) {         
         return Promise.reject({status: 404, msg: "Path not found"});
      } else {
         return comment;
      }
   })
};

exports.removeCommentById = ({comment_id}) => {
   return knex
   .delete('*')
   .from('comments')
   .where('comment_id', comment_id)
   .then((delCount) => {
      if (!delCount.length) {
         return Promise.reject({status: 404, msg: "Path not found"})
      }
   })
};