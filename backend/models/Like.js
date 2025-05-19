const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  commentedAt: { type: Date, default: Date.now },
});

const likeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  contentType: { type: String, required: true }, // e.g., "Video"
  contentId: { type: mongoose.Schema.Types.ObjectId, required: true },
  likedAt: { type: Date, default: Date.now },

  comments: [commentSchema],
});

likeSchema.index({ user: 1, contentType: 1, contentId: 1 }, { unique: true });

module.exports = mongoose.model("Like", likeSchema);
