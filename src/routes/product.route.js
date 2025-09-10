const express = require('express');
const router = express.Router();


const productController = require('../controller/productsController');

router.get('/', productController.index);
router.post('/add', productController.addNewProduct);


module.exports = router;