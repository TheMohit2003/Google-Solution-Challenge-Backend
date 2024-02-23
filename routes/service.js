const express = require('express');
const router = express.Router();
const {
    createService,
    getAllServices,
    getServiceById,
    getAllServicesByIssuer,
} = require('../controllers/service');

router.post('/createService', createService);

router.get('/getAllServices', getAllServices);

router.get('/getServiceById/:id', getServiceById);

router.get('/getAllServicesByIssuer', getAllServicesByIssuer);

module.exports = router;
