const express = require('express');
require('dotenv').config();

const app = express();

app.get('/location/', (req, res) => {
    res.json({
        some: 'json'
    });
});

app.get('*', (req, res) => {
    res.json({
        ohNo: '404'
    });
});

let port = process.env.PORT;

app.listen(port, () => { console.log(`Listening to port ${port} . . .`);});