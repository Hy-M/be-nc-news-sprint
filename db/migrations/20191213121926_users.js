exports.up = function (knex) {
    return knex.schema.createTable('users', (usersTable) => {
        usersTable.string('username', 100).primary().unique().notNullable();
        usersTable.string('avatar_url');
        usersTable.string('name', 100).notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('users');
};