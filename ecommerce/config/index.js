require('dotenv').config();

const config = {
    api: {
        environment: process.env.NODE_ENV,
        port: process.env.PORT,
    },
    db: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        name: process.env.DB_NAME,
    },
};

module.exports = { config };
