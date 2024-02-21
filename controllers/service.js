const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createService = async (req, res) => {
    const { title, description, price } = req.body;
    const userId = req.body.userId; // Assuming req.user is populated by your authentication middleware

    try {
        // Additional check to ensure the user is an issuer could be implemented here
        const service = await prisma.service.create({
            data: {
                title,
                description,
                price,
                issuerId: userId, // Assuming the issuerId is the userId of the authenticated issuer
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
