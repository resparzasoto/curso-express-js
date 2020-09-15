const express = require('express');
const path = require('path');
const app = express();
const expressJsx = require('./express-jsx');

app.engine('jsx', expressJsx);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jsx');

app.get('/', function(req, res, next) {
    res.render('index', { hello: 'Hola', world: 'Mundo' });
});

const server = app.listen(3000, function() {
    console.log(`Listening http://localhost:${server.address().port}`);
});
