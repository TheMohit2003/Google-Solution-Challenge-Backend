const express = require('express');

const router = express.Router();
const {
    createService,
    getAllServices,
    getServiceById,
    getAllLiveServices,
    getAllServicesByIssuer,
} = require('../controllers/service');

router.post('/createService', createService);

router.get('/getAllServices', getAllServices);

router.get('/getAllLiveServices', getAllLiveServices);

router.get('/getServiceById/:id', getServiceById);

router.get('/getAllServicesByIssuer', getAllServicesByIssuer);

module.exports = router;
