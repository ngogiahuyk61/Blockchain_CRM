const mongoose = require("mongoose");

const callRoutingSchema = new mongoose.Schema({
  phoneNumber: String,
  forwardTo: String,
  status: { type: String, default: "active" },
});

module.exports = mongoose.model("CallRouting", callRoutingSchema);
