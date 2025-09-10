const Mongoose = require('mongoose');


const userSchema = new Mongoose.Schema({

    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "customer" },
    addresses: [
        {
            street: String,
            city: String,
            district: String,
            isDefault: { type: Boolean, default: false }
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

const User = Mongoose.model("Users", userSchema);

module.exports = User;