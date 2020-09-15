const express = require('express');
const app = express();

app.use(express.json());

app.get('/', function(req, res, next) {
    const person = {
        name: 'Rubén',
        lastName: 'Esparza',
        height: 1.72,
        weight: 70,
    };

    res.send(person);
});

const server = app.listen(3000, function() {
    console.log(`App listening in http://localhost:${server.address().port}`);
});
