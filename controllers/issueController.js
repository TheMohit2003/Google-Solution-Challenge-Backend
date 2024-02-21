const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createIssue = async (req, res) => {
    const userId = req.body.userId;
    console.log('userId', userId);

    try {
        // Check if an issuer with the given userId already exists
        const existingIssuer = await prisma.issuer.findUnique({
            where: { userId },
        });

        if (existingIssuer) {
            return res.status(409).json({ message: 'Issuer already exists' });
        }

        const { name, contact, aadhar, OrganizationName, GST, IssuerType } =
            req.body;
        // Create the issuer with the provided details and connect it to the user by userId
        const issuer = await prisma.issuer.create({
            data: {
                name,
                contact,
                aadhar,
                OrganizationName,
                GST,
                IssuerType,
                user: {
                    // Correctly establish the relation to User
                    connect: {
                        id: userId, // Connect this issuer to the existing user by ID
                    },
                },
            },
        });

        res.status(201).json(issuer);
    } catch (error) {
        console.error('Error creating issuer profile', error);
        res.status(400).json({
            message: 'Error creating issuer profile',
            error: error.message,
        });
    }
};

const getIssueDetails = async (req, res) => {
    // Simulate fetching issuer details
    const userId = req.body.userId;
    try {
        const issuer = await prisma.issuer.findUnique({
            where: { userId: userId },
        });
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (user) {
            issuer.gmail = user.gmail;
        }

        if (issuer) {
            res.status(200).json(issuer);
        } else {
            res.status(404).json({ message: 'Issuer not found' });
        }
    } catch (error) {
        res.status(400).json({
            message: 'Error fetching issuer details',
            error,
        });
    }
};

const updateIssueStatus = async (req, res) => {
    // Simulate updating a service's status
    try {
        const service = await prisma.service.update({
            where: { id: req.params.id },
            data: { status: req.body.status },
        });
        res.status(200).json(service);
    } catch (error) {
        res.status(400).json({
            message: 'Error updating service status',
            error,
        });
    }
};

const listAllIssues = async (req, res) => {
    // Simulate listing all services
    try {
        const services = await prisma.service.findMany();
        res.status(200).json(services);
    } catch (error) {
        res.status(400).json({ message: 'Error listing all services', error });
    }
};

const deleteIssue = async (req, res) => {
    // Simulate deleting a service (if applicable)
    try {
        await prisma.service.delete({
            where: { id: req.params.id },
        });
        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting service', error });
    }
};

module.exports = {
    createIssue,
    getIssueDetails,
    updateIssueStatus,
    listAllIssues,
    deleteIssue,
};
