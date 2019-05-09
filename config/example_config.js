// for development create a config/development.js file with the same format as below. It should contain localhost details
// for production create a config/default.js file with the same format as below. It should contain live details

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
                min: 0
            }
        },
    }
};

module.exports = config;