const Account = require("../models/accounts");
const accountService = require('../services/accountService');


const getAllAccount = async (req, res) => {
    try {
        const accountList = await Account.find();
        res.status(200).send({
            origin: "anhduy.com",
            accountList
        })
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
};

const getByHobbies = async (req, res) => {
    try {
        const listKey = req.body.hobbies;

        const response = await Account.find({
            hobbies: { $in: listKey }
        }).select("username email role hobbies profile.lastName");

        res.status(200).send(response);
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
};

const getSomeHobbies = async (req, res) => {
    try {
        const listKey = req.body.hobbies;

        const response = await Account.aggregate([
            {
                $match: {
                    hobbies: listKey
                }
            },
            {
                $project: {
                    _id: 0,
                    username: 1,
                    email: 1,
                    role: 1,
                    hobbies: 1,
                    lastName: "$profile.lastName"
                }
            }
        ]);

        res.status(200).send(response);
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
}

const getOrderOfCustomer = async (req, res) => {
    try {
        const { id, status } = req.query;
        const result = await Account.aggregate([
            {
                $lookup: {
                    from: 'orders',
                    localField: '_id',
                    foreignField: 'accountId',
                    as: 'orders'
                }
            },
            {
                $match: {
                    _id: id,
                    "orders.status": "pending"
                }
            },
            {
                $project: {
                    username: 1,
                    email: 1,
                    orders: 1
                }
            }
        ]);

        if (result[0].orders.length > 0) {
            var listFilteredOrders = result[0].orders.filter(key => key.status === status);
            result[0].orders = listFilteredOrders;
        }
        res.status(200).send(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createNewAccount = async (req, res) => {
    const result = await accountService.createAccount(req.body);
    res.send(result)
}

module.exports = {
    getAllAccount,
    getByHobbies,
    getSomeHobbies,
    getOrderOfCustomer,
    createNewAccount
}