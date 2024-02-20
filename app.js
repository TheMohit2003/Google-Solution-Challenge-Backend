const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/users');
// const bidsRoutes = require('./routes/bids');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * @desc    Root endpoint which may serve API information or status
 * @route   GET /
 */
app.get('/', (req, res) => {
    res.send('Hey, this is the get api.');
});

// Mount the user routes at /auth
app.use('/auth', userRoutes);

// app.use('/bids', bidsRoutes);

/**
 * @desc    Create a new bid by an issuer
 * @route   POST /bids
 */
// app.post('/bids', bidsController.create);

/**
 * @desc    List all bids available for vendors to view and apply
 * @route   GET /bids
 */
// app.get('/bids', bidsController.list);

/**
 * @desc    Apply to a specific bid (for vendors)
 * @route   POST /bids/:bidId/apply
 */
// app.post('/bids/:bidId/apply', applicationsController.apply);

/**
 * @desc    Send a message between issuer and vendor
 * @route   POST /messages
 */
// app.post('/messages', messagesController.send);

/**
 * @desc    Retrieve messages in a conversation
 * @route   GET /messages/:conversationId
 */
// app.get('/messages/:conversationId', messagesController.getConversation);

module.exports = app;
