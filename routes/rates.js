const express = require('express');
const router = express.Router();
const Rate = require('../models/Rate');

// GET all rates
router.get('/', async (req, res) => {
  try {
    const rates = await Rate.find().sort({ createdAt: 1 });
    res.json(rates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new rate
router.post('/', async (req, res) => {
  const rate = new Rate({
    system: req.body.system,
    layers: req.body.layers,
    rate: req.body.rate
  });
  try {
    const newRate = await rate.save();
    res.status(201).json(newRate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update rate
router.put('/:id', async (req, res) => {
  try {
    const updatedRate = await Rate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedRate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE rate
router.delete('/:id', async (req, res) => {
  try {
    await Rate.findByIdAndDelete(req.params.id);
    res.json({ message: 'Rate deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;