
exports.up = function(knex) {
  return knex.schema.createTable('articles', (articlesTable) => {
      articlesTable.increments('article_id').primary();
      articlesTable.string('title', 100).notNullable();
      articlesTable.string('body', 5000).notNullable();
      articlesTable.integer('votes').defaultTo(0);
      articlesTable.string('topic', 100).references('topics.slug').notNullable();
      articlesTable.string('author', 100).references('users.username').notNullable();
      articlesTable.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('articles');
};
