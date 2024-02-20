const express = require('express');
const router = express.Router();
const {
    createVendor,
    getVendorDetails,
    placeBid,
    listBidsByVendor,
    getServicesFeed,
} = require('../controllers/vendorController');

// Assuming you're using some form of middleware for authentication,
// it should be applied to routes that require an authenticated user.
// For demonstration, let's assume an `` middleware is available.

// Middleware to check if the user is authenticated
// You'll need to implement this based on your authentication strategy

// Create a new vendor profile
router.post('/', createVendor);

// Get vendor profile details
router.get('/:userId', getVendorDetails);

// Place a bid on a service
router.post('/bids', placeBid);

// List all bids by a vendor
router.get('/bids/:vendorId', listBidsByVendor);

// Get the feed of services for vendors to bid on
router.get('/services/feed', getServicesFeed);

module.exports = router;
