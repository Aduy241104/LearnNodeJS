const { default: mongoose } = require('mongoose');
const Mongoose = require('mongoose');


const ordersSchema = new Mongoose.Schema({

    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    products: [{
        productName: { type: String, default: "" },
        quantity: { type: Number, default: 0 },
        price: { type: Number, default: 0 }
    }],

    totalAmount: { type: String, default: "" },
    status: { type: String, enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"], default: "pending" },
    shippingAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        district: { type: String, required: true },
    },

    createdAt: { type: Date, default: Date.now }
});

const Orders = mongoose.model("Orders", ordersSchema);

module.exports = Orders;