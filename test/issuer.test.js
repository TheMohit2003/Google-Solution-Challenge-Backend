const request = require('supertest');
const app = require('../app'); // Adjust this path to where your Express app is initialized

describe('Issuer Management', () => {
    let token; // Assuming you use JWT for authentication
    let createdIssuerId;
    let createdServiceId;

    beforeAll(async () => {
        // You might want to add a login test here to get a token if your API requires authentication
        const res = await request(app).post('/auth/register').send({
            email: 'vendor@example.com',
            password: 'password',
            role: 'ISSUER',
        });
        token = res.body.token; // Adjust based on your actual response structure
    });

    it('POST /issuer - Create a new issuer profile', async () => {
        const response = await request(app)
            .post('/issuer')
            .set('x-access-token', token) // Updated to use x-access-token
            .send({
                name: 'Test Issuer',
                contact: 1234567890,
                aadhar: '1234-5678-9012',
                GST: 123456,
                OrganizationName: 'Test Org',
                IssuerType: 'INDIVIDUAL',
            });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('userId');
        createdIssuerId = response.body.userId; // Save this for other tests
    });

    it('GET /issuer/{userId} - Get issuer profile details', async () => {
        const response = await request(app)
            .get(`/issuer/${createdIssuerId}`)
            .set('x-access-token', token) // Updated to use x-access-token
            .send();
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('name', 'Test Issuer');
    });

    it('POST /services - Issuer creates a new service request', async () => {
        const response = await request(app)
            .post('/services')
            .set('x-access-token', token) // Updated to use x-access-token
            .send({
                title: 'Test Service',
                description: 'This is a test service',
                status: 'OPEN',
            });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        createdServiceId = response.body.id; // Save this for other tests
    });

    it('GET /services - List all services (for issuers and vendors, with filters)', async () => {
        const response = await request(app)
            .get('/services')
            .set('x-access-token', token) // Updated to use x-access-token
            .send();
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('PUT /services/{id}/status - Update the status of a service (e.g., open, close, live)', async () => {
        const response = await request(app)
            .put(`/services/${createdServiceId}/status`)
            .set('x-access-token', token) // Updated to use x-access-token
            .send({
                status: 'CLOSED',
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('status', 'CLOSED');
    });
});
