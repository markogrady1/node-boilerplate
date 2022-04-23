const config = {
  port: 3333,
  version: '0.2.0',
  dataStore: {
    db: {
      host: process.env.DBHOST || 'localhost',
      username: process.env.DBUSER || 'USER',
      password: process.env.DBPASS || 'PASSWORD',
      name: process.env.DBNAME || 'DATABASE',
      port: process.env.PORT || 3306,
      debug: process.env.DB_DEBUG || false,
      pool: {
        max: 10,
        min: 0,
      },
    },
  },
};

module.exports = config;
