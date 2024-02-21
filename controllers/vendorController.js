const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new vendor profile
const createVendor = async (req, res) => {
    const userId = req.body.userId;
    const checkUser = await prisma.vendor.findUnique({
        where: { userId },
    });
    if (checkUser) {
        return res.status(409).json({
            message: 'Vendor already exists',
        });
    }

    try {
        const {
            name,
            officeAddress,
            contact,
            aadhar,
            GST,
            Occupation,
            OrganizationName,
            WorkDescription,
            userId,
        } = req.body;
        console.log({
            name,
            officeAddress,
            contact,
            aadhar,
            GST,
            OrganizationName,
            Occupation,
            WorkDescription,
            userId,
        });
        const vendor = await prisma.vendor.create({
            data: {
                userId,
                name,
                officeAddress,
                contact,
                aadhar,
                GST,
                Occupation,
                OrganizationName,
                WorkDescription,
            },
        });
        console.log(vendor);
        res.status(201).json(vendor);
    } catch (error) {
        res.status(400).json({ message: 'Error creating vendor', error });
    }
};

// Get vendor profile details
const getVendorDetails = async (req, res) => {
    const userId = req.body.userId;
    try {
        const vendor = await prisma.vendor.findUnique({
            where: { userId: userId },
        });
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (user) {
            vendor.email = user.email;
        }
        if (vendor) {
            console.log(vendor);
            res.status(200).json(vendor);
        } else {
            console.log('Vendor not found');
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
const placeBid = async (req, res) => {
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
const listBidsByVendor = async (req, res) => {
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
const getServicesFeed = async (req, res) => {
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

module.exports = {
    createVendor,
    getVendorDetails,
    placeBid,
    listBidsByVendor,
    getServicesFeed,
};
