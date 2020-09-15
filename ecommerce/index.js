const express = require('express');
const path = require('path');

const products = require('./routes/products');

const app = express();

app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/products', products);

app.use('/', function(req, res, next) {
    res.send('Hola mundo!');
});

const server = app.listen(3000, function() {
    console.log(`Listening http://localhost:${server.address().port}`);
});
