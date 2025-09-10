// controllers/customerController.js
const Customer = require("../models/customer")

const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getDetailCustomer = async (req, res) => {
    try {
        const username = req.query.q;
        const customerDetail = await Customer.find({ username: username }).select("username name address email birthdate");
        res.send(customerDetail);
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getCustomers,
    getDetailCustomer
}