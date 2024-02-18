const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hey, this is the get api.');
});

module.exports = app;
