const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const placeBid = async (req, res) => {
    try {
        const { serviceId, amount, message } = req.body;
        // Assuming vendorId comes from authenticated user's info
        const vendorId = req.user.id;
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
        res.status(400).json({ message: 'Error placing bid', error });
    }
};

const listBidsByVendor = async (req, res) => {
    try {
        const { vendorId } = req.params;
        const bids = await prisma.bid.findMany({
            where: { vendorId },
        });
        res.status(200).json(bids);
    } catch (error) {
        res.status(400).json({
            message: 'Error listing bids by vendor',
            error,
        });
    }
};

const getBidDetails = async (req, res) => {
    try {
        const { bidId } = req.params;
        const bid = await prisma.bid.findUnique({
            where: { id: bidId },
        });
        if (bid) {
            res.status(200).json(bid);
        } else {
            res.status(404).json({ message: 'Bid not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error getting bid details', error });
    }
};

const updateBid = async (req, res) => {
    try {
        const { bidId } = req.params;
        const { amount, message } = req.body;
        const bid = await prisma.bid.update({
            where: { id: bidId },
            data: { amount, message },
        });
        res.status(200).json(bid);
    } catch (error) {
        res.status(400).json({ message: 'Error updating bid', error });
    }
};

const deleteBid = async (req, res) => {
    try {
        const { bidId } = req.params;
        await prisma.bid.delete({
            where: { id: bidId },
        });
        res.status(200).json({ message: 'Bid deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting bid', error });
    }
};

module.exports = {
    placeBid,
    listBidsByVendor,
    getBidDetails,
    updateBid,
    deleteBid,
};
