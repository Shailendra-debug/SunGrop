const mongoose = require('mongoose');

const rateSchema = new mongoose.Schema({
  system: { type: String, required: true },
  layers: { type: String, required: true },
  rate: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Rate', rateSchema);