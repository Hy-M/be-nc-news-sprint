const { DB_URL, username, password } = process.env;
const ENV = process.env.NODE_ENV || 'development';

// const {
//   username,
//   password
// } = require("./db/credentials.js");

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  }
};

const customConfig = {
  development: {
    connection: {
      database: 'nc_news',
      username: username,
      password: password,
      JWT_SECRET: 'secret key'
    }
  },
  test: {
    connection: {
      database: 'nc_news_test',
      username: username,
      password: password,
      JWT_SECRET: 'secret key'
    }
  },
  production: {
    connection: `${DB_URL}?ssl=true`,
  }
};

module.exports = {
  ...customConfig[ENV],
  ...baseConfig
};