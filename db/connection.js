const ENV = process.env.NODE_ENV || 'development';

const dbConfig = ENV === 'production' ? { client: 'pg', connection: process.env.DATABASE_URL } : require("../knexfile");

const knexMaker = require("knex");

const connection = knexMaker(dbConfig);

module.exports = connection;