const mongoose = require("mongoose");

const accountsSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: { type: String, default: "customer" },
    profile: {
        type: Object,
        default: {
            firstName: "",
            lastName: "",
            age: 0,
            address: {
                city: "",
                street: "",
                zipcode: ""
            }
        }
    },
    hobbies: [String],
    createdAt: { type: Date, default: Date.now }
});

// Truyền tham số thứ ba "account" để mongoose biết phải dùng đúng collection
const Accounts = mongoose.model("Accounts", accountsSchema, "account");

module.exports = Accounts;
