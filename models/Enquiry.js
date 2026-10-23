"use strict";

const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    work_type: { type: String, required: true, trim: true },
    thickness: { type: String, required: true, trim: true },
    floor_condition: { type: String, required: true, trim: true },
    material_supply: { type: String, required: true, trim: true },
    start_date: { type: String, default: "", trim: true },
    accommodation: {
      type: String,
      enum: ["No", "Yes", "TBD"],
      default: "No"
    },
    total_area: { type: Number, required: true, min: 0.01 },
    unit: { type: String, enum: ["sqft", "sqm"], required: true },
    offer_rate: { type: Number, min: 0, default: null },
    message: { type: String, default: "", trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enquiry", enquirySchema);
