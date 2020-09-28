const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')

const { config } = require('../../config');

Sentry.init({
    dsn: "https://ba40f02d2eb94c209ddf4917ebac8702@o454111.ingest.sentry.io/5443578",
    tracesSampleRate: 1.0,
});

function logErrors(err, req, res, next) {
    Sentry.captureException(err);
    console.log(err);
    next(err);
}

function clientErrorHandler(err, req, res, next) {
    // catch errors from AJAX request
    if (req.xhr) {
        res.status(500).json({ err: err.message });
    } else {
        next(err);
    }
}

function errorHandler(err, req, res, next) {
    // catch errors while streaming
    if (res.headerSent) {
        next(err);
    }

    if (config.environment === 'development') {
        delete err.stack;
    }

    res.status(err.status || 500);
    res.render('error', { error: err });
}

module.exports = {
    logErrors,
    clientErrorHandler,
    errorHandler
};
