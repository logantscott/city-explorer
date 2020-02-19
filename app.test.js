const { app } = require('./app.js');
const request = require('supertest');

describe('/GET /location', () => {
    test('Test my API responses',
        async(done) => {
            
            const response = await request(app)
                
                .get('/location?search=portland');
            
            expect(response.body).toEqual({
                search_query: 'portland',
                formatted_query: '30 NW 10th Ave, Portland, OR 97209, USA', 
                latitude: expect.any(Number), 
                longitude: expect.any(Number)
            });
            
            expect(response.statusCode).toBe(200);
            
            done();
        });
});