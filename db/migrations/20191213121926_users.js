exports.up = function (knex) {
    console.log("creating the users table...");
    return knex.schema.createTable('users', (usersTable) => {
        usersTable.string('username', 100).primary().unique().notNullable();
        usersTable.string('avatar_url');
        usersTable.string('name', 100).notNullable();
    });
};

exports.down = function (knex) {
    console.log("dropping the users table...");
    return knex.schema.dropTable('users');
};