const supertest = require('supertest');
const app = require('../app');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

const request = supertest(app);

describe('Authentication Controller Tests', () => {
    afterAll(async () => {
        await prisma.user.deleteMany({
            where: {
                email: { in: ['test@example.com', 'newuser@example.com'] },
            },
        });
        await prisma.$disconnect();
    });

    describe('POST /auth/register', () => {
        it('successfully registers a new user and returns a JWT token', async () => {
            const userData = {
                email: 'newuser@example.com',
                password: 'password',
                role: 'ISSUER',
            };

            const response = await request
                .post('/auth/register')
                .send(userData);
            expect(response.statusCode).toBe(201);
            expect(response.body.token).toBeDefined();
        });

        it('fails to register a user with an existing email', async () => {
            const userData = {
                email: 'newuser@example.com',
                password: 'password',
                role: 'ISSUER',
            };

            const response = await request
                .post('/auth/register')
                .send(userData);
            expect(response.statusCode).toBe(400);
            expect(response.body.error).toEqual('Invalid data');
        });
    });

    describe('POST /auth/login', () => {
        it('successfully authenticates a user and returns a JWT token', async () => {
            const userData = {
                email: 'newuser@example.com',
                password: 'password',
                role: 'ISSUER',
            };

            const response = await request.post('/auth/login').send(userData);
            expect(response.statusCode).toBe(200);
            expect(response.body.token).toBeDefined();
        });

        it('fails to authenticate with incorrect password', async () => {
            const userData = {
                email: 'newuser@example.com',
                password: 'wrongpassword',
                role: 'ISSUER',
            };

            const response = await request.post('/auth/login').send(userData);
            expect(response.statusCode).toBe(400);
            expect(response.body.error).toEqual('Invalid email or password');
        });

        it('fails to authenticate with non-existing email', async () => {
            const userData = {
                email: 'nonexisting@example.com',
                password: 'password',
                role: 'ISSUER',
            };

            const response = await request.post('/auth/login').send(userData);
            expect(response.statusCode).toBe(400);
            expect(response.body.error).toEqual('Invalid email or password');
        });
    });
});
