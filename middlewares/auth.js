const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

async function isAuthenticated(req, res, next) {
    // Retrieve the token from a custom header, e.g., x-access-token
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Decode and verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Assuming the payload contains a 'userId' property
        const userId = decoded.userId;

        // Check if the user exists in the database
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) {
            return res
                .status(401)
                .json({ message: 'Unauthorized access - user does not exist' });
        }

        console.log(`User ${userId} is authenticated`);
        req.body.userId = userId;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            console.error('Error verifying token:', error);
            return res.status(401).json({ message: 'Invalid token' });
        }
        console.error('Error verifying token:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { isAuthenticated };
