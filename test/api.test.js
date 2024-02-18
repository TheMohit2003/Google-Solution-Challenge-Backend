const request = require('supertest');
const app = require('../app'); // Adjust the path to where your express app is exported

describe('GET /', () => {
    it('responds with a greeting message', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual('Hey, this is the get api.');
    });
});
