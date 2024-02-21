const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/users');
const vendorRoutes = require('./routes/vendor');
const bidsRoutes = require('./routes/bidding');
const issuersRoutes = require('./routes/issuer');
const serviceRoutes = require('./routes/service');
const { isAuthenticated } = require('./middlewares/auth');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Welcome to the servimatch API');
});

app.use('/auth', authRoutes);

app.use('/vendor', isAuthenticated, vendorRoutes);

app.use('/bids', isAuthenticated, bidsRoutes);

app.use('/issuers', isAuthenticated, issuersRoutes);

app.use('/service', isAuthenticated, serviceRoutes);

app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Resource not found',
    });
});

module.exports = app;
