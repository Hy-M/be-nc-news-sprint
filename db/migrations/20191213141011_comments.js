
exports.up = function(knex) {
  console.log("creating the comments table");
  return knex.schema.createTable('comments', (commentsTable) => {
    commentsTable.increments('comment_id').primary();
    commentsTable.string('author', 100).references('users.username').notNullable();
    commentsTable.integer('article_id').references('articles.article_id');
    commentsTable.integer('votes').defaultTo(0);
    commentsTable.string('body').notNullable();
    commentsTable.timestamp('created_at');
  });
};

exports.down = function(knex) {
  console.log("dropping the comments table");
  return knex.schema.dropTable('comments');
};
