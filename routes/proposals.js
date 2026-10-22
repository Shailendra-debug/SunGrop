const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Proposal = require('../models/Proposal');

// GET all proposals (Optional: Search by email via ?email=xxx)
router.get('/', async (req, res) => {
  try {
    if (req.query.id) {
      if (!mongoose.isValidObjectId(req.query.id)) {
        return res.status(400).json({ message: 'Invalid proposal ID' });
      }

      const proposal = await Proposal.findById(req.query.id);
      if (!proposal) return res.status(404).json({ message: 'Proposal not found' });
      return res.json(proposal);
    }

    let query = {};
    if (req.query.email) {
      query.email = { $regex: req.query.email, $options: 'i' }; // Case-insensitive search
    }
    const proposals = await Proposal.find(query).sort({ createdAt: -1 });
    res.json(proposals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single proposal by its MongoDB ID
router.get('/:id', async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id);
    if (!proposal) return res.status(404).json({ message: 'Proposal not found' });
    res.json(proposal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST new proposal
router.post('/', async (req, res) => {
  const proposal = new Proposal({
    name: req.body.name,
    location: req.body.location,
    phone: req.body.phone,
    email: req.body.email,
    date: req.body.date,
    time: req.body.time,
    total: req.body.total,
    pricingDetails: req.body.pricingDetails
  });
  try {
    const newProposal = await proposal.save();
    res.status(201).json(newProposal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST bulk submit selected
router.post('/selected', async (req, res) => {
  try {
    // In a real scenario, you might update a status field. 
    // Here we just acknowledge the IDs received.
    res.json({ message: `Successfully processed ${req.body.ids.length} selected proposals` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
