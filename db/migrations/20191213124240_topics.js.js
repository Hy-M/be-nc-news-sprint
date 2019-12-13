
exports.up = function(knex) {
  console.log("creating the topics table...");
  return knex.schema.createTable('topics', (topicsTable) => {
    topicsTable.string('slug', 100).primary().unique().notNullable();
    topicsTable.string('description');
  });
};

exports.down = function(knex) {
    console.log(" dropping the topics table...");
    return knex.schema.dropTable('topics');
};
