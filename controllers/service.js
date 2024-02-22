const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createService = async (req, res) => {
    const {
        title,
        description,
        amount,
        location,
        biddingDate,
        projectStartDate,
    } = req.body;
    const userId = req.userId; // Assuming req.userId is populated by your authentication middleware

    try {
        // Additional check to ensure the user is an issuer could be implemented here
        // Fetch the user to check their role
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user || user.role !== 'ISSUER') {
            // Respond with an error if the user is not found or not an issuer
            return res.status(403).json({
                message: 'Forbidden - Only issuers can create services',
            });
        }

        // If the user is an issuer, proceed to create the service
        const service = await prisma.service.create({
            data: {
                title,
                description,
                amount,
                location,
                biddingDate: new Date(biddingDate),
                projectStartDate: new Date(projectStartDate),
                issuerId: userId, // The userId from the request is the issuerId
                status: 'OPEN', // Default status, can be omitted if set by default in Prisma schema
            },
        });

        res.status(201).json({
            service,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
};

const getAllServices = async (req, res) => {
    try {
        const services = await prisma.service.findMany();

        res.status(200).json({
            services,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
};

const getServiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await prisma.service.findUnique({
            where: { id },
        });
        if (!service) {
            return res.status(404).json({
                message: 'Service not found',
            });
        }
        res.status(200).json({
            service,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
};

module.exports = { createService, getAllServices, getServiceById };
