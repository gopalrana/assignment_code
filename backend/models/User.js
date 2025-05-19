const mongoose = require("mongoose");

const subscribeSchema = new mongoose.Schema({
  subscriber: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subscribedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

subscribeSchema.index({ subscriber: 1, subscribedTo: 1 }, { unique: true });

module.exports = mongoose.model("Subscribe", subscribeSchema);
