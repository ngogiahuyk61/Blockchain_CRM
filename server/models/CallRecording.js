const mongoose = require("mongoose");

const callRecordingSchema = new mongoose.Schema({
  customerId: String,
  audioUrl: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CallRecording", callRecordingSchema);
