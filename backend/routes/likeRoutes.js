const express = require("express");
const router = express.Router();
const Like = require("../models/Like");

// Like a content
router.post("/", async (req, res) => {
  try {
    const like = await Like.create(req.body);
    res.json(like);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all likes
router.get("/", async (req, res) => {
  const likes = await Like.find().populate("user comments.user");
  res.json(likes);
});

// Add comment to like
router.post("/:id/comment", async (req, res) => {
  try {
    const { user, content } = req.body;
    const updated = await Like.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: { user, content } } },
      { new: true }
    ).populate("comments.user");

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
