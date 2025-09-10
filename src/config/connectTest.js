const mongoose = require('mongoose');

const uri = "mongodb+srv://anhduy123:anhduy123@cluster0.ygnd2pt.mongodb.net/online_shop"

function connectDatabase() {
    mongoose.connect(uri)
        .then(() => console.log("✅ Mongoose connected"))
        .catch(err => console.error("❌ Mongoose error:", err));
}

module.exports = connectDatabase;