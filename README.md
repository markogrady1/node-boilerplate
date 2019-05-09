create a config directory with two file

config/
  - default.js
  - development.js

default.js format

```
const config = {
  dataStore: {
    db: {
      host: process.env.DBHOST || 'localhost',
      username: process.env.DBUSER || 'USER',
      password: process.env.DBPASS || 'PASSWORD',
      name: process.env.DBNAME || 'DATABASE',
      port: process.env.PORT || 3306,
      debug: process.env.DB_DEBUG || false,
    }
  }
};

module.exports = config;

```
