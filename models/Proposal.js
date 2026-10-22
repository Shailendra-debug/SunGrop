const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  total: { type: Number, required: true },
  pricingDetails: { type: Array, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Proposal', proposalSchema);