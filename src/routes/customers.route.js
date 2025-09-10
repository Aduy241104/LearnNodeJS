// routes/customerRoutes.js
const express = require("express");

const { getCustomers, getDetailCustomer } = require("../controller/custromersController");


const router = express.Router();

router.get("/", getCustomers);
router.get("/detail", getDetailCustomer);

module.exports = router;
