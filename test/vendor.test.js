const request = require('supertest');
const app = require('../app'); // Adjust this path to your Express app's entry point

describe('Vendor Management', () => {
    let token; // Token to be used for authenticated requests
    let vendorId; // To store a vendor ID created during testing
    let serviceId; // Assuming you have a service to bid on for testing
    let bidId; // To store a bid ID created during testing

    beforeAll(async () => {
        // Log in to obtain an authentication token
        // Adjust this request according to your login mechanism
        const res = await request(app).post('/auth/login').send({
            email: 'vendor@example.com', // Use a test vendor account
            password: 'vendorpassword',
            role: 'VENDOR',
        });
        token = res.body.token; // Adjust according to your login response structure
    });

    it('POST /vendor - Create a new vendor profile', async () => {
        const response = await request(app)
            .post('/vendor')
            .set('x-access-token', token) // Updated to use x-access-token
            .send({
                // Provide necessary vendor details according to your schema
                name: 'Test Vendor',
                officeAddress: '123 Test St',
                contact: 1234567890,
                aadhar: 'TEST1234AADHAR',
                GST: 123456,
                OrganizationName: 'Test Vendor Org',
                WorkDescription: 'Test work description',
            });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('userId');
        vendorId = response.body.userId; // Save the vendorId for later tests
    });

    it('GET /vendor/{userId} - Get vendor profile details', async () => {
        const response = await request(app)
            .get(`/vendor/${vendorId}`)
            .set('x-access-token', token) // Updated to use x-access-token
            .send();
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('name', 'Test Vendor');
    });

    it('POST /bids - Place a bid on a service', async () => {
        const response = await request(app)
            .post('/bids')
            .set('x-access-token', token) // Updated to use x-access-token
            .send({
                serviceId: serviceId, // You need to set this variable based on a pre-existing service
                vendorId: vendorId,
                amount: 1000,
                message: 'Test bid',
            });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        bidId = response.body.id; // Save the bidId for later use or verification
    });

    it('GET /bids/vendor/{vendorId} - List all bids by a vendor', async () => {
        const response = await request(app)
            .get(`/bids/vendor/${vendorId}`)
            .set('x-access-token', token) // Updated to use x-access-token
            .send();
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(
            expect.arrayContaining([expect.objectContaining({ id: bidId })])
        );
    });

    it('GET /services/feed - Get the feed of services for vendors to bid on', async () => {
        const response = await request(app)
            .get('/services/feed')
            .set('x-access-token', token) // Updated to use x-access-token
            .send();
        expect(response.statusCode).toBe(200);
        // This expects that services feed returns an array, adjust as necessary
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBeGreaterThan(0);
    });
});
