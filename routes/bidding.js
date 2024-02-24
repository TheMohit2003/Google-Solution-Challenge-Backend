const express = require('express');
const router = express.Router();
const {
    placeBid,
    listBidsByVendor,
    listBidsByService,
    getBidDetails,
    updateBid,
    deleteBid,
} = require('../controllers/bidController');

// Place a new bid on a service
router.post('/', placeBid);

// List all bids made by a specific vendor
router.get('/vendor/:vendorId', listBidsByVendor);

// List of all bids for a specific service
router.get('/service/:serviceId', listBidsByService);

// Get details of a specific bid
router.get('/:bidId', getBidDetails);

// Update a bid (e.g., amount or message)
router.put('/:bidId', updateBid);

// Delete a bid
router.delete('/:bidId', deleteBid);

module.exports = router;
