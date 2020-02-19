const express = require('express');
const app = express();
const geoData = require('./data/geo.json');
const weather = require('./data/darksky.json');
const cors = require('cors');


app.use(cors());


app.get('/', (req, res) => {
    res.json({
        welcome: 'home'
    });
});

const getWeatherData = (lat, lng) => {
    return weather.daily.data.map(forecast => {
        return {
            time: new Date(forecast.time),
            forecast: forecast.summary
        };
    });
};

app.get('/weather', (req, res) => {
    const queryWeather = getWeatherData(req.query.latitude, req.query.longitude);
    res.json(queryWeather);
});

app.get('/location', (req, res) => {
    const cityData = geoData.results[0];
    res.json({
        search_query: 'portland',
        formatted_query: cityData.formatted_address,
        latitude: cityData.geometry.location.lat,
        longitude: cityData.geometry.location.lng
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