// app.js

const express = require('express');
const session = require('express-session');

const app = express();

app.use(express.static('public'));


app.listen(3000, function () {
    console.log('Server is listening on port 3000!');
});