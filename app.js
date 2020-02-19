const express = require('express');


const app = express();

app.get('/', (req, res) => {
    res.json({
        welcome: 'home'
    });
});

app.get('/weather/:forecast/:time', (req, res) => {
    res.json({
        some: 'json',
        forecast: req.params.forecast,
        time: req.params.time
    });
});

app.get('/location/:lat/:long', (req, res) => {
    res.json({
        some: 'json',
        latitude: req.params.lat,
        longitude: req.params.long
    });
});

app.get('*', (req, res) => {
    res.json({
        ohNo: '404'
    });
});

module.exports = {
    app: app
};