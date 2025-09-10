const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  username: String,
  name: String,
  address: String,
  birthdate: Date,
  email: { type: String, required: true, unique: true },
  active: Boolean,
  accounts: [Number],
  tier_and_details: mongoose.Schema.Types.Mixed 
}, { timestamps: true });

const Customer = mongoose.model("customers", customerSchema);

module.exports = Customer;
