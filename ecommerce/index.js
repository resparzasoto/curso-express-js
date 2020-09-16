const express = require('express');
const path = require('path');

const productsViewRouter = require('./routes/views/products');
const productsApiRouter = require('./routes/api/products');

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

// server
const server = app.listen(3000, function() {
    console.log(`Listening http://localhost:${server.address().port}`);
});
