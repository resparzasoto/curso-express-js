const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')
const Boom = require('@hapi/boom');
const debug = require('debug')('app:error');

const { config } = require('../../config');
const isRequestAjaxOrApi = require('../../utils/isRequestAjaxOrApi');

Sentry.init({
    dsn: config.sentry.sentryDns,
    tracesSampleRate: 1.0,
});

function withErrorStack(err, stack) {
    if (config.api.environment === 'development') {
        return { ...err, stack };
    }
}

function logErrors(err, req, res, next) {
    Sentry.captureException(err);
    debug(err);
    next(err);
}

function wrapErrors(err, req, res, next) {
    if (!err.isBoom) {
        next(Boom.badImplementation(err));
    }

    next(err);
}

function clientErrorHandler(err, req, res, next) {
    const {
        output: { statusCode, payload },
    } = err;

    // catch errors from AJAX request or if an error current while streaming
    if (isRequestAjaxOrApi(req) || res.headerSent) {
        res.status(statusCode).json(withErrorStack(payload, err.stack));
    } else {
        next(err);
    }
}

function errorHandler(err, req, res, next) {
    const {
        output: { statusCode, payload }
    } = err;

    res.status(statusCode);
    res.render('error', withErrorStack(payload, err.stack));
}

module.exports = {
    logErrors,
    wrapErrors,
    clientErrorHandler,
    errorHandler
};
