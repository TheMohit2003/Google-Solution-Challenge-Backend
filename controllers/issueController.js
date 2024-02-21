const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createIssue = async (req, res) => {
    // Simulate creating a new issuer profile
    const userId = req.body.userId;
    try {
        const { name, contact, aadhar, OrganizationName, GST, IssuerType } =
            req.body;
        const issuer = await prisma.issuer.create({
            data: name,
            contact,
            aadhar,
            OrganizationName,
            GST,
            IssuerType,
            userId,
        });
        res.status(201).json(issuer);
    } catch (error) {
        res.status(400).json({
            message: 'Error creating issuer profile',
            error,
        });
    }
};

const getIssueDetails = async (req, res) => {
    // Simulate fetching issuer details
    userId = req.body.userId;
    try {
        const issuer = await prisma.issuer.findUnique({
            where: { userId: userId },
        });
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
