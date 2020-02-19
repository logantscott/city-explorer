const express = require('express');
const app = express();
const cors = require('cors');
const request = require('superagent');

const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const YELP_API_KEY = process.env.YELP_API_KEY;

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

const getWeatherData = async(lat, lng) => {

    const URL = `https://api.darksky.net/forecast/${WEATHER_API_KEY}/${lat},${lng}`;

    const weatherData = await request.get(URL);
    const dailyWeather = weatherData.body.daily;

    // console.log(dailyWeather);

    return dailyWeather.data.map(forecast => {
        return {
            time: new Date(forecast.time * 1000),
            forecast: forecast.summary
        };
    });
};

const getYelpData = async(lat, lng) => {

    const URL = `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lng}`;

    const yelpData = await request
        .get(URL)
        .set('Authorization', `Bearer ${YELP_API_KEY}`);
    const yelpResults = yelpData.body;

    return yelpResults.businesses.map(business => {
        return {
            name: business.name,
            image_url: business.image_url,
            price: business.price,
            rating: business.rating,
            url: business.url
        };
    });
};

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

app.get('/weather', async(req, res, next) => {
    try {
        const queryWeather = await getWeatherData(lat, lng);
        res.json(queryWeather);
    } catch (err) {
        next(err);
    }
});

app.get('/yelp', async(req, res, next) => {
    try {
        const yelpData = await getYelpData(lat, lng);
        // .set('Accept', 'application/json')
        res.json(yelpData);
    } catch (err) {
        next(err);
    }
});

app.get('*', (req, res) => {
    res.json({
        ohNo: '404'
    });
});

module.exports = {
    app: app
};