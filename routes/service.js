const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();
const {
    createService,
    getAllServices,
    getServiceById,
    getAllServicesByIssuer,
} = require('../controllers/service');

router.post('/createService', upload.single('file'), createService);

router.get('/getAllServices', getAllServices);

router.get('/getServiceById/:id', getServiceById);

router.get('/getAllServicesByIssuer', getAllServicesByIssuer);

module.exports = router;
