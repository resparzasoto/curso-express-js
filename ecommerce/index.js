const express = require('express');
const path = require('path');

const productsRouter = require('./routes/products');
const productsApiRouter = require('./routes/api/products');

const app = express();

app.use(express.json());

app.use('/static', express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/products', productsRouter);
app.use('/api/products', productsApiRouter);

app.use('/', function(req, res, next) {
    res.send('Hola mundo!');
});

const server = app.listen(3000, function() {
    console.log(`Listening http://localhost:${server.address().port}`);
});
