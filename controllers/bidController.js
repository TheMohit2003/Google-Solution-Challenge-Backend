const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const placeBid = async (req, res) => {
    const { serviceId, amount, message } = req.body;
    const vendorId = req.body.userId; // Received from middleware

    try {
        const bid = await prisma.bid.create({
            data: {
                serviceId,
                vendorId,
                amount,
                message,
            },
        });
        res.status(201).json(bid);
    } catch (error) {
        res.status(500).json({
            message: 'Error placing bid',
            error: error.message,
        });
    }
};

const listBidsByVendor = async (req, res) => {
    const { vendorId } = req.params; // Assuming the vendor's ID is passed as a URL parameter

    try {
        const bids = await prisma.bid.findMany({
            where: { vendorId },
        });
        res.status(200).json(bids);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving bids',
            error: error.message,
        });
    }
};

const getBidDetails = async (req, res) => {
    const { bidId } = req.params;

    try {
        const bid = await prisma.bid.findUnique({
            where: { id: bidId },
        });
        if (bid) {
            res.status(200).json(bid);
        } else {
            res.status(404).json({ message: 'Bid not found' });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving bid details',
            error: error.message,
        });
    }
};

const updateBid = async (req, res) => {
    const { bidId } = req.params;
    const { amount, message } = req.body;

    try {
        const updatedBid = await prisma.bid.update({
            where: { id: bidId },
            data: { amount, message },
        });
        res.status(200).json(updatedBid);
    } catch (error) {
        res.status(500).json({
            message: 'Error updating bid',
            error: error.message,
        });
    }
};

const deleteBid = async (req, res) => {
    const { bidId } = req.params;

    try {
        await prisma.bid.delete({
            where: { id: bidId },
        });
        res.status(204).send(); // No content to send back
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting bid',
            error: error.message,
        });
    }
};

const listBidsByService = async (req, res) => {
    const { serviceId } = req.params;

    try {
        const bids = await prisma.bid.findMany({
            where: { serviceId },
            orderBy: {
                amount: 'asc',
            },
        });
        res.status(200).json(bids);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving bids',
            error: error.message,
        });
    }
};

module.exports = {
    placeBid,
    listBidsByVendor,
    listBidsByService,
    getBidDetails,
    updateBid,
    deleteBid,
};
