"use strict";

const express = require("express");
const mongoose = require("mongoose");
const Enquiry = require("../models/Enquiry");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (typeof req.query.email === "string" && req.query.email.trim()) {
      filter.email = req.query.email.trim().toLowerCase();
    }

    const enquiries = await Enquiry.find(filter).sort({ createdAt: -1 });
    return res.json(enquiries);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid enquiry ID" });
  }

  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) return res.status(404).json({ message: "Enquiry not found" });
    return res.json(enquiry);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const enquiry = await Enquiry.create(req.body || {});
    return res.status(201).json(enquiry);
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Unable to save enquiry" });
  }
});

module.exports = router;
