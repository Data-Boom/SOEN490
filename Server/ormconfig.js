module.exports = {
    name: 'default',
    "type": process.env.TEST_DB_TYPE,
    "host": process.env.TEST_HOST,
    "port": process.env.TEST_DB_PORT,
    "username": process.env.TEST_USER_NAME,
    "password": process.env.TEST_PASSWORD,
    "database": process.env.TEST_DB_NAME,
    "dropSchema": true,
    "synchronize": true,
    "logging": false,
    "entities": [
        '../models/entities/**/*.ts',
        '../models/entities/*.ts',
        "src/models/entities/**/*.ts",
        "dist/entities/**/*.js"
    ]
}