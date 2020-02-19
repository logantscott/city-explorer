const express = require('express');
const app = express();
const geoData = require('./data/geo.json');
const weather = require('./data/darksky.json');
const cors = require('cors');
const request = require('superagent');

const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;

let lat;
let lng;

app.use(cors());
app.use((req, res, next) => {
    req.headers['lol'] = 'new request header lol';
    next();
});

app.get('/', (req, res) => {
    res.json({
        welcome: 'home'
    });
});

const getWeatherData = (lat, lng) => {
    return weather.daily.data.map(forecast => {
        return {
            time: new Date(forecast.time * 1000),
            forecast: forecast.summary
        };
    });
};

app.get('/weather', (req, res) => {
    const queryWeather = getWeatherData(req.query.latitude, req.query.longitude);
    res.json(queryWeather);
});

app.get('/location', async(req, res, next) => {
    try {
        const location = req.query.search;

        const URL = `https://us1.locationiq.com/v1/search.php?key=${GEOCODE_API_KEY}&q=${location}&format=json`;

        const locationData = await request.get(URL);
        const firstResult = locationData.body[0];

        lat = firstResult.lat;
        lng = firstResult.lon;

        res.json({
            search_query: location,
            formatted_query: firstResult.display_name,
            latitude: lat,
            longitude: lng
        });
    } catch (err) {
        next(err);
    }
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