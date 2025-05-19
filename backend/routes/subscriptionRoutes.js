const express = require("express");
const router = express.Router();
const Subscribe = require("../models/Subscribe");

router.post("/", async (req, res) => {
  try {
    const subscription = await Subscribe.create(req.body);
    res.json(subscription);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const subs = await Subscribe.find().populate("subscriber subscribedTo");
  res.json(subs);
});

module.exports = router;
