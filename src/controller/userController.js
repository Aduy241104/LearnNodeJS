const User = require("../models/users");
const AppError = require('../utils/AppErrors');
const { StatusCodes } = require("http-status-codes");


const getAllUsers = async (req, res) => {
    try {
        const response = await User.find();
        res.send(response);
    } catch (error) {
        res.send(error.message);
    }
}


const findUserByName = async (req, res, next) => {
    try {   
        const name = req.query.name;

        if (!name.trim()) {
            throw new AppError("Order not found", StatusCodes.NOT_FOUND);
        }

        const response = await User.find(
            {
                name: { $regex: name, $options: "i" },
            }).select("name email addresses role")

        res.send(response);
    } catch (error) {
       next(error)
    }
}


const deleteUser = async (req, res) => {
    try {
        const userId = req.query.id;
        await User.deleteOne({ _id: userId });
        res.send("deleted");
    } catch (error) {
        res.send(error.message);
    }
}


const createUser = async (req, res, next) => {
    try {
         const userData = req.body;
    } catch (error) {
        next(error);
    }
}


module.exports = {
    getAllUsers,
    findUserByName,
    deleteUser
}