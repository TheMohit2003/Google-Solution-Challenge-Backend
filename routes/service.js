const express = require('express');

const router = express.Router();
const {
    createService,
    getAllServices,
    getServiceById,
    getAllLiveServices,
    getLowestBidForService,
    getAllServicesByIssuer,
} = require('../controllers/serviceController');

router.post('/createService', createService);

router.get('/getAllServices', getAllServices);

router.get('/getAllLiveServices', getAllLiveServices);

router.get('/getServiceById/:id', getServiceById);

router.get('/getLowestBidForService/:serviceId', getLowestBidForService);

router.get('/getAllServicesByIssuer', getAllServicesByIssuer);

module.exports = router;
