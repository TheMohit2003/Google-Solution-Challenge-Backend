const express = require('express');
const router = express.Router();
const {
    createService,
    getAllServices,
    getServiceById,
} = require('../controllers/service');

router.post('/createService', createService);

router.get('/getAllServices', getAllServices);

router.get('/getServiceById/:id', getServiceById);

module.exports = router;
