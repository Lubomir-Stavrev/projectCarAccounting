const config = {
    development: {
        PORT: 5000,
        DB_CONNECTION: 'mongodb://localhost/carProject',
        SALT_ROUNDS: 7,
        SECRET: 'PUFIISCOOL',
        COOKIE_NAME: 'token'
    },
    production: {
        PORT: 80,
        DB_CONNECTION: 'mongodb://localhost/carProject',
        SALT_ROUNDS: 7,
        SECRET: 'PUFIISCOOL',
        COOKIE_NAME: 'token'
    }
}

module.exports = config[process.env.NODE_ENV.trim()];