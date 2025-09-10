const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');

router.get('/getall', UserController.getAllUsers);
router.get('/find', UserController.findUserByName);
router.get('/del', UserController.deleteUser);

module.exports = router;