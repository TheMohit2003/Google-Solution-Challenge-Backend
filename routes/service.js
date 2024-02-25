const express = require('express');

const router = express.Router();
const {
    createService,
    getAllServices,
    getServiceById,
    getAllLiveServices,
    getAllLiveServicesByIssuer,
    getLowestBidForService,
    getAllServicesByIssuer,
} = require('../controllers/serviceController');

router.post('/createService', createService);

router.get('/getAllServices', getAllServices);

router.get('/getAllLiveServices', getAllLiveServices);

router.get('/getAllLiveServicesByIssuer', getAllLiveServicesByIssuer);

router.get('/getServiceById/:id', getServiceById);

router.get('/getLowestBidForService/:serviceId', getLowestBidForService);

router.get('/getAllServicesByIssuer', getAllServicesByIssuer);

module.exports = router;
