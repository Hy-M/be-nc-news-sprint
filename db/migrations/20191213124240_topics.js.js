
exports.up = function(knex) {
  return knex.schema.createTable('topics', (topicsTable) => {
    topicsTable.string('slug', 100).primary().unique().notNullable();
    topicsTable.string('description');
  });
};

exports.down = function(knex) {
    return knex.schema.dropTable('topics');
};
