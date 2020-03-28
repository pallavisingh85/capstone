import "babel-polyfill"
const request = require('supertest');
const OK = 200;
describe('server is running', () => {
    test('200 Ok Response', async () => {
        const response = await request('http://localhost:8000').get('/');
        expect(response.statusCode).toBe(OK);
    });
});