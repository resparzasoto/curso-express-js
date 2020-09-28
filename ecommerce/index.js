const express = require('express');
const path = require('path');
const Boom = require('@hapi/boom');

const productsViewRouter = require('./routes/views/products');
const productsApiRouter = require('./routes/api/products');

const {
    logErrors,
    wrapErrors,
    clientErrorHandler,
    errorHandler,
} = require('./utils/middleware/errorsHandlers');

const isRequestAjaxOrApi = require('./utils/isRequestAjaxOrApi');

// app
const app = express();

// middleware
app.use(express.json());

// static files
app.use('/static', express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// routes
app.use('/products', productsViewRouter);
app.use('/api/products', productsApiRouter);

// redirect
app.get('/', function(req, res, next) {
    res.redirect('/products');
});

app.use(function (req, res, next) {
    if (isRequestAjaxOrApi(req)) {
        const {
            output: { statusCode, payload }
        } = Boom.notFound();

        res.status(statusCode).json(payload);
    }

    res.status(404).render("404");
})

// error Handlers
app.use(logErrors);
app.use(wrapErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

// server
const server = app.listen(3000, function() {
    console.log(`Listening http://localhost:${server.address().port}`);
});
