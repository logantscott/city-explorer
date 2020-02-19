const express = require('express');

const app = express();

const geoData = require('./data/geo.json');






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

app.get('/location', (req, res) => {
    const cityData = geoData.results[0];
    res.json({
        formatted_query: cityData.formatted_address,
        latitude: cityData.geometry.location.lat,
        longitude: cityData.geometry.location.long
    });
});

app.get('*', (req, res) => {
    res.json({
        ohNo: '404'
    });
});


// Helper Functions
function getLatLng(location) {
    // simulate an error if special "bad location" is provided:
    if(location === 'bad location') {
        throw new Error();
    }

    // ignore location for now, return hard-coded file
    // api call will go here

    // convert to desired data format:
    return toLocation(geoData);
}

function toLocation(/*geoData*/) {
    const firstResult = geoData.results[0];
    const geometry = firstResult.geometry;
    
    return {
        formatted_query: firstResult.formatted_address,
        latitude: geometry.location.lat,
        longitude: geometry.location.lng
    };
}

module.exports = {
    app: app,
    toLocation: toLocation,
    getLatLng: getLatLng
};