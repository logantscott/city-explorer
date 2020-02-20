const { app } = require('./app.js');
const request = require('supertest');


describe('/GET /location', () => {
    test('Test my location API response',
        async(done) => {
            
            const response = await request.agent(app)
                .get('/location?search=portland')
                .expect('Content-Type', /json/);

            // console.log(response);
            // expect.any(Number)
            
            expect(response.body).toEqual({
                search_query: 'portland',
                formatted_query: 'Portland, Multnomah County, Oregon, USA', 
                latitude: '45.5202471', 
                longitude: '-122.6741949'
            });
            
            expect(response.statusCode).toBe(200);
            
            done();
        });
});

describe('/GET /weather', () => {
    test('Test my weather API response',
        async(done) => {
            
            const response = await request.agent(app)
                .get('/weather')
                .expect('Content-Type', /json/);

            //array of 8 forecasts
            expect(response.body.length).toBe(8);

            //should pass if keys exist... some sites say to use things like chai or should?
            expect(response.body[0]).toEqual({
                time: expect.any(String),
                forecast: expect.any(String)
            });

            expect(response.statusCode).toBe(200);
            
            done();
        });
});

describe('/GET /events', () => {
    test('Test my event API response',
        async(done) => {
            
            const response = await request.agent(app)
                .get('/events')
                .expect('Content-Type', /json/);

            //array of 8 forecasts
            expect(response.body.length).toBe(20);

            //should pass if keys exist... some sites say to use things like chai or should?
            expect(response.body[0]).toEqual({
                link: expect.any(String),
                name: expect.any(String),
                event_date: expect.any(String),
                summary: expect.any(String)
            });
            
            expect(response.statusCode).toBe(200);
            
            done();
        });
});

describe('/GET /reviews', () => {
    test('Test my event API response',
        async(done) => {
            
            const response = await request.agent(app)
                .get('/reviews')
                .expect('Content-Type', /json/);

            //array of 8 forecasts
            expect(response.body.length).toBe(20);

            //should pass if keys exist... some sites say to use things like chai or should?
            expect(response.body[0]).toEqual({
                name: expect.any(String),
                image_url: expect.any(String),
                price: expect.any(String),
                rating: expect.any(Number),
                url: expect.any(String)
            });
            
            expect(response.statusCode).toBe(200);
            
            done();
        });
});

describe('/GET /trails', () => {
    test('Test my event API response',
        async(done) => {
            
            const response = await request.agent(app)
                .get('/trails')
                .expect('Content-Type', /json/);

            //array of 8 forecasts
            expect(response.body.length).toBe(10);

            //should pass if keys exist... some sites say to use things like chai or should?
            expect(response.body[0]).toEqual({
                name: expect.any(String),
                location: expect.any(String),
                length: expect.any(Number),
                stars: expect.any(Number),
                star_votes: expect.any(Number),
                summary: expect.any(String),
                trail_url: expect.any(String),
                conditions: expect.any(String),
                condition_date: expect.any(String),
                condition_time: expect.any(String)
            });
            
            expect(response.statusCode).toBe(200);
            
            done();
        });
});