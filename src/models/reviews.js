const Mongoose = require('mongoose');


const productsSchema = new Mongoose.Schema({

    name: { type: String, required: true },
    price: { type: Number, default: 0 },
    category: { type: String, required: true },
    stock: { type: Number, default: 0 },

    specs: {
        color: { type: String, default: "" },
        storage: { type: String, default: "" },
        battery: { type: String, default: "" },
    },

    tags: [],
    createdAt: { type: Date, default: Date.now }
})

const Products = Mongoose.model("Products", productsSchema);

module.exports = Products;