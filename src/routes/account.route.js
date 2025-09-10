const express = require('express');
const router = express.Router();
const { getOrderQuerySchema, createAccountSchema} = require("../validations/accountsValidation");
const validate = require("../middlewares/validate/index")

const { getAllAccount,
        getByHobbies,
        getSomeHobbies,
        getOrderOfCustomer,
        createNewAccount
} = require('../controller/accountController');

router.get("/", getAllAccount);

router.get('/filterByHob', getByHobbies);

router.get("/fil", getSomeHobbies)

router.get('/orders', validate(getOrderQuerySchema, "body"), getOrderOfCustomer);

router.post('/create',validate(createAccountSchema, "body") ,createNewAccount)

module.exports = router;