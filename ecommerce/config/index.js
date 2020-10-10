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
    sentry: {
        sentryDns: process.env.SENTRY_DNS,
        sentryId: process.env.SENTRY_ID,
    },
    jwt: {
        authAdminUsername: process.env.AUTH_ADMIN_USERNAME,
        authAdminPassword: process.env.AUTH_ADMIN_PASSWORD,
        authAdminEmail: process.env.AUTH_ADMIN_EMAIL,
        authJwtSecret: process.env.AUTH_JWT_SECRET,
    }
};

module.exports = { config };
