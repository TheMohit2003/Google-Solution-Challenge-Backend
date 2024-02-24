const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createService = async (req, res) => {
    const userId = req.body.userId;

    const {
        title,
        description,
        amount,
        location,
        biddingDate,
        projectStartDate,
    } = req.body;

    try {
        const serviceData = {
            title,
            description,
            amount: parseInt(amount, 10),
            location,
            biddingDate: new Date(biddingDate),
            projectStartDate: new Date(projectStartDate),
            issuerId: userId,
        };

        const service = await prisma.service.create({ data: serviceData });

        res.status(201).json({ service });
    } catch (error) {
        console.error(error);
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
        console.log(`id at getServiceById: ${id}`);
        const service = await prisma.service.findUnique({
            where: { id },
        });

        console.log(`service.issuerId at getServiceById: ${service.issuerId}`);

        const issuer = await prisma.issuer.findUnique({
            where: { userId: service.issuerId },
        });

        console.log(`service at getServiceById: ${service}`);
        if (!service) {
            return res.status(404).json({
                message: 'Service not found',
            });
        }
        if (!issuer) {
            return res.status(404).json({
                message: 'Issuer not found',
            });
        }

        service.issuer = issuer;

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

const getAllLiveServices = async (req, res) => {
    try {
        const now = new Date();
        const today = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        );
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const services = await prisma.service.findMany({
            where: {
                biddingDate: {
                    gte: today,
                    lt: tomorrow,
                },
            },
        });

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

const getAllServicesByIssuer = async (req, res) => {
    const issuerId = req.body.userId;

    try {
        const services = await prisma.service.findMany({
            where: { issuerId: issuerId },
        });

        if (services) {
            res.status(200).json(services);
        } else {
            res.status(404).json({ message: 'Service not found' });
        }
    } catch (error) {
        res.status(400).json({
            message: 'Error fetching service details',
            error,
        });
    }
};

const getLowestBidForService = async (req, res) => {
    const { serviceId } = req.params;

    try {
        const lowestBid = await prisma.bid.findMany({
            where: {
                serviceId: serviceId,
            },
            orderBy: {
                amount: 'asc',
            },
            include: {
                vendor: true,
            },
        });

        if (!lowestBid) {
            return res
                .status(404)
                .json({ message: 'No bids found for this service' });
        }

        res.status(200).json(lowestBid);
    } catch (error) {
        console.error('Failed to fetch the lowest bid for service:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createService,
    getAllServices,
    getServiceById,
    getAllLiveServices,
    getLowestBidForService,
    getAllServicesByIssuer,
};
