const { config } = require('../../config');

function logErrors(err, req, res, next) {
    console.log(err);
    next(err);
}

function clientErrorHandler(err, req, res, next) {
    // catch errors from AJAX request
    if (req.xhr) {
        res.status(500).send({ err: err });
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
