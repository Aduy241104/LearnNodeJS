const express = require('express');
const router = express.Router();
const orderController = require('../controller/ordersController');

router.get('/', orderController.getOrders);

router.get('/insert', orderController.insertSampleOrders);

router.get('/find', orderController.getOrderByAccountId);
router.get('/find-2', orderController.getOrderByAccountId2);

module.exports = router;