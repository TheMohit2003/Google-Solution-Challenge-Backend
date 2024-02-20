const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new vendor profile
exports.createVendor = async (req, res) => {
    try {
        const {
            name,
            officeAddress,
            contact,
            aadhar,
            GST,
            OrganizationName,
            WorkDescription,
        } = req.body;
        const vendor = await prisma.vendor.create({
            data: {
                name,
                officeAddress,
                contact,
                aadhar,
                GST,
                OrganizationName,
                WorkDescription,
            },
        });
        res.status(201).json(vendor);
    } catch (error) {
        res.status(400).json({ message: 'Error creating vendor', error });
    }
};

// Get vendor profile details
exports.getVendorDetails = async (req, res) => {
    try {
        const { userId } = req.params;
        const vendor = await prisma.vendor.findUnique({
            where: { id: userId },
        });
        if (vendor) {
            res.status(200).json(vendor);
        } else {
            res.status(404).json({ message: 'Vendor not found' });
        }
    } catch (error) {
        res.status(400).json({
            message: 'Error fetching vendor details',
            error,
        });
    }
};

// Place a bid on a service
exports.placeBid = async (req, res) => {
    try {
        const { serviceId, vendorId, amount, message } = req.body;
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

// List all bids by a vendor
exports.listBidsByVendor = async (req, res) => {
    try {
        const { vendorId } = req.params;
        const bids = await prisma.bid.findMany({
            where: { vendorId },
        });
        res.status(200).json(bids);
    } catch (error) {
        res.status(400).json({ message: 'Error listing bids', error });
    }
};

// Get the feed of services for vendors to bid on
exports.getServicesFeed = async (req, res) => {
    try {
        const services = await prisma.service.findMany({
            where: {
                /* your conditions for the feed, if any */
            },
        });
        res.status(200).json(services);
    } catch (error) {
        res.status(400).json({
            message: 'Error fetching services feed',
            error,
        });
    }
};
